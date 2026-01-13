"use client"

import { useEffect, useRef, useState } from "react"

export default function BotanicalMessage({ message }) {
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
    <section ref={sectionRef} className="relative py-24 px-6 bg-white">
      {/* Decorative watercolor border top */}
      <div className="absolute top-0 left-0 w-full h-24 overflow-hidden">
        <svg className="w-full h-full" viewBox="0 0 1200 100" preserveAspectRatio="none">
          <path d="M0,50 Q300,20 600,50 T1200,50 L1200,0 L0,0 Z" fill="#faf8f5" opacity="0.5" />
        </svg>
      </div>

      <div
        className={`max-w-3xl mx-auto text-center transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        {/* Decorative quote mark */}
        <div className="text-botanical-gold text-6xl font-script mb-6">"</div>

        <p className="text-xl md:text-2xl font-script text-[#8b7355] leading-relaxed mb-6">{message}</p>

        <div className="text-botanical-gold text-6xl font-script rotate-180">"</div>
      </div>

      {/* Decorative elements */}
      <div className="absolute left-10 top-1/2 -translate-y-1/2 opacity-20">
        <svg width="80" height="120" viewBox="0 0 80 120">
          <path d="M40,20 Q30,40 40,60 T40,100" stroke="#9ca986" strokeWidth="2" fill="none" />
          <circle cx="40" cy="20" r="15" fill="#ffc0cb" opacity="0.4" />
          <circle cx="35" cy="50" r="12" fill="#ffb6c1" opacity="0.4" />
          <circle cx="45" cy="80" r="10" fill="#ffd1dc" opacity="0.4" />
        </svg>
      </div>

      <div className="absolute right-10 top-1/2 -translate-y-1/2 opacity-20">
        <svg width="80" height="120" viewBox="0 0 80 120">
          <path d="M40,20 Q50,40 40,60 T40,100" stroke="#9ca986" strokeWidth="2" fill="none" />
          <circle cx="40" cy="20" r="15" fill="#ffc0cb" opacity="0.4" />
          <circle cx="45" cy="50" r="12" fill="#ffb6c1" opacity="0.4" />
          <circle cx="35" cy="80" r="10" fill="#ffd1dc" opacity="0.4" />
        </svg>
      </div>
    </section>
  )
}
