"use client"

import { useEffect, useRef, useState } from "react"

export default function BotanicalFinal({ message, subtitle, senderName }) {
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
      className="relative min-h-screen flex items-center justify-center bg-botanical-cream px-6 overflow-hidden"
    >
      {/* Large floral watercolor background */}
      <div className="absolute inset-0 opacity-30">
        <img src="/images/7f.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div
        className={`relative z-10 text-center max-w-3xl transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <p className="text-2xl md:text-3xl font-serif text-botanical-sage-dark leading-relaxed mb-8 italic">
          {message}
        </p>

        <h3 className="text-4xl md:text-5xl font-script text-botanical-gold mb-12">{subtitle}</h3>

        <div className="relative inline-block">
          <p className="text-xl font-handwriting text-botanical-sage-dark">Con amor,</p>
          <p className="text-3xl font-script text-botanical-gold mt-2">{senderName}</p>
        </div>
      </div>
    </section>
  )
}
