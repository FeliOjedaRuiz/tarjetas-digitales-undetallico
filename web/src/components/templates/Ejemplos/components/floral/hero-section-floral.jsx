"use client"

import { useEffect, useState } from "react"
import Link from "next/link"

export function HeroSectionFloral({ recipientName, heroMessage }) {
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

  const flowers = [
    { type: "rose", left: "10%", top: "15%", size: 80, delay: 0, rotation: 15 },
    { type: "peony", left: "85%", top: "20%", size: 90, delay: 0.5, rotation: -20 },
    { type: "tulip", left: "20%", top: "70%", size: 70, delay: 1, rotation: 30 },
    { type: "rose", left: "75%", top: "75%", size: 85, delay: 1.5, rotation: -15 },
    { type: "daisy", left: "15%", top: "40%", size: 95, delay: 0.8, rotation: 45 },
    { type: "peony", left: "88%", top: "50%", size: 75, delay: 1.2, rotation: -30 },
    { type: "tulip", left: "50%", top: "10%", size: 82, delay: 0.3, rotation: 10 },
    { type: "rose", left: "45%", top: "85%", size: 78, delay: 1.8, rotation: -25 },
    { type: "daisy", left: "30%", top: "25%", size: 72, delay: 0.6, rotation: 20 },
    { type: "peony", left: "70%", top: "35%", size: 88, delay: 1.1, rotation: -10 },
    { type: "tulip", left: "5%", top: "55%", size: 76, delay: 1.4, rotation: 35 },
    { type: "rose", left: "92%", top: "65%", size: 71, delay: 0.9, rotation: -40 },
  ]

  const FlowerSVG = ({ type, size }) => {
    if (type === "rose") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
          <defs>
            <radialGradient id="rose-gradient">
              <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#c9184a" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="20" fill="url(#rose-gradient)" opacity="0.8" />
          <ellipse cx="45" cy="45" rx="15" ry="18" fill="#ff8fa3" opacity="0.6" transform="rotate(-20 45 45)" />
          <ellipse cx="55" cy="45" rx="15" ry="18" fill="#ff8fa3" opacity="0.6" transform="rotate(20 55 45)" />
          <ellipse cx="50" cy="55" rx="18" ry="15" fill="#ffb3c6" opacity="0.5" />
          <ellipse cx="45" cy="60" rx="12" ry="10" fill="#ffc9d9" opacity="0.4" />
          <path d="M 50 70 Q 48 80 50 85 Q 52 80 50 70" fill="#2d6a4f" opacity="0.7" />
        </svg>
      )
    }
    if (type === "peony") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
          <defs>
            <radialGradient id="peony-gradient">
              <stop offset="0%" stopColor="#ffc2d1" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#e85d75" stopOpacity="0.7" />
            </radialGradient>
          </defs>
          <circle cx="50" cy="50" r="25" fill="url(#peony-gradient)" opacity="0.7" />
          <circle cx="40" cy="40" r="18" fill="#ffb3c6" opacity="0.6" />
          <circle cx="60" cy="40" r="18" fill="#ffb3c6" opacity="0.6" />
          <circle cx="40" cy="60" r="18" fill="#ffc9d9" opacity="0.5" />
          <circle cx="60" cy="60" r="18" fill="#ffc9d9" opacity="0.5" />
          <circle cx="50" cy="50" r="15" fill="#ffe5ec" opacity="0.8" />
        </svg>
      )
    }
    if (type === "tulip") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
          <defs>
            <linearGradient id="tulip-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#ff6b9d" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#ff4d8a" stopOpacity="0.7" />
            </linearGradient>
          </defs>
          <ellipse cx="40" cy="45" rx="12" ry="25" fill="url(#tulip-gradient)" opacity="0.7" />
          <ellipse cx="50" cy="40" rx="13" ry="28" fill="#ff8fa3" opacity="0.8" />
          <ellipse cx="60" cy="45" rx="12" ry="25" fill="#ff6b9d" opacity="0.7" />
          <rect x="48" y="60" width="4" height="30" fill="#2d6a4f" opacity="0.7" />
          <ellipse cx="50" cy="75" rx="8" ry="3" fill="#40916c" opacity="0.6" />
        </svg>
      )
    }
    if (type === "daisy") {
      return (
        <svg width={size} height={size} viewBox="0 0 100 100" className="drop-shadow-lg">
          <circle cx="50" cy="35" r="10" fill="#fff" opacity="0.8" />
          <circle cx="65" cy="45" r="10" fill="#fff" opacity="0.8" />
          <circle cx="65" cy="60" r="10" fill="#ffe5ec" opacity="0.7" />
          <circle cx="50" cy="70" r="10" fill="#fff" opacity="0.8" />
          <circle cx="35" cy="60" r="10" fill="#ffe5ec" opacity="0.7" />
          <circle cx="35" cy="45" r="10" fill="#fff" opacity="0.8" />
          <circle cx="50" cy="52" r="12" fill="#ffd60a" opacity="0.9" />
          <circle cx="50" cy="52" r="8" fill="#ffc300" opacity="0.8" />
        </svg>
      )
    }
  }

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Theme Selector */}
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-30">
        <div className="flex gap-3 bg-white/90 backdrop-blur-sm rounded-full px-6 py-3 shadow-lg">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-red-100 text-red-600"
          >
            ❤️ Clásico
          </Link>
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-rose-600 text-white">🌸 Floral</div>
        </div>
      </div>

      {/* Floating flowers */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {flowers.map((flower, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: flower.left,
              top: flower.top,
              animation: `flower-pulse 3s ease-in-out infinite`,
              animationDelay: `${flower.delay}s`,
              transform: `rotate(${flower.rotation}deg)`,
            }}
          >
            <FlowerSVG type={flower.type} size={flower.size} />
          </div>
        ))}
      </div>

      {/* Main content */}
      <div className="relative z-10 text-center px-4 max-w-4xl mx-auto">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <p className="text-4xl md:text-6xl lg:text-7xl text-rose-700 font-bold mb-6">{recipientName}</p>
          <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold mb-6 text-green-900 text-balance hero-glow-floral">
            {heroMessage}
          </h1>
        </div>
      </div>

      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 animate-bounce transition-opacity duration-300 z-20"
        style={{ opacity: scrollOpacity }}
      >
        <div className="flex flex-col items-center gap-1">
          <p className="text-xs text-rose-600/70 font-medium">Desliza</p>
          <svg className="w-4 h-4 text-rose-600/70" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
          </svg>
        </div>
      </div>
    </section>
  )
}
