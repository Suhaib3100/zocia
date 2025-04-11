'use client'

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Zap } from "lucide-react"

export default function Action() {
  const [videoPlaying, setVideoPlaying] = useState(false)

  return (
    <section className="bg-muted py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-3xl font-bold mb-6">See Replier in Action</h2>
          <p className="text-xl text-muted-foreground">
            Watch how Replier transforms your Twitter interactions in real-time.
          </p>
        </div>
        <div className="aspect-video max-w-3xl mx-auto bg-black rounded-lg overflow-hidden">
          {videoPlaying ? (
            <iframe
              width="100%"
              height="100%"
              src="https://www.youtube.com/embed/30Zt7See2B0?autoplay=1"
              title="Replier Demo Video"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          ) : (
            <div className="flex items-center justify-center h-full">
              <Button size="lg" onClick={() => setVideoPlaying(true)}>
                <Zap className="mr-2 h-4 w-4" />
                Watch Demo
              </Button>
            </div>
          )}
        </div>
      </div>
    </section>
  )
}
