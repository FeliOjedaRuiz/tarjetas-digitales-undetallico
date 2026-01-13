"use client"

import { useEffect, useRef, useState } from "react"

export default function BotanicalVideo({ videoUrl, caption, musicPlayer }) {
  const [isVisible, setIsVisible] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
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

  const handlePlay = () => {
    setIsPlaying(true)
    if (musicPlayer) {
      musicPlayer.pause()
    }
  }

  const handlePause = () => {
    setIsPlaying(false)
    if (musicPlayer) {
      musicPlayer.play()
    }
  }

  return (
    <section ref={sectionRef} className="relative py-24 px-6 bg-white">
      <div
        className={`max-w-4xl mx-auto transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-5xl font-script text-botanical-gold text-center mb-12">{caption}</h2>

        <div className="relative aspect-video bg-gray-100 shadow-2xl overflow-hidden">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onPlay={handlePlay}
            onPause={handlePause}
          />
        </div>
      </div>

      {/* Decorative floral corners */}
      <div className="absolute top-10 left-10 w-24 h-24 opacity-20">
        <svg viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="15" fill="#ffc0cb" />
          <circle cx="50" cy="30" r="12" fill="#ffb6c1" />
          <circle cx="30" cy="50" r="10" fill="#ffd1dc" />
        </svg>
      </div>

      <div className="absolute bottom-10 right-10 w-24 h-24 opacity-20 rotate-180">
        <svg viewBox="0 0 100 100">
          <circle cx="20" cy="20" r="15" fill="#ffc0cb" />
          <circle cx="50" cy="30" r="12" fill="#ffb6c1" />
          <circle cx="30" cy="50" r="10" fill="#ffd1dc" />
        </svg>
      </div>
    </section>
  )
}
