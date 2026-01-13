"use client"

import { useEffect, useRef, useState } from "react"

export default function BotanicalGallery({ images }) {
  const [visibleImages, setVisibleImages] = useState(new Set())
  const imageRefs = useRef([])

  useEffect(() => {
    const observers = imageRefs.current.map((ref, index) => {
      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => new Set([...prev, index]))
          }
        },
        { threshold: 0.2 },
      )

      if (ref) observer.observe(ref)
      return observer
    })

    return () => observers.forEach((observer) => observer.disconnect())
  }, [])

  return (
    <section className="py-24 px-6 relative overflow-hidden">
      <div className="absolute inset-0 opacity-30">
        <img src="/images/watercolor-floral-bg.jpg" alt="" className="w-full h-full object-cover" />
      </div>

      <div className="relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-5xl font-script text-botanical-gold mb-4">Nuestros Momentos</h2>
          <div className="w-32 h-1 bg-botanical-sage mx-auto opacity-30"></div>
        </div>

        <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {images.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`transition-all duration-1000 ${
                visibleImages.has(index) ? "opacity-100 translate-y-0 scale-100" : "opacity-0 translate-y-16 scale-90"
              }`}
              style={{ transitionDelay: `${(index % 3) * 200}ms` }}
            >
              <div className="bg-white p-4 shadow-lg transition-all duration-500 hover:shadow-2xl hover:scale-105 rotate-0 hover:rotate-1 will-change-transform">
                <div className="relative aspect-square overflow-hidden bg-gray-100">
                  <img
                    src={image.url || "/placeholder.svg"}
                    alt={image.caption}
                    className="w-full h-full object-cover"
                  />
                </div>
                <p
                  className="mt-4 text-center font-script text-botanical-sage-dark text-xl"
                  style={{ fontFamily: "'Dancing Script', cursive" }}
                >
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Decorative dots */}
      <div className="absolute top-10 left-10 opacity-20">
        {[...Array(12)].map((_, i) => (
          <div key={i} className="inline-block w-1 h-1 rounded-full bg-botanical-gold m-2" />
        ))}
      </div>
    </section>
  )
}
