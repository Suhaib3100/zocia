import { Card, CardContent } from "@/components/ui/card"
import Footer from '@/components/footer'
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Replier",
  description: "Replier is committed to protecting your privacy. Learn how we handle your personal information when you use our AI-powered social media management tool.",
}

export default async function Privacy() {
  return (
    <>
      <main className="flex-grow">
        <section className="py-20">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl font-bold text-center mb-8">Privacy Policy</h1>
            <Card className="max-w-3xl mx-auto py-4">
              {/* <CardHeader>
                <CardTitle>Replier Privacy Policy</CardTitle>
              </CardHeader> */}
              <CardContent className="prose prose-sm max-w-none">
                {/* <p>Last updated: {new Date().toLocaleDateString()}</p> */}

                <h2>1. Introduction</h2>
                <p>Replier (&ldquo;we&rdquo;, &ldquo;our&rdquo;, or &ldquo;us&rdquo;) is committed to protecting your privacy. This Privacy Policy explains how we handle your personal information when you use our AI-powered social media management tool.</p>

                <h2>2. Information We Don&apos;t Collect</h2>
                <p>We want to be clear that we do not store any user information on our website. Our service is designed to respect your privacy and minimize data collection. This includes our Chrome extension, which does not collect or store any user data.</p>

                <h2>3. GDPR Compliance</h2>
                <p>We are fully committed to complying with the General Data Protection Regulation (GDPR). As we do not store personal data on our website, many GDPR requirements do not apply to our operations. However, we still respect and uphold the principles of data protection outlined in the GDPR.</p>

                <h2>4. Payment Processing</h2>
                <p>We use Stripe as our payment processor. When you make a payment, you are subject to Stripe&apos;s privacy policy and terms of service. We do not handle or store your payment information directly. For more information about how Stripe processes your data, please refer to <a href="https://stripe.com/privacy" target="_blank" rel="noopener noreferrer">Stripe&apos;s Privacy Policy</a>.</p>

                <h2>5. Chrome Extension and AI Services</h2>
                <p>Our Chrome extension does not collect or store any user data. When you use our service, we utilize third-party AI services, such as OpenAI, to generate responses. The use of these AI services is subject to their respective privacy policies. We recommend reviewing the privacy policy of OpenAI (available at <a href="https://openai.com/policies/privacy-policy" target="_blank" rel="noopener noreferrer">https://openai.com/policies/privacy-policy</a>) and any other AI services we may use.</p>

                <h2>6. Third-Party Services</h2>
                <p>Our service integrates with various social media platforms. Your use of these platforms is subject to their respective privacy policies and terms of service. We recommend reviewing the privacy policies of any third-party services you use in conjunction with Replier. This includes the AI services we use to power our response generation functionality.</p>

                <h2>7. Data Security</h2>
                <p>While we do not store user data on our website, we take reasonable precautions to protect any information that may be transmitted through our service. However, no method of electronic storage or transmission is 100% secure, and we cannot guarantee absolute security.</p>

                <h2>8. Changes to This Privacy Policy</h2>
                <p>We may update this Privacy Policy from time to time. We will notify you of any changes by posting the new Privacy Policy on this page and updating the &ldquo;Last updated&rdquo; date at the top of this policy.</p>

                <h2>9. Contact Us</h2>
                <p>If you have any questions about this Privacy Policy, please contact us at:</p>
                <ul>
                  <li>Email: support@replier.social</li>
                  {/* <li>Address: 123 AI Street, Tech City, TC 12345</li> */}
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
