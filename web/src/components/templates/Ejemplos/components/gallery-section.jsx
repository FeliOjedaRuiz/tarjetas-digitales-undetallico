"use client"

import { useEffect, useRef, useState } from "react"

export function GallerySection({ galleryImages }) {
  const [visibleImages, setVisibleImages] = useState([])
  const imageRefs = useRef([])

  useEffect(() => {
    const observers = []

    imageRefs.current.forEach((ref, index) => {
      if (!ref) return

      const observer = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setVisibleImages((prev) => (prev.includes(index) ? prev : [...prev, index]))
          } else {
            setVisibleImages((prev) => prev.filter((i) => i !== index))
          }
        },
        { threshold: 0.2 },
      )

      observer.observe(ref)
      observers.push(observer)
    })

    return () => {
      observers.forEach((observer) => observer.disconnect())
    }
  }, [galleryImages])

  return (
    <section className="py-20 px-4 bg-gradient-to-br from-pink-100 via-rose-100 to-red-100">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-4 text-red-600">Nuestros Momentos</h2>
        <p className="text-center text-gray-700 mb-12 text-lg">Recuerdos que atesoro para siempre</p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              ref={(el) => (imageRefs.current[index] = el)}
              className={`relative overflow-hidden rounded-2xl aspect-square transition-all duration-500 shadow-lg ${
                visibleImages.includes(index) ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <img src={image.url || "/placeholder.svg"} alt={image.caption} className="w-full h-full object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 via-black/40 to-transparent p-6">
                <p className="text-white text-lg font-medium text-pretty drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)]">
                  {image.caption}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
