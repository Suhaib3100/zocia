import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {  User as UserIcon } from 'lucide-react'
import { auth } from "@/auth";

export default async function Welcome() {
  const session = await auth()

  return (
    <Card className="mb-6">
      <CardContent className="pt-6">
        <div className="flex items-center space-x-4">
          <Avatar className="h-16 w-16">
            <AvatarImage src={session?.user?.image ?? undefined} alt={session?.user?.name ?? undefined} />
            <AvatarFallback><UserIcon className="h-8 w-8" /></AvatarFallback>
          </Avatar>
          <div>
            <h1 className="text-2xl font-bold">Welcome, {session?.user?.name}!</h1>
            <p className="text-muted-foreground">{session?.user?.email}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}
