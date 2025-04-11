import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { CheckCircle, XCircle } from "lucide-react";
import License from "@/components/license";
import Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { auth } from "@/auth";
import { formatAsLicenseKey } from "@/lib/utils";

export default async function Subscription() {
  const session = await auth()

  const customer = await stripe.customers.list({
    email: session?.user?.email || undefined,
    expand: ['data.subscriptions']
  }).then(res => res.data[0]);

  const subscription = customer?.subscriptions?.data[0];

  let currentPlan: Stripe.Product | undefined;
  if (subscription) {
    currentPlan = await stripe.products.retrieve(
      subscription.items.data[0].price.product as string
    );
  } else {
    // Create a default free plan object
    currentPlan = {
      name: 'Free',
      description: 'Basic plan with limited features'
    } as Stripe.Product;
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Subscription Status</CardTitle>
        <CardDescription>Your current plan and status</CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex items-center space-x-2">
          {subscription?.status === 'active' || !subscription ? (
            <CheckCircle className="text-green-500" />
          ) : (
            <XCircle className="text-red-500" />
          )}
          <span className="capitalize font-semibold">
            {subscription?.status || (currentPlan?.name === 'Free' ? 'Active' : 'Inactive')}
          </span>
        </div>
        <Badge>{currentPlan?.name}</Badge>
        {subscription ? (
          <License license={formatAsLicenseKey(subscription.id)} />
        ) : (
          <License license={formatAsLicenseKey(`free_${session?.user?.email}`)} />
        )}
      </CardContent>
      <CardFooter>
        {subscription ? (
          <p className="text-sm text-muted-foreground">
            Expires: {new Date(subscription.current_period_end * 1000).toLocaleDateString()}
          </p>
        ) : (
          <p className="text-sm text-muted-foreground">
            Free plan includes 50 AI reply generations
          </p>
        )}
      </CardFooter>
    </Card>
  )
}
