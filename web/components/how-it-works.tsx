import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function HowItWorks() {
  return (
    <section id="how-it-works" className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">How Replier Works</h2>
          <p className="text-xl text-muted-foreground">
            Get started in minutes and transform your social media engagement:
          </p>
        </div>
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div>
            <ol className="space-y-4">
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">1</span>
                <span>Install the Replier Chrome extension</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">2</span>
                <span>Browse your social media platforms as usual</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">3</span>
                <span>Click the Replier button when you want to respond</span>
              </li>
              <li className="flex items-center">
                <span className="bg-primary text-primary-foreground rounded-full w-8 h-8 flex items-center justify-center mr-4">4</span>
                <span>Review and post the AI-generated response</span>
              </li>
            </ol>
            <Link href={"https://youtu.be/H3Hg-JjFehE"} target="_blank">
              <Button className="mt-8">
                Watch Demo Video
              </Button>
            </Link>
          </div>
          <div className="relative h-[300px] bg-muted rounded-lg overflow-hidden">
            <iframe width="100%" height="100%" src="https://www.youtube.com/embed/30Zt7See2B0?autoplay=1" title="Replier - AI-Powered Social Media Comment Replier" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
