import { auth } from "@/auth";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { stripe } from "@/lib/stripe";

export default async function Usage() {
  const session = await auth()

  const customer = await stripe.customers.list({
      email: session?.user?.email || undefined,
      expand: ['data.subscriptions']
    }).then(res => res.data[0])

  const subscription = customer?.subscriptions?.data[0];

  const meteredPricesWithTiers = await Promise.all(
    subscription?.items.data
      .filter(item => item.price.recurring?.usage_type === 'metered')
      .map(async (item) => {
        // Get full price details including tiers
        const priceDetails = await stripe.prices.retrieve(item.price.id, {
          expand: ['tiers']
        });

        // Get current usage
        const usage = item.price.recurring?.meter && await stripe.billing.meters.listEventSummaries(
          item.price.recurring.meter,
          {
            customer: customer?.id || '',
            start_time: subscription.current_period_start!,
            end_time: subscription.current_period_end!,
          }
        );

        return {
          priceId: item.price.id,
          currentUsage: typeof usage === 'object' ? usage?.data[0]?.aggregated_value ?? 0 : 0,
          tiers: priceDetails.tiers,
          meter: item.price.recurring?.meter,
          interval: item.price.recurring?.interval
        };
      }) ?? []
  );

  const usage = meteredPricesWithTiers[0]?.currentUsage || 0;
  const limit = meteredPricesWithTiers[0]?.tiers?.[0]?.up_to ?? 0;

  const usagePercentage = usage === 0 || limit === 0 ? 0 : (usage / limit) * 100;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Usage</CardTitle>
        <CardDescription>Total posts replied this month</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold mb-2">{usage} {limit > 0 ? `/ ${limit}` : ''}</div>
        {limit > 0 && (
          <Progress value={usagePercentage} className="w-full" />
        )}
      </CardContent>
      {limit > 0 && (
      <CardFooter>
        <p className="text-sm text-muted-foreground">
          {usagePercentage >= 100 ? 'Usage limit reached' : `${Math.round(usagePercentage)}% of limit used`}
        </p>
      </CardFooter>
      )}
    </Card>
  )
}
