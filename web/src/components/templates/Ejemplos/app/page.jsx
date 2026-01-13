"use client"

import { HeroSection } from "@/components/hero-section"
import { MessageSection } from "@/components/message-section"
import { GallerySection } from "@/components/gallery-section"
import { VideoSection } from "@/components/video-section"
import { FinalSection } from "@/components/final-section"
import { MusicPlayer } from "@/components/music-player"
import { SectionDivider } from "@/components/section-divider"
import { GiftCover } from "@/components/gift-cover"
import { cardData } from "./card-data"
import { useRef, useState } from "react"

export default function ValentineCardPage() {
  const musicPlayerRef = useRef(null)
  const [showCover, setShowCover] = useState(true)

  const handleVideoPlay = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.pause()
    }
  }

  const handleOpenGift = () => {
    setShowCover(false)
    // Start playing music after a short delay
    setTimeout(() => {
      if (musicPlayerRef.current) {
        musicPlayerRef.current.play()
      }
    }, 500)
  }

  return (
    <>
      {showCover && <GiftCover onOpen={handleOpenGift} />}

      <main className="overflow-x-hidden bg-gradient-to-b from-pink-100 via-red-50 to-rose-100">
        {/* Hero inicial */}
        <HeroSection recipientName={cardData.recipientName} heroMessage={cardData.heroMessage} />

        <SectionDivider />

        {/* Mensaje principal */}
        <MessageSection mainMessage={cardData.mainMessage} />

        <SectionDivider />

        {/* Galería de recuerdos */}
        <GallerySection galleryImages={cardData.galleryImages} />

        <SectionDivider />

        {/* Video especial */}
        <VideoSection videoUrl={cardData.videoUrl} videoCaption={cardData.videoCaption} onVideoPlay={handleVideoPlay} />

        <SectionDivider />

        {/* Mensaje final */}
        <FinalSection
          finalMessage={cardData.finalMessage}
          finalSubtitle={cardData.finalSubtitle}
          senderName={cardData.senderName}
        />

        <MusicPlayer musicUrl={cardData.backgroundMusicUrl} ref={musicPlayerRef} />
      </main>
    </>
  )
}
