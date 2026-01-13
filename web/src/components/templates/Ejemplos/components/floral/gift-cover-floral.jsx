"use client"

import { useState } from "react"
import Link from "next/link"

export function GiftCoverFloral({ onOpen }) {
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
      className={`fixed inset-0 z-[100] bg-gradient-to-br from-rose-100 via-pink-100 to-amber-100 flex items-center justify-center transition-all duration-700 ${
        isOpening ? "opacity-0 scale-110" : "opacity-100 scale-100"
      }`}
    >
      <div className="absolute top-6 left-1/2 -translate-x-1/2 z-10">
        <div className="flex gap-3 bg-white/95 backdrop-blur-sm rounded-full px-6 py-3 shadow-xl">
          <Link
            href="/"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-red-100 text-red-600"
          >
            ❤️ Clásico
          </Link>
          <div className="px-4 py-2 rounded-full text-sm font-medium bg-rose-600 text-white">🌸 Floral</div>
          <Link
            href="/botanical"
            className="px-4 py-2 rounded-full text-sm font-medium transition-all hover:bg-green-100 text-green-700"
          >
            🌿 Botánico
          </Link>
        </div>
      </div>

      <div className="text-center px-4">
        <div className="mb-8 animate-float">
          <div className="text-9xl mb-4 animate-gift-pulse">🎁</div>
        </div>

        <h2 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 text-green-900">
          Este regalito es para ti, ábrelo
        </h2>

        <button
          onClick={handleClick}
          className="mt-8 px-8 py-4 bg-rose-600 hover:bg-rose-700 text-white rounded-full text-lg font-semibold transition-all duration-300 transform hover:scale-105 shadow-xl"
        >
          Abrir regalo 🌸
        </button>
      </div>
    </div>
  )
}
