import { Card, CardContent, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function PortalSkeleton() {
  return (
    <Card className="mt-6">
      <CardHeader>
        <Skeleton className="h-7 w-72 mb-2" />
        <Skeleton className="h-4 w-56 mb-12" />
      </CardHeader>
      <CardContent>
        <Skeleton className="h-10 w-48" />
      </CardContent>
    </Card>
  )
}
