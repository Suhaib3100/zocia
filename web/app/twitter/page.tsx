import Footer from "@/components/footer";
import Pricing from "@/components/pricing";
import PricingSkeleton from "@/components/pricing-skeleton";
import Action from "@/components/twitter/action";
import Features from "@/components/twitter/features";
import Header from "@/components/twitter/header";
import Trial from "@/components/twitter/trial";
import { Metadata } from "next";
import { Suspense } from "react";

export const metadata: Metadata = {
  title: "Boost Twitter Engagement 400% with AI-Powered Replies - Replier",
  description: "Supercharge your Twitter presence with Replier's AI-powered replies. Increase engagement by 400%, save 10+ hours weekly, and grow followers faster. Try it free - 5 AI replies on us!",
}

export default async function Twitter() {
  return (
    <>
      <main className="flex-grow">
        <Header />
        <Features />
        <Action />
        <Suspense fallback={<PricingSkeleton pathname="/" />}>
          <Pricing pathname="/" />
        </Suspense>
        <Trial />
      </main>
      <Footer />
    </>
  )
}
