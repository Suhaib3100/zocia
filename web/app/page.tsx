import Features from "@/components/features";
import Footer from "@/components/footer";
import GetStarted from "@/components/get-started";
import Hero from "@/components/hero";
import HowItWorks from "@/components/how-it-works";
import Pricing from "@/components/pricing";
import PricingSkeleton from "@/components/pricing-skeleton";
import Problem from "@/components/problem";
import Testimonial from "@/components/testimonial";
import { Suspense } from "react";

export default function Home() {
  return (
    <>
      <main className="flex-grow">
        <Hero />
        <Problem />
        <Features />
        <HowItWorks />
        <Testimonial />
        <Suspense fallback={<PricingSkeleton pathname="/" />}>
          <Pricing pathname="/" />
        </Suspense>
        <GetStarted />
      </main>
      <Footer />
    </>
  );
}
