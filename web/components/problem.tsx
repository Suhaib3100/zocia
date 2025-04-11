import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { XCircle } from "lucide-react";

export default async function Problem() {
  return (
    <section className="py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6">The Problem with Manual Social Media Management</h2>
            <p className="text-xl text-muted-foreground mb-12">
            Managing social media manually is a time-consuming nightmare. Here&apos;s what you&apos;re up against:
            </p>
        </div>
        <div className="grid md:grid-cols-2 gap-8">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 text-destructive mr-2" />
                Overwhelming Volume
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Drowning in a sea of comments, messages, and mentions across multiple platforms.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 text-destructive mr-2" />
                Time-Consuming Responses
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Spending hours crafting individual responses, taking time away from strategic tasks.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 text-destructive mr-2" />
                Inconsistent Engagement
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Struggling to maintain a consistent presence and timely responses across all channels.</p>
            </CardContent>
          </Card>
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center">
                <XCircle className="h-5 w-5 text-destructive mr-2" />
                Missed Opportunities
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p>Failing to capitalize on engagement opportunities due to delays or oversight.</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </section>
  )
}
