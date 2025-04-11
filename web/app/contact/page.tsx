import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail } from 'lucide-react'
import Footer from '@/components/footer'
import ContactForm from "@/components/contact-form"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Contact Us - Replier",
  description: "Get in touch with the Replier team. We'd love to hear from you!"
}

export default async function ContactPage() {
  return (
    <>
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Contact Us</h1>
            <div className="grid md:grid-cols-2 gap-12">
              <Card>
                <CardHeader>
                  <CardTitle>Send Us a Message</CardTitle>
                    <CardDescription>We&apos;d love to hear from you. Fill out the form below and we&apos;ll get back to you as soon as possible.</CardDescription>
                </CardHeader>
                <CardContent>
                  <ContactForm />
                </CardContent>
              </Card>
              <div className="space-y-8">
                <Card>
                  <CardHeader>
                    <CardTitle>Contact Information</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center space-x-4">
                      <Mail className="h-5 w-5 text-primary" />
                      <span>support@replier.social</span>
                    </div>
                    {/* <div className="flex items-center space-x-4">
                      <Phone className="h-5 w-5 text-primary" />
                      <span>+1 (555) 123-4567</span>
                    </div>
                    <div className="flex items-center space-x-4">
                      <MapPin className="h-5 w-5 text-primary" />
                      <span>123 AI Street, Tech City, TC 12345</span>
                    </div> */}
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle>Frequently Asked Questions</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h3 className="font-semibold">How does Replier work?</h3>
                      <p className="text-sm text-muted-foreground">Replier uses advanced AI to generate contextually relevant responses to your social media interactions, saving you time and boosting engagement.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">Is there a free trial?</h3>
                      <p className="text-sm text-muted-foreground">Yes! You can get 5 free AI-powered replies when you install our Chrome extension.</p>
                    </div>
                    <div>
                      <h3 className="font-semibold">How do I get started?</h3>
                      <p className="text-sm text-muted-foreground">Simply install our Chrome extension, connect your social media accounts, and start using Replier to manage your interactions!</p>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
