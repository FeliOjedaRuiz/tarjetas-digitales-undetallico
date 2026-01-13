"use client"

import { useEffect, useRef, useState } from "react"

export function FinalSection({ finalMessage, finalSubtitle, senderName }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.3 },
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => observer.disconnect()
  }, [])

  return (
    <section
      ref={sectionRef}
      className="min-h-screen flex items-center justify-center px-4 py-20 bg-gradient-to-br from-primary/30 via-accent/20 to-secondary/30 relative overflow-hidden"
    >
      {/* Corazón grande de fondo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-5">
        <div className="text-[40rem] animate-heartbeat">♥</div>
      </div>

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        <div className="mb-12 animate-heartbeat">
          <div className="text-8xl mb-8">💕</div>
        </div>

        <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-foreground mb-8 font-light text-pretty">
          {finalMessage}
        </p>

        <div className="mb-8">
          <p className="text-xl md:text-2xl text-primary font-medium">{finalSubtitle}</p>
        </div>

        <div className="flex items-center justify-center gap-3">
          <div className="h-px w-16 bg-primary/50"></div>
          <p className="text-lg text-muted-foreground italic">Con amor, {senderName}</p>
          <div className="h-px w-16 bg-primary/50"></div>
        </div>
      </div>
    </section>
  )
}
