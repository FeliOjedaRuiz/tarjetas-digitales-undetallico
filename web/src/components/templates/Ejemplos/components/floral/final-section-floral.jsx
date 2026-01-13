"use client"

import { useEffect, useState } from "react"

export function FinalSectionFloral({ finalMessage, finalSubtitle, senderName }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById("final-section-floral")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section
      id="final-section-floral"
      className="min-h-screen flex items-center justify-center px-4 py-20 relative overflow-hidden"
    >
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-10 left-10 text-8xl opacity-20 animate-pulse">🌸</div>
        <div className="absolute top-32 right-16 text-7xl opacity-20 animate-pulse" style={{ animationDelay: "0.5s" }}>
          🌺
        </div>
        <div className="absolute bottom-20 left-20 text-9xl opacity-20 animate-pulse" style={{ animationDelay: "1s" }}>
          🌷
        </div>
        <div
          className="absolute bottom-32 right-24 text-8xl opacity-20 animate-pulse"
          style={{ animationDelay: "1.5s" }}
        >
          🌹
        </div>
      </div>

      <div
        className={`max-w-3xl mx-auto text-center relative z-10 transition-all duration-1000 ${
          isVisible ? "opacity-100 scale-100" : "opacity-0 scale-95"
        }`}
      >
        <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed mb-8 text-green-900 font-medium">
          {finalMessage}
        </p>

        <p className="text-5xl md:text-6xl font-bold mb-12 text-rose-600">{finalSubtitle}</p>

        <p className="text-2xl md:text-3xl text-rose-700 font-semibold">Con amor,</p>
        <p className="text-3xl md:text-4xl text-green-900 font-bold mt-2">{senderName}</p>
      </div>
    </section>
  )
}
