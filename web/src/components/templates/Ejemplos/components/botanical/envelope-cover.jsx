"use client"

import { useState } from "react"
import { Mail } from "lucide-react"
import Link from "next/link"

export default function EnvelopeCover({ onOpen }) {
  const [isOpening, setIsOpening] = useState(false)

  const handleOpen = () => {
    setIsOpening(true)
    window.scrollTo({ top: 0, behavior: "instant" })
    setTimeout(() => {
      onOpen()
    }, 800)
  }

  return (
    <>
      {/* Theme Selector */}
      <div className="fixed top-4 left-1/2 -translate-x-1/2 z-50 flex gap-2 bg-white/80 backdrop-blur-sm rounded-full p-2 shadow-lg">
        <Link
          href="/"
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-rose-100 text-rose-700"
        >
          Clásico
        </Link>
        <Link
          href="/floral"
          className="px-4 py-2 rounded-full text-sm font-medium transition-colors hover:bg-pink-100 text-pink-700"
        >
          Floral
        </Link>
        <span className="px-4 py-2 rounded-full text-sm font-medium bg-botanical-sage text-white">Botánico</span>
      </div>

      <div
        className={`fixed inset-0 z-40 flex items-center justify-center bg-botanical-cream transition-opacity duration-700 ${
          isOpening ? "opacity-0 pointer-events-none" : "opacity-100"
        }`}
      >
        {/* Watercolor floral decorations */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <img src="/images/7f.jpg" alt="" className="absolute top-0 left-0 w-full h-48 object-cover opacity-40" />
          <img
            src="/images/m298.jpg"
            alt=""
            className="absolute bottom-0 right-0 w-full h-48 object-cover opacity-30"
          />
        </div>

        <div className="relative text-center z-10 px-6">
          <div className="mb-8 inline-block animate-float">
            <div className="relative">
              <Mail className="w-32 h-32 text-botanical-sage" strokeWidth={1.5} />
              <div className="absolute inset-0 animate-envelope-pulse">
                <Mail className="w-32 h-32 text-botanical-peach opacity-40" strokeWidth={1.5} />
              </div>
            </div>
          </div>

          <h2 className="text-3xl md:text-4xl font-script text-botanical-gold mb-4">Este regalito es para ti</h2>
          <p className="text-lg text-botanical-sage-dark mb-8 font-serif italic">Ábrelo con cariño</p>

          <button
            onClick={handleOpen}
            className="group relative px-8 py-4 bg-botanical-sage text-white rounded-full font-medium text-lg hover:bg-botanical-sage-dark transition-all duration-300 shadow-lg hover:shadow-xl"
          >
            <span className="relative z-10">Abrir carta</span>
            <div className="absolute inset-0 rounded-full bg-botanical-gold opacity-0 group-hover:opacity-20 transition-opacity duration-300" />
          </button>
        </div>
      </div>
    </>
  )
}
