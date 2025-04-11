import { Card, CardContent } from "@/components/ui/card"
import Footer from '@/components/footer'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Replier",
  description: "Learn about our privacy policy and how we handle your data.",
}

export default async function Terms() {
  return (
    <>
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Terms of Service</h1>
            <Card className="max-w-3xl mx-auto py-4">
              <CardContent className="prose prose-sm max-w-none">
                  <h2>1. Acceptance of Terms</h2>
                  <p>By accessing or using the Replier service, you agree to be bound by these Terms of Service. If you disagree with any part of the terms, you may not access the service.</p>

                  <h2>2. Description of Service</h2>
                  <p>Replier is an AI-powered social media management tool that helps users automate responses to social media interactions.</p>

                  <h2>3. User Responsibilities</h2>
                  <p>You are responsible for your use of the service and any content you provide, including compliance with applicable laws, rules, and regulations.</p>

                  <h2>4. Subscription and Billing</h2>
                  <p>Replier offers various subscription plans. By selecting a subscription, you agree to pay the applicable fees. Fees are non-refundable except as described in our refund policy.</p>

                  <h2>5. Refund Policy</h2>
                  <p>We offer a 14-day full refund policy if you don&apos;t use the app at all during the first two weeks after subscription. However, if there&apos;s any usage within this 14-day period, we cannot offer a refund as each AI-generated response incurs costs on our end.</p>

                  <h2>6. Subscription Cancellation</h2>
                  <p>You may cancel your subscription at any time. However, cancelling a subscription does not immediately terminate the service. Your subscription will remain active until the end of the current billing period (monthly or yearly, depending on your subscription type).</p>

                  <h2>7. Customer Support</h2>
                  <p>We offer customer support through email. If you need assistance or have any questions, please contact our support team at support@replier.social.</p>

                  <h2>8. Intellectual Property</h2>
                  <p>The service and its original content, features, and functionality are owned by Replier and are protected by international copyright, trademark, patent, trade secret, and other intellectual property or proprietary rights laws.</p>

                  <h2>9. Limitation of Liability</h2>
                  <p>In no event shall Replier, nor its directors, employees, partners, agents, suppliers, or affiliates, be liable for any indirect, incidental, special, consequential or punitive damages, including without limitation, loss of profits, data, use, goodwill, or other intangible losses, resulting from your access to or use of or inability to access or use the service.</p>

                  <h2>10. Changes to Terms</h2>
                    <p>We reserve the right to modify or replace these Terms at any time. If a revision is material, we will provide at least 30 days&apos; notice prior to any new terms taking effect.</p>

                  <h2>11. Contact Us</h2>
                  <p>If you have any questions about these Terms, please contact us at:</p>
                  <ul>
                    <li>Email: support@replier.social</li>
                  </ul>
              </CardContent>
            </Card>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}
