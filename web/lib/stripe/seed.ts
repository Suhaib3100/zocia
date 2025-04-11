import { stripe } from ".";
import { loadEnvConfig } from "@next/env";

if (!process.env.ADMIN_NAME) loadEnvConfig(process.cwd());

const isDev = process.argv.includes("--dev");

(async () => {
  try {
    console.log("🌱 Starting seed process...");

    console.log("📊 Creating billing meter...");
    const meter = await stripe.billing.meters
      .create({
        display_name: "Replier",
        event_name: "replier",
        default_aggregation: { formula: "sum" },
        value_settings: { event_payload_key: "generate" },
        customer_mapping: {
          type: "by_id",
          event_payload_key: "stripe_customer_id",
        },
      })
      .catch((error) => {
        throw new Error(`Failed to create meter: ${error.message}`);
      });
    console.log("✅ Billing meter created:", meter.id);

    console.log("\n" + "✨ ".repeat(20) + "\n");

    console.log("🚀 Creating Starter product...");
    const starterProduct = await stripe.products
      .create({
        name: "Starter",
        description: "Perfect for occasional users",
        marketing_features: [
          { name: "500 AI reply generations" },
          { name: "€0.01 per generation after limit" },
          { name: "Monthly billing" },
        ],
      })
      .catch((error) => {
        throw new Error(`Failed to create Starter product: ${error.message}`);
      });
    console.log("✅ Starter product created:", starterProduct.id);

    console.log("💰 Creating Starter flat rate price...");
    const starterFlatRate = await stripe.prices
      .create({
        product: starterProduct.id,
        unit_amount: 500,
        currency: "eur",
        recurring: {
          interval: "month",
        },
      })
      .catch((error) => {
        throw new Error(`Failed to create Starter flat rate: ${error.message}`);
      });
    console.log("✅ Starter flat rate created:", starterFlatRate.id);

    console.log("📈 Creating Starter usage based price...");
    const starterUsageBased = await stripe.prices
      .create({
        product: starterProduct.id,
        currency: "eur",
        billing_scheme: "per_unit",
        recurring: {
          usage_type: "metered",
          interval: "month",
          meter: meter.id,
        },
        unit_amount_decimal: "1",
      })
      .catch((error) => {
        throw new Error(
          `Failed to create Starter usage based price: ${error.message}`
        );
      });
    console.log("✅ Starter usage based price created:", starterUsageBased.id);

    console.log("\n" + "✨ ".repeat(20) + "\n");

    let customer;

    if (isDev) {
      console.log("🔧 Running in development mode...");
      console.log("👤 Creating test customer...");
      customer = await stripe.customers
        .create({
          name: process.env.ADMIN_NAME,
          email: process.env.ADMIN_EMAIL,
          payment_method: "pm_card_visa",
          invoice_settings: {
            default_payment_method: "pm_card_visa",
          },
        })
        .catch((error) => {
          throw new Error(`Failed to create customer: ${error.message}`);
        });
      console.log("✅ Test customer created:", customer.id);

      console.log("💳 Attaching test payment method...");
      await stripe.paymentMethods
        .attach("pm_card_visa", {
          customer: customer.id,
        })
        .catch((error) => {
          throw new Error(`Failed to attach payment method: ${error.message}`);
        });
      console.log("✅ Test payment method attached");

      console.log("🚀 Creating subscription...");
      await stripe.subscriptions
        .create({
          customer: customer.id,
          items: [
            { price: starterFlatRate.id },
            { price: starterUsageBased.id },
          ],
        })
        .catch((error) => {
          throw new Error(`Failed to create subscription: ${error.message}`);
        });
      console.log("✅ Subscription created");

      console.log("\n" + "✨ ".repeat(20) + "\n");
    }

    console.log("🚀 Creating Pro product...");
    const proProduct = await stripe.products
      .create({
        name: "Pro",
        description: "Ideal for regular users",
        marketing_features: [
          { name: "6000 AI reply generations" },
          { name: "€0.01 per generation after limit" },
          { name: "Yearly billing (2 months free)" },
          { name: "Save 17% compared to monthly" },
        ],
      })
      .catch((error) => {
        throw new Error(`Failed to create Pro product: ${error.message}`);
      });
    console.log("✅ Pro product created:", proProduct.id);

    console.log("💰 Creating Pro flat rate price...");
    const proFlatRate = await stripe.prices
      .create({
        product: proProduct.id,
        unit_amount: 5000,
        currency: "eur",
        recurring: {
          interval: "year",
        },
      })
      .catch((error) => {
        throw new Error(`Failed to create Pro flat rate: ${error.message}`);
      });
    console.log("✅ Pro flat rate created:", proFlatRate.id);

    console.log("📈 Creating Pro usage based price...");
    const proUsageBased = await stripe.prices
      .create({
        product: proProduct.id,
        currency: "eur",
        billing_scheme: "per_unit",
        recurring: {
          usage_type: "metered",
          interval: "year",
          meter: meter.id,
        },
        unit_amount_decimal: "1",
      })
      .catch((error) => {
        throw new Error(
          `Failed to create Pro usage based price: ${error.message}`
        );
      });
    console.log("✅ Pro usage based price created:", proUsageBased.id);

    console.log("\n" + "✨ ".repeat(20) + "\n");

    console.log("🚀 Creating Unlimited product...");
    const unlimitedProduct = await stripe.products
      .create({
        name: "Unlimited",
        description: "Best for power users",
        marketing_features: [
          { name: "Unlimited AI reply generations" },
          { name: "No usage limits" },
          { name: "No extra charges" },
          { name: "Monthly billing" },
        ],
      })
      .catch((error) => {
        throw new Error(`Failed to create Unlimited product: ${error.message}`);
      });
    console.log("✅ Unlimited product created:", unlimitedProduct.id);

    console.log("💰 Creating Unlimited flat rate price...");
    const unlimitedFlatRate = await stripe.prices
      .create({
        product: unlimitedProduct.id,
        unit_amount: 2000,
        currency: "eur",
        recurring: {
          interval: "month",
        },
      })
      .catch((error) => {
        throw new Error(
          `Failed to create Unlimited flat rate: ${error.message}`
        );
      });
    console.log("✅ Unlimited flat rate created:", unlimitedFlatRate.id);

    console.log("📈 Creating Unlimited usage based price...");
    const unlimitedUsageBased = await stripe.prices
      .create({
        product: unlimitedProduct.id,
        currency: "eur",
        billing_scheme: "per_unit",
        recurring: {
          usage_type: "metered",
          interval: "month",
          meter: meter.id,
        },
        unit_amount_decimal: "0",
      })
      .catch((error) => {
        throw new Error(
          `Failed to create Unlimited usage based price: ${error.message}`
        );
      });
    console.log(
      "✅ Unlimited usage based price created:",
      unlimitedUsageBased.id
    );

    console.log("\n" + "✨ Seed completed successfully!");
  } catch (error) {
    console.error(
      "❌ Seed failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
})();
