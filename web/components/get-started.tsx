import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default async function GetStarted() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Ready to Transform Your Social Media Strategy?</h2>
        <p className="text-xl text-muted-foreground mb-8">
          Join thousands of businesses and social media managers who are saving time and boosting engagement with Replier.
        </p>
        <Link href={"https://chromewebstore.google.com/detail/ai-social-replier-gpt-res/ahfilmopkkfaehndncopogaohdkddjjd"} target="_blank">
          <Button size="lg">
            Get Started Now
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
        <p className="mt-4 text-sm text-muted-foreground">
          No credit card required. Install the Chrome extension and get 5 free AI-powered replies!
        </p>
      </div>
    </section>
  )
}
