"use client"

import { useEffect, useState } from "react"
import Image from "next/image"

export function GallerySectionFloral({ galleryImages }) {
  const [visibleImages, setVisibleImages] = useState(new Set())

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const index = Number.parseInt(entry.target.dataset.index || "0")
            setVisibleImages((prev) => new Set([...prev, index]))
          }
        })
      },
      { threshold: 0.3 },
    )

    const images = document.querySelectorAll(".gallery-image-floral")
    images.forEach((img) => observer.observe(img))

    return () => observer.disconnect()
  }, [])

  return (
    <section className="min-h-screen py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-4xl md:text-5xl font-bold text-center mb-16 text-rose-700">Nuestros Momentos</h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {galleryImages.map((image, index) => (
            <div
              key={index}
              data-index={index}
              className={`gallery-image-floral group relative aspect-[4/5] rounded-2xl overflow-hidden shadow-xl transition-all duration-700 border-4 border-rose-200 ${
                visibleImages.has(index) ? "opacity-100 scale-100" : "opacity-0 scale-90"
              }`}
            >
              <Image
                src={image.url || `/placeholder.svg?height=500&width=400&query=${encodeURIComponent(image.caption)}`}
                alt={image.caption}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-green-900/90 via-green-900/40 to-transparent opacity-100 transition-opacity duration-300">
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-white text-lg font-medium drop-shadow-lg">{image.caption}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
