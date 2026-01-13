"use client"

import { useEffect, useRef, useState } from "react"

export function VideoSection({ videoUrl, videoCaption, onVideoPlay }) {
  const [isVisible, setIsVisible] = useState(false)
  const sectionRef = useRef(null)
  const iframeRef = useRef(null)

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

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && typeof event.data === "string") {
        if (event.data.includes("play") && onVideoPlay) {
          onVideoPlay()
        }
      }
    }

    window.addEventListener("message", handleMessage)
    return () => window.removeEventListener("message", handleMessage)
  }, [onVideoPlay])

  return (
    <section ref={sectionRef} className="min-h-screen flex items-center justify-center px-4 py-20">
      <div className="max-w-5xl mx-auto w-full">
        <div
          className={`transition-all duration-1000 ${
            isVisible ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-white hero-glow">{videoCaption}</h2>
          <p className="text-center text-white/80 mb-12 text-lg">Un momento especial para recordar</p>

          <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl">
            <iframe
              ref={iframeRef}
              src={`${videoUrl}?enablejsapi=1`}
              className="w-full h-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      </div>
    </section>
  )
}
