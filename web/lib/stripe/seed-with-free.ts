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

    // Create Free Plan
    console.log("🚀 Creating Free product...");
    const freeProduct = await stripe.products
      .create({
        name: "Free",
        description: "Try our AI reply generator",
        marketing_features: [
          { name: "50 AI reply generations" },
          { name: "No credit card required" },
          { name: "Basic features" },
        ],
      })
      .catch((error) => {
        throw new Error(`Failed to create Free product: ${error.message}`);
      });
    console.log("✅ Free product created:", freeProduct.id);

    console.log("💰 Creating Free plan price...");
    const freePlanPrice = await stripe.prices
      .create({
        product: freeProduct.id,
        unit_amount: 0,
        currency: "eur",
        recurring: {
          interval: "month",
        },
      })
      .catch((error) => {
        throw new Error(`Failed to create Free plan price: ${error.message}`);
      });
    console.log("✅ Free plan price created:", freePlanPrice.id);

    console.log("📈 Creating Free usage based price...");
    const freeUsageBased = await stripe.prices
      .create({
        product: freeProduct.id,
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
          `Failed to create Free usage based price: ${error.message}`
        );
      });
    console.log("✅ Free usage based price created:", freeUsageBased.id);

    console.log("\n" + "✨ ".repeat(20) + "\n");

    // Create Starter Plan (existing code)
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

    // ... Rest of the existing code for other plans ...

    console.log("\n" + "✨ Seed completed successfully!");
  } catch (error) {
    console.error(
      "❌ Seed failed:",
      error instanceof Error ? error.message : error
    );
    process.exit(1);
  }
})();