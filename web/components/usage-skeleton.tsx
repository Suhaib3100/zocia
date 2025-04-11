import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function UsageSkeleton() {
  return (
    <Card>
      <CardHeader>
        <Skeleton className="h-7 w-32 mb-2" />
        <Skeleton className="h-4 w-56 mb-12" />
      </CardHeader>
      <CardContent className="space-y-4">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-4 w-full" />
      </CardContent>
      <CardFooter>
        <Skeleton className="h-4 w-48" />
      </CardFooter>
    </Card>
  )
}
