"use client"

import { useState } from "react"
import { cardData } from "../card-data"
import EnvelopeCover from "@/components/botanical/envelope-cover"
import BotanicalHero from "@/components/botanical/botanical-hero"
import BotanicalMessage from "@/components/botanical/botanical-message"
import BotanicalGallery from "@/components/botanical/botanical-gallery"
import BotanicalVideo from "@/components/botanical/botanical-video"
import BotanicalFinal from "@/components/botanical/botanical-final"
import MusicPlayer from "@/components/music-player"

export default function BotanicalCard() {
  const [isOpened, setIsOpened] = useState(false)
  const [musicPlayer, setMusicPlayer] = useState(null)

  const handleOpen = (player) => {
    setIsOpened(true)
    setMusicPlayer(player)
  }

  return (
    <div className="relative min-h-screen bg-botanical-cream">
      <MusicPlayer onPlayerReady={handleOpen} isVisible={false} />

      {!isOpened && <EnvelopeCover onOpen={() => setIsOpened(true)} />}

      {isOpened && (
        <main className="relative">
          <BotanicalHero recipientName={cardData.recipientName} heroMessage={cardData.heroMessage} />
          <BotanicalMessage message={cardData.mainMessage} />
          <BotanicalGallery images={cardData.galleryImages} />
          <BotanicalVideo videoUrl={cardData.videoUrl} caption={cardData.videoCaption} musicPlayer={musicPlayer} />
          <BotanicalFinal
            message={cardData.finalMessage}
            subtitle={cardData.finalSubtitle}
            senderName={cardData.senderName}
          />
        </main>
      )}
    </div>
  )
}
