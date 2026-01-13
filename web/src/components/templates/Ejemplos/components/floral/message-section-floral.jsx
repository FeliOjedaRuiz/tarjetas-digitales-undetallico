"use client"

import { useEffect, useState } from "react"

export function MessageSectionFloral({ mainMessage }) {
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

    const element = document.getElementById("message-section-floral")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="message-section-floral" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative">
          <div className="absolute -top-8 -left-8 text-6xl opacity-30">🌸</div>
          <div className="absolute -bottom-8 -right-8 text-6xl opacity-30">🌺</div>
          <p className="text-2xl md:text-3xl lg:text-4xl leading-relaxed text-green-900 font-medium px-8 py-12 drop-shadow-[0_2px_4px_rgba(255,255,255,0.9)]">
            {mainMessage}
          </p>
        </div>
      </div>
    </section>
  )
}
