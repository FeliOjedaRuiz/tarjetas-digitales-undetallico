"use client"

import { useEffect, useState } from "react"

export function VideoSectionFloral({ videoUrl, videoCaption, onVideoPlay }) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true)
        }
      },
      { threshold: 0.2 },
    )

    const element = document.getElementById("video-section-floral")
    if (element) observer.observe(element)

    return () => observer.disconnect()
  }, [])

  return (
    <section id="video-section-floral" className="min-h-screen flex items-center justify-center px-4 py-20">
      <div
        className={`max-w-4xl mx-auto w-full transition-all duration-1000 ${
          isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-8 text-rose-700">{videoCaption}</h2>

        <div className="relative aspect-video rounded-2xl overflow-hidden shadow-2xl border-4 border-amber-200">
          <iframe
            src={videoUrl}
            className="w-full h-full"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            onPlay={onVideoPlay}
          />
        </div>
      </div>
    </section>
  )
}
