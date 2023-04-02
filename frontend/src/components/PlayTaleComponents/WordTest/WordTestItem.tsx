import React, { useState, useEffect, PropsWithChildren, useRef } from "react"
import { TestWord } from "hooks/queries/queries"
import { useDispatch } from "react-redux"
import {} from "store/wordTestSlice"

interface Props {
  wordInfo: TestWord
  handleResponse: (response: boolean) => void
}

function WordTestItem({ wordInfo, handleResponse }: PropsWithChildren<Props>) {
  const [wordAudio, setWordAudio] = useState<HTMLAudioElement | null>(null)
  const wordAudioRef = useRef<HTMLAudioElement>(null)
  const [isPlaying, setIsPlaying] = useState(false)
  const audio = new Audio(wordInfo.voice)

  const handleImageClick = (imagePath: string) => {
    if (imagePath === wordInfo.image) {
      handleResponse(true)
    } else {
      handleResponse(false)
    }
  }

  audio.onended = () => setIsPlaying(false)

  useEffect(() => {
    setIsPlaying(true)
    audio.play()
  }, [wordInfo.voice])

  return (
    <>
      <div className="grid grid-cols-2 w-[90%]">
        <img
          src={wordInfo.image}
          alt={wordInfo.engWord}
          onClick={() => handleImageClick(wordInfo.image)}
        />
        <img
          src={wordInfo.wrongImage}
          alt={wordInfo.engWord}
          onClick={() => handleImageClick(wordInfo.wrongImage)}
        />
      </div>
    </>
  )
}

export default WordTestItem
