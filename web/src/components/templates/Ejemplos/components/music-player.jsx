"use client"

import { useRef, useState, forwardRef, useImperativeHandle, useEffect } from "react"

const MusicPlayer = forwardRef(function MusicPlayer({ musicUrl }, ref) {
  const [isPlaying, setIsPlaying] = useState(false)
  const audioRef = useRef(null)

  useImperativeHandle(ref, () => ({
    pause: () => {
      if (audioRef.current && !audioRef.current.paused) {
        audioRef.current.pause()
        setIsPlaying(false)
      }
    },
    play: async () => {
      if (audioRef.current && audioRef.current.paused) {
        try {
          await audioRef.current.play()
        } catch (error) {
          console.error("Error reproduciendo audio:", error)
          setIsPlaying(false)
        }
      }
    },
  }))

  const togglePlay = async () => {
    if (!audioRef.current) return

    try {
      if (isPlaying) {
        audioRef.current.pause()
      } else {
        await audioRef.current.play()
      }
    } catch (error) {
      console.error("Error reproduciendo audio:", error)
      setIsPlaying(false)
    }
  }

  useEffect(() => {
    const audio = audioRef.current
    if (!audio) return

    const handlePlay = () => setIsPlaying(true)
    const handlePause = () => setIsPlaying(false)
    const handleEnded = () => setIsPlaying(false)

    audio.addEventListener("play", handlePlay)
    audio.addEventListener("pause", handlePause)
    audio.addEventListener("ended", handleEnded)

    return () => {
      audio.removeEventListener("play", handlePlay)
      audio.removeEventListener("pause", handlePause)
      audio.removeEventListener("ended", handleEnded)
    }
  }, [])

  if (!musicUrl) return null

  return (
    <>
      <div className="fixed bottom-6 right-6 z-50">
        <button
          onClick={togglePlay}
          className="bg-red-500 text-white p-2.5 rounded-full shadow-lg hover:scale-110 transition-all duration-300 hover:bg-red-600"
          aria-label={isPlaying ? "Pausar música" : "Reproducir música"}
        >
          {isPlaying ? (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M6 4h4v16H6V4zm8 0h4v16h-4V4z" />
            </svg>
          ) : (
            <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
              <path d="M8 5v14l11-7z" />
            </svg>
          )}
        </button>
      </div>
      <audio ref={audioRef} loop preload="auto">
        <source src={musicUrl} type="audio/mpeg" />
      </audio>
    </>
  )
})

export { MusicPlayer }

export default MusicPlayer
