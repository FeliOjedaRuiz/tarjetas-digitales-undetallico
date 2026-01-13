"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSection({ recipientName, heroMessage }) {
  const [isVisible, setIsVisible] = useState(false)
  const [scrollOpacity, setScrollOpacity] = useState(1)

  useEffect(() => {
    setIsVisible(true)

    const handleScroll = () => {
      const scrollY = window.scrollY
      const newOpacity = Math.max(0.2, 1 - scrollY / 300)
      setScrollOpacity(newOpacity)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const staticHearts = [
    { left: "10%", top: "15%", size: 35, delay: 0 },
    { left: "85%", top: "20%", size: 45, delay: 0.5 },
    { left: "20%", top: "70%", size: 30, delay: 1 },
    { left: "75%", top: "75%", size: 40, delay: 1.5 },
    { left: "15%", top: "40%", size: 50, delay: 0.8 },
    { left: "88%", top: "50%", size: 35, delay: 1.2 },
    { left: "50%", top: "10%", size: 40, delay: 0.3 },
    { left: "45%", top: "85%", size: 38, delay: 1.8 },
    { left: "30%", top: "25%", size: 32, delay: 0.6 },
    { left: "70%", top: "35%", size: 42, delay: 1.1 },
    { left: "5%", top: "55%", size: 36, delay: 1.4 },
    { left: "92%", top: "65%", size: 33, delay: 0.9 },
    { left: "25%", top: "90%", size: 44, delay: 1.6 },
    { left: "60%", top: "8%", size: 37, delay: 0.4 },
    { left: "40%", top: "60%", size: 48, delay: 1.3 },
  ]

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-red-600 text-white">❤️ Clásico</div>
          <Link
            href="/floral"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-100 text-rose-600"
          >
            🌸 Floral
          </Link>
        </div>
      </div>

      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {staticHearts.map((heart, i) => (
          <div
            key={i}
            className="absolute text-red-500"
            style={{
              left: heart.left,
              top: heart.top,
              fontSize: `${heart.size}px`,
              animation: `heartbeat-pulse 2s ease-in-out infinite`,
              animationDelay: `${heart.delay}s`,
            }}
          >
            ♥
          </div>
        ))}
      </div>

      {/* Contenido principal */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-4xl md:text-6xl lg:text-7xl text-red-600 font-bold mb-6">{recipientName}</p>

          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-foreground text-balance hero-glow">
            {heroMessage}
          </h1>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300 z-20"
        style={{ opacity: scrollOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-red-500/70 font-medium">Desliza</p>
          <svg className="w-4 h-4 text-red-500/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
