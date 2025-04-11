import { Clock, TrendingUp, Twitter, Users } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

export default async function Features() {
  const features = [
    {
      title: "AI-Powered Tweet Replies",
      description: "Generate contextually relevant responses to tweets in seconds, maintaining your unique voice.",
      icon: Twitter
    },
    {
      title: "Engagement Booster",
      description: "Increase your Twitter engagement rates by up to 400% with timely and relevant responses.",
      icon: TrendingUp
    },
    {
      title: "Time-Saving Automation",
      description: "Save an average of 10 hours per week on Twitter management and interaction.",
      icon: Clock
    },
    {
      title: "Follower Growth",
      description: "Grow your Twitter following faster with consistent and engaging interactions.",
      icon: Users
    }
  ]

  return (
    <section id="features" className="py-20">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">How Replier Amplifies Your Twitter Game</h2>
        <div className="grid md:grid-cols-2 gap-8">
          {features.map((feature, index) => (
            <Card key={index}>
              <CardHeader>
                <CardTitle className="flex items-center">
                  <feature.icon className="h-6 w-6 text-primary mr-2" />
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p>{feature.description}</p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
