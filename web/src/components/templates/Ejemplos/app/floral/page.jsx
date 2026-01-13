"use client"

import { HeroSectionFloral } from "@/components/floral/hero-section-floral"
import { MessageSectionFloral } from "@/components/floral/message-section-floral"
import { GallerySectionFloral } from "@/components/floral/gallery-section-floral"
import { VideoSectionFloral } from "@/components/floral/video-section-floral"
import { FinalSectionFloral } from "@/components/floral/final-section-floral"
import { MusicPlayer } from "@/components/music-player"
import { SectionDividerFloral } from "@/components/floral/section-divider-floral"
import { GiftCoverFloral } from "@/components/floral/gift-cover-floral"
import { cardData } from "../card-data"
import { useRef, useState } from "react"

export default function FloralThemePage() {
  const musicPlayerRef = useRef(null)
  const [showCover, setShowCover] = useState(true)

  const handleVideoPlay = () => {
    if (musicPlayerRef.current) {
      musicPlayerRef.current.pause()
    }
  }

  const handleOpenGift = () => {
    setShowCover(false)
    setTimeout(() => {
      if (musicPlayerRef.current) {
        musicPlayerRef.current.play()
      }
    }, 500)
  }

  return (
    <>
      {showCover && <GiftCoverFloral onOpen={handleOpenGift} />}

      <main className="overflow-x-hidden bg-gradient-to-b from-rose-50 via-pink-50 to-amber-50">
        <HeroSectionFloral recipientName={cardData.recipientName} heroMessage={cardData.heroMessage} />
        <SectionDividerFloral />
        <MessageSectionFloral mainMessage={cardData.mainMessage} />
        <SectionDividerFloral />
        <GallerySectionFloral galleryImages={cardData.galleryImages} />
        <SectionDividerFloral />
        <VideoSectionFloral
          videoUrl={cardData.videoUrl}
          videoCaption={cardData.videoCaption}
          onVideoPlay={handleVideoPlay}
        />
        <SectionDividerFloral />
        <FinalSectionFloral
          finalMessage={cardData.finalMessage}
          finalSubtitle={cardData.finalSubtitle}
          senderName={cardData.senderName}
        />
        <MusicPlayer musicUrl={cardData.backgroundMusicUrl} ref={musicPlayerRef} />
      </main>
    </>
  )
}
