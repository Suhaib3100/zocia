import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Clock, CreditCard, Globe, MessageSquare, Users, Zap } from "lucide-react"

const features = [
  {
    title: "AI-Powered Responses",
    description: "Our advanced AI generates contextually relevant and engaging responses to keep your audience interacting.",
    icon: Zap
  },
  {
    title: "Time-Saving Automation",
    description: "Automate your social media interactions and free up hours of your time for more strategic tasks.",
    icon: Clock
  },
  {
    title: "Boost Engagement",
    description: "Increase your social media engagement rates with timely and relevant responses, available 24/7.",
    icon: Users
  },
    {
    title: "Multilingual Support",
    description: "Respond to posts in multiple languages, automatically detecting and matching the language of the original post.",
    icon: Globe
  },
  {
    title: "Custom AI Prompts",
    description: "Define custom prompts for the AI, such as 'Act as a social media manager for a tech company' to tailor responses to your brand voice.",
    icon: MessageSquare
  },
  {
    title: "Flexible Pricing",
    description: "Enjoy flat-fee plans with a low cost of €0.01 per generation for exceeding limits, ensuring you only pay for what you use.",
    icon: CreditCard
  },
]

export default async function Features() {
  return (
    <section id="features" className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">Replier: Your AI-Powered Social Media Assistant</h2>
          <p className="text-xl text-muted-foreground">
            Revolutionize your social media management with these powerful features:
          </p>
        </div>
        <div className="grid md:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <feature.icon className="h-12 w-12 text-primary mb-4" />
                <CardTitle>{feature.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex-grow">
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
