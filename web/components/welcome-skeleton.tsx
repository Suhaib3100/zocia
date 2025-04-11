import { Card, CardContent } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

export default function WelcomeSkeleton() {
  return (
    <Card className="mb-6">
      <CardContent className="flex items-center pt-6 space-x-4">
          <Skeleton className="h-16 w-16 rounded-full" />
        <div className="w-full">
          <Skeleton className="h-7 w-2/3 mb-2" />
          <Skeleton className="h-4 w-1/2" />
        </div>
      </CardContent>
    </Card>
  )
}
