'use client'

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { toast } from "@/hooks/use-toast"
import { Copy } from "lucide-react"

export default function License({license}: {license: string}) {
  const copyLicenseKey = () => {
    navigator.clipboard.writeText(license)

    toast({
      title: "License key copied",
      description: "The license key has been copied to your clipboard.",
    })
  }

  return (
    <div className="space-y-2">
    <Label htmlFor="license-key">License Key</Label>
    <div className="flex">
      <Input
        id="license-key"
        className="flex-grow"
        name="license"
        value={license}
        readOnly
      />
      <Button
        variant="outline"
        size="icon"
        onClick={copyLicenseKey}
        className="ml-2"
      >
        <Copy className="h-4 w-4" />
        <span className="sr-only">Copy license key</span>
      </Button>
    </div>
  </div>
  )
}
