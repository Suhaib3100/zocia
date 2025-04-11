'use client'

import Link from "next/link";

export default function Footer() {
  return (
    <footer className="border-t">
      <div className="container mx-auto px-4 py-6 flex flex-col md:flex-row justify-between items-center">
        <div className="text-sm text-muted-foreground">
          © 2024 Replier. All rights reserved.
        </div>
        <nav>
          <ul className="flex space-x-4 mt-4 md:mt-0">
            <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-primary">Privacy Policy</Link></li>
            <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-primary">Terms of Service</Link></li>
            <li><Link href="/contact" className="text-sm text-muted-foreground hover:text-primary">Contact Us</Link></li>
          </ul>
        </nav>
      </div>
    </footer>
  )
}
