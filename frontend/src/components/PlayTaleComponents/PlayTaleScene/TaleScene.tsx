import {
  useSceneList,
  useSceneDetail,
  usePlayTaleDetail,
} from "hooks/queries/queries"
import React, { useState, useRef, useEffect, PropsWithChildren } from "react"
import { queryKeys } from "hooks/queries/queryKeys"
import { useParams } from "react-router-dom"

interface TaleSceneProps {
  taleId: number
  sceneOrder: number
  changeScene: () => void
}

function TaleScene({
  taleId,
  sceneOrder,
  changeScene,
}: PropsWithChildren<TaleSceneProps>) {
  const { data } = usePlayTaleDetail(taleId)
  const maxlength = data?.sceneCount

  const {
    isLoading: sceneDetailLoading,
    error: sceneDetailError,
    data: sceneDetail,
  } = useSceneDetail(1, sceneOrder)

  const [backgroundMusicAudio, setBackgroundMusicAudio] =
    useState<HTMLAudioElement | null>(null)
  const [scriptListAudio, setScriptListAudio] =
    useState<HTMLAudioElement | null>(null)
  const backgroundMusicAudioRef = useRef<HTMLAudioElement>(null)
  const scriptListAudioRef = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    if (backgroundMusicAudioRef.current) {
      const audioElement = backgroundMusicAudioRef.current
      audioElement.src = sceneDetail?.backgroundMusic || ""
      audioElement.loop = true
      audioElement.play()
      setBackgroundMusicAudio(audioElement)
    }

    if (scriptListAudioRef.current) {
      const audioElement = scriptListAudioRef.current
      audioElement.src = sceneDetail?.scriptList[0]?.voice || ""
      audioElement.play()
      setScriptListAudio(audioElement)
    }
  }, [sceneDetail])

  useEffect(() => {
    if (scriptListAudio) {
      scriptListAudio.addEventListener("ended", () => {
        if (maxlength && sceneOrder < maxlength) {
          changeScene()
        }
      })
    }
  }, [scriptListAudio, sceneDetail, sceneOrder])

  //   const plusScene = function () {
  //     if (maxlength && sceneOrder < maxlength) {
  //       setSceneOrder((val) => val + 1)
  //     }
  //     console.log(sceneDetail, "123")
  //   }

  return (
    <>
      <audio ref={backgroundMusicAudioRef} />
      <audio ref={scriptListAudioRef} />
      {/* <div onClick={plusScene}>gd</div> */}
      <div>
        <img src={sceneDetail?.image} /> 이미지{" "}
      </div>
      <div>씬 데이터</div>
    </>
  )
}

export default TaleScene
