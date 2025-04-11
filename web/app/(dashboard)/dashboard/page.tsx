import { auth } from "@/auth";
import { stripe} from "@/lib/stripe"
import Welcome from "@/components/welcome";
import Subscription from "@/components/subscription";
import Usage from "@/components/usage";
import Portal from "@/components/portal";
import Pricing from "@/components/pricing";
import { Suspense } from "react";
import PricingSkeleton from "@/components/pricing-skeleton";
import PortalSkeleton from "@/components/portal-skeleton";
import SubscriptionSkeleton from "@/components/subscription-skeleton";
import UsageSkeleton from "@/components/usage-skeleton";
import WelcomeSkeleton from "@/components/welcome-skeleton";

export default async function Dashboard() {
  const session = await auth()

  const customer = await stripe.customers.list({
    email: session?.user?.email || undefined,
    expand: ['data.subscriptions']
  }).then(res => res.data[0]);

  const subscription = customer?.subscriptions?.data[0];

  return (
    <main className="container mx-auto p-4 max-w-3xl">
      <Suspense fallback={<WelcomeSkeleton />}>
        <Welcome />
      </Suspense>

      <div className="grid gap-6 md:grid-cols-2">
        <Suspense fallback={<SubscriptionSkeleton />}>
          <Subscription />
        </Suspense>
        <Suspense fallback={<UsageSkeleton />}>
          <Usage />
        </Suspense>
      </div>
      <div className="mt-6">
        {subscription ? (
          <Suspense fallback={<PortalSkeleton />}>
            <Portal />
          </Suspense>
        ) : (
          <Suspense fallback={<PricingSkeleton />}>
            <Pricing />
          </Suspense>
        )}
      </div>
    </main>
  );
}
