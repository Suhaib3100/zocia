import { Card, CardContent } from "@/components/ui/card";

export default async function Testimonial() {
  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-bold mb-6">Trusted by Social Media Managers Worldwide</h2>
        <div className="grid md:grid-cols-3 gap-8 mt-12">
          <Card>
            <CardContent className="pt-6">
                <p className="italic mb-4">&ldquo;Replier has revolutionized our social media strategy. We&rsquo;ve seen a 40% increase in engagement since we started using it!&rdquo;</p>
              <p className="font-semibold">- Sarah J., Marketing Director</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
                <p className="italic mb-4">&ldquo;The time-saving aspect of Replier is incredible. It&rsquo;s like having an extra team member dedicated to social media.&rdquo;</p>
              <p className="font-semibold">- Mike T., Small Business Owner</p>
            </CardContent>
          </Card>
          <Card>
            <CardContent className="pt-6">
              <p className="italic mb-4">&ldquo;The AI-generated responses are surprisingly human-like. Our followers can&rsquo;t tell the difference!&rdquo;</p>
              <p className="font-semibold">- Emily R., Influencer</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
