"use client"

import { useState } from "react"
import Link from "next/link"

export function GiftCover({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleClick = () => {
    window.scrollTo({ top: 0, behavior: "instant" })
    setIsOpening(true)
    setTimeout(() => {
      onOpen()
    }, 800)
  }

  return (
    <div
      className={`fixed inset-0 z-[100] flex items-center justify-center bg-gradient-to-br from-red-400 via-pink-300 to-rose-400 transition-all duration-800 ${
        isOpening ? "opacity-0 scale-110" : "opacity-100"
      }`}
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-red-500 text-white">❤️ Clásico</div>
          <Link
            href="/floral"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-rose-100 text-rose-600"
          >
            🌸 Floral
          </Link>
          <Link
            href="/botanical"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-green-100 text-green-700"
          >
            🌿 Botánico
          </Link>
        </div>
      </div>

      <div className="flex flex-col items-center gap-8 px-6 text-center">
        {/* Gift Box Icon animado */}
        <div className="relative animate-float">
          <svg
            className="w-32 h-32 md:w-40 md:h-40 animate-heartbeat-pulse"
            viewBox="0 0 64 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            {/* Bow on top */}
            <path
              d="M32 8C28 8 24 12 24 16C24 12 20 8 16 8C12 8 8 12 8 16C8 20 12 24 16 24H24V16H32V24H40C44 24 48 20 48 16C48 12 44 8 40 8C36 8 32 12 32 16C32 12 28 8 32 8Z"
              fill="#FF1744"
            />
            {/* Ribbon vertical */}
            <rect x="28" y="16" width="8" height="40" fill="#FF1744" />
            {/* Box */}
            <rect x="12" y="24" width="40" height="32" rx="2" fill="#FF5252" />
            {/* Ribbon horizontal */}
            <rect x="12" y="36" width="40" height="8" fill="#FF1744" />
            {/* Shine effect */}
            <rect x="16" y="28" width="4" height="8" rx="2" fill="white" opacity="0.3" />
          </svg>

          {/* Sparkles around gift */}
          <div className="absolute -top-2 -right-2 w-4 h-4 bg-yellow-300 rounded-full animate-ping opacity-75" />
          <div className="absolute -bottom-2 -left-2 w-3 h-3 bg-yellow-300 rounded-full animate-ping opacity-75 animation-delay-300" />
          <div className="absolute top-1/2 -left-4 w-2 h-2 bg-white rounded-full animate-pulse" />
          <div className="absolute top-1/2 -right-4 w-2 h-2 bg-white rounded-full animate-pulse animation-delay-500" />
        </div>

        {/* Call to action text */}
        <h1 className="text-3xl md:text-5xl font-bold text-white drop-shadow-lg animate-fadeIn">
          Este regalito es para ti, ábrelo
        </h1>

        {/* Click button */}
        <button
          onClick={handleClick}
          className="px-8 py-4 bg-white text-red-500 font-semibold rounded-full shadow-xl hover:scale-110 hover:shadow-2xl transition-all duration-300 animate-scaleIn text-lg md:text-xl"
        >
          Abrir regalo
        </button>
      </div>
    </div>
  )
}
