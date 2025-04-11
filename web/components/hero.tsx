'use client'

import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ArrowRight, Chrome, Clock, Users, Zap } from "lucide-react";
import Link from "next/link";

export default function Hero() {
  return (
    <section className="bg-gradient-to-b from-background to-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <Badge className="mb-4 text-sm py-1 px-3">AI-Powered Social Media Management</Badge>
          <h1 className="text-4xl md:text-6xl font-extrabold mb-6 leading-tight">
            <span className="text-primary">Stop Drowning</span> in Social Media Comments.<br />
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-primary to-primary-foreground">
              Start Engaging at Scale.
            </span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8">
            Replier uses AI to automatically respond to your social media interactions,
            saving you hours daily while boosting engagement by up to 400%.
          </p>
          <div className="flex flex-col sm:flex-row justify-center items-center gap-4">
            <Link href={"/#pricing"}>
              <Button size="lg" className="w-full sm:w-auto">
                Boost Your Engagement
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
            <Link href={"https://chromewebstore.google.com/detail/ai-social-replier-gpt-res/ahfilmopkkfaehndncopogaohdkddjjd"} target="_blank">
              <Button size="lg" variant="outline" className="w-full sm:w-auto">
                <Chrome className="mr-2 h-4 w-4" />
                Add to Chrome - 5 Free Replies
              </Button>
            </Link>
          </div>
          <div className="mt-12 grid grid-cols-1 sm:grid-cols-3 gap-6">
            <div className="flex items-center justify-center">
              <Clock className="h-6 w-6 text-primary mr-2" />
              <span className="text-sm">Save 10+ hours weekly</span>
            </div>
            <div className="flex items-center justify-center">
              <Zap className="h-6 w-6 text-primary mr-2" />
              <span className="text-sm">400% engagement boost</span>
            </div>
            <div className="flex items-center justify-center">
              <Users className="h-6 w-6 text-primary mr-2" />
              <span className="text-sm">10,000+ happy users</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
