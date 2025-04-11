import { auth, signIn, signOut } from "@/auth"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { LayoutDashboard, LogIn, LogOut } from "lucide-react"

export default async function Navigation() {
  const session = await auth()

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container mx-auto px-4 py-4 flex justify-between items-center">
        <Link href="/" className="flex items-center space-x-2">
          <svg className="h-8 w-8 text-primary" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
          <span className="text-2xl font-bold">Replier</span>
        </Link>
        <nav className="hidden md:flex items-center space-x-6">
          <Link
            href="/#features"
            className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Features
          </Link>
          <Link
            href="/#how-it-works"
            className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            How it Works
          </Link>
          <Link
            href="/#pricing"
            className="text-sm text-muted-foreground hover:text-primary transition-colors relative after:absolute after:bottom-0 after:left-0 after:h-[2px] after:w-0 after:bg-primary after:transition-all hover:after:w-full"
          >
            Pricing
          </Link>
        </nav>
        {session?.user ? (
          <div className="flex items-center gap-4">
            <Link href="/dashboard">
              <Button variant="ghost">
                <LayoutDashboard className="mr-2 h-4 w-4" />
                Dashboard
              </Button>
            </Link>
            <form action={async () => {
              'use server'
              await signOut({redirectTo: '/'})
            }}>
              <Button type="submit" variant="ghost">
                <LogOut className="mr-2 h-4 w-4" />
                Logout
              </Button>
            </form>
          </div>
        ) : (
          <form action={async () => {
            'use server'
            await signIn('google', {redirectTo: '/dashboard'})
          }}>
            <Button type="submit" variant="ghost">
              <LogIn className="mr-2 h-4 w-4" />
              Login
            </Button>
          </form>
        )}
      </div>
    </header>
  )
}
