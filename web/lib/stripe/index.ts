import Stripe from "stripe";
import { loadEnvConfig } from "@next/env";
import { User } from "next-auth";
import { redirect } from "next/navigation";

if (!process.env.STRIPE_SECRET_KEY) loadEnvConfig(process.cwd());

export const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export type stripePrice = Stripe.Price;

export async function checkoutSession({
  productId,
  user,
}: {
  productId: string;
  user: User;
}) {
  const prices = await stripe.prices.list({
    product: productId,
    active: true,
  });

  // Find fixed (licensed) price
  const fixedPrice = prices.data.find(
    (p) => p.type === "recurring" && p.recurring?.usage_type === "licensed"
  );

  // Find metered prices
  const meteredPrices = prices.data.filter(
    (p) => p.type === "recurring" && p.recurring?.usage_type === "metered"
  );

  if (!fixedPrice) {
    console.error(
      "Fixed price types:",
      prices.data.map((p) => p.recurring?.usage_type)
    );
    throw new Error("Licensed price not found for product");
  }

  if (meteredPrices.length === 0) {
    throw new Error("Metered prices not found for product");
  }

  const lineItems = [
    {
      price: fixedPrice.id,
      quantity: 1,
    },
    ...meteredPrices.map((price) => ({
      price: price.id,
    })),
  ];

  const session = await stripe.checkout.sessions.create({
    mode: "subscription" as Stripe.Checkout.SessionCreateParams.Mode,
    tax_id_collection: {
      enabled: true,
    },
    allow_promotion_codes: true,
    line_items: lineItems,
    success_url: `${process.env.BASE_URL}/dashboard?success=true`,
    cancel_url: `${process.env.BASE_URL}/dashboard?canceled=true`,
    customer_email: user.email || null,
    metadata: {
      userId: user.id,
    },
  } as Stripe.Checkout.SessionCreateParams);

  redirect(session.url ?? `${process.env.BASE_URL}/pricing`);
}

export async function portalSession({ user }: { user: User }) {
  const customers = await stripe.customers.list({
    email: user.email!,
    limit: 1,
  });

  const customer = customers.data[0];
  if (!customer) redirect("/dashboard");

  // Get all products and their flat prices
  const productsWithPrices = await Promise.all(
    (
      await stripe.products.list({ active: true })
    ).data.map(async (product) => {
      const prices = await stripe.prices.list({
        product: product.id,
        active: true,
        type: "recurring",
      });

      // Filter for flat prices only (non-metered)
      const flatPrices = prices.data.filter(
        (price) =>
          price.billing_scheme === "per_unit" &&
          price.recurring?.usage_type !== "metered"
      );

      return {
        product: product.id,
        prices: flatPrices.map((price) => price.id),
      };
    })
  );

  let configuration: Stripe.BillingPortal.Configuration;

  // List all configurations
  const configurations = await stripe.billingPortal.configurations.list();

  // Create portal configuration
  if (configurations.data.length) {
    configuration = configurations.data[0];
  } else {
    configuration = await stripe.billingPortal.configurations.create({
      business_profile: {
        headline: "Manage your subscription",
        privacy_policy_url: `${process.env.BASE_URL}/privacy`,
        terms_of_service_url: `${process.env.BASE_URL}/terms`,
      },
      features: {
        customer_update: {
          allowed_updates: [
            "email" as const,
            "address" as const,
            "tax_id" as const,
          ],
          enabled: true,
        },
        invoice_history: { enabled: true },
        payment_method_update: { enabled: true },
        subscription_update: {
          enabled: true,
          default_allowed_updates: [
            "price" as const,
            "promotion_code" as const,
          ],
          proration_behavior: "create_prorations",
          products: productsWithPrices.filter((p) => p.prices.length > 0),
        },
        subscription_cancel: {
          enabled: true,
          mode: "at_period_end",
          cancellation_reason: {
            enabled: true,
            options: [
              "too_expensive",
              "missing_features",
              "switched_service",
              "unused",
              "other",
            ] as const,
          },
        },
      },
    });
  }

  // Create portal session
  const session = await stripe.billingPortal.sessions.create({
    customer: customer.id,
    configuration: configuration.id,
    return_url: `${process.env.BASE_URL}/dashboard`,
  });

  return session;
}

export async function recordUsagetoMeterForBilling(
  subscription: Stripe.Subscription,
  customer: Stripe.Customer
): Promise<void> {
  const meteredItem = subscription.items.data.find(
    (item) => item.price.recurring?.usage_type === "metered"
  );

  const meterId = meteredItem?.price.recurring?.meter;
  const meter = await stripe.billing.meters.retrieve(meterId as string);
  const meterEvent = meter.event_name;
  const payloadKey = meter.value_settings?.event_payload_key;

  await stripe.billing.meterEvents.create({
    event_name: meterEvent,
    payload: {
      [payloadKey as string]: "1",
      stripe_customer_id: customer.id,
    },
  });
}
