import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"

interface PricingProps {
  pathname?: string;
}

export default function PricingSkeleton({ pathname }: PricingProps) {
  const currentPath = pathname || '/dashboard';

  return (
    <Card className="mt-6">
      {currentPath === '/dashboard' ? (
      <CardHeader>
        <Skeleton className="h-7 w-64 mb-2" />
        <Skeleton className="h-4 w-80 mb-12" />
      </CardHeader>
      ) : (
        <CardHeader className="container mx-auto px-4 items-center">
          <Skeleton className="h-10 w-72 mb-4" />
          <Skeleton className="h-4 w-2/4 mb-12" />
      </CardHeader>
      )}
      <CardContent>
        <div className="grid gap-6 md:grid-cols-3">
          {[...Array(3)].map((_, index) => (
            <Card key={index} className="flex flex-col">
              <CardHeader>
                <Skeleton className="h-7 w-2/4 mb-2" />
                <Skeleton className="h-10 w-3/4" />
              </CardHeader>
              <CardContent className="flex-grow">
                <Skeleton className="h-4 w-full mb-4" />
                <ul className="space-y-2">
                  {[...Array(4)].map((_, featureIndex) => (
                    <li key={featureIndex} className="flex items-center">
                      <Skeleton className="h-4 w-4 mr-2" />
                      <Skeleton className="h-4 flex-grow" />
                    </li>
                  ))}
                </ul>
              </CardContent>
              <CardFooter>
                <Skeleton className="h-10 w-full" />
              </CardFooter>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
