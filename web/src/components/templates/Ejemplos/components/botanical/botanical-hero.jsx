"use client"

import { useEffect, useState } from "react"

export default function BotanicalHero({ recipientName, heroMessage }) {
  const [scrollY, setScrollY] = useState(0)

  useEffect(() => {
    const handleScroll = () => setScrollY(window.scrollY)
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-botanical-cream px-6">
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <img src="/images/watercolor-floral-pattern.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10 text-center max-w-3xl">
        <div className="mb-8 space-y-6">
          <h1
            className="text-7xl md:text-9xl font-script text-botanical-gold mb-4 drop-shadow-lg"
            style={{ fontFamily: "'Great Vibes', cursive" }}
          >
            {recipientName}
          </h1>
          <p
            className="text-3xl md:text-4xl font-script text-[#d4876f] leading-relaxed px-4"
            style={{ fontFamily: "'Dancing Script', cursive" }}
          >
            {heroMessage}
          </p>
        </div>

        <div
          className="absolute bottom-8 left-1/2 -translate-x-1/2 transition-opacity duration-500"
          style={{ opacity: Math.max(0, 1 - scrollY / 200) }}
        >
          <div className="flex flex-col items-center gap-2 text-botanical-sage-dark/70">
            <span className="text-base font-script italic" style={{ fontFamily: "'Dancing Script', cursive" }}>
              Desliza
            </span>
            <svg
              className="w-6 h-6 animate-bounce"
              fill="none"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d="M19 14l-7 7m0 0l-7-7m7 7V3"></path>
            </svg>
          </div>
        </div>
      </div>
    </section>
  )
}
