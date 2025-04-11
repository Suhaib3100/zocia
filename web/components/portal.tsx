import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { ArrowUpRight } from "lucide-react";
import { portal } from "@/lib/stripe/action";

export default async function Portal() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <CardTitle>Manage Your Subscription</CardTitle>
        <CardDescription>Update your plan or billing information</CardDescription>
      </CardHeader>
      <CardContent>
        <form action={portal}>
          <Button type="submit" className="w-full sm:w-auto">
            Go to Billing Portal
            <ArrowUpRight className="ml-2 h-4 w-4" />
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
