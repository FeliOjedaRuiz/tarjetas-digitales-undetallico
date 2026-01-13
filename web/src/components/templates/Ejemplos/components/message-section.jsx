"use client"

import { useEffect, useRef, useState } from "react"

export function MessageSection({ mainMessage }) {
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
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-6 py-32">
      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="relative">
          <div className="absolute -top-12 -left-4 text-7xl text-red-500/40 font-serif">"</div>
          <p className="text-3xl md:text-4xl lg:text-5xl leading-relaxed text-gray-900 font-medium text-pretty px-8 message-contrast">
            {mainMessage}
          </p>
          <div className="absolute -bottom-12 -right-4 text-7xl text-red-500/40 font-serif">"</div>
        </div>
      </div>
    </section>
  )
}
