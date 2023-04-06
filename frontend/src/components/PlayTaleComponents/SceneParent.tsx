import GameNavigator from "components/UI/GameNavigator"
import { usePlayTaleDetail, useSceneDetail } from "hooks/queries/queries"
import { Navigate, Outlet, useNavigate, useParams } from "react-router-dom"
import InteractionComp from "./InteractionComp"
import { useCallback, useEffect, useState, useRef, useMemo } from "react"
import TaleScene from "./PlayTaleScene/TaleScene"
import ErrorPage from "pages/ErrorPage"
import apiRequest from "utils/axios"
import CommonLoading from "components/UI/CommonLoading"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"
import axios, { AxiosRequestConfig } from "axios"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"

interface Props {
  nowSceneOrder?: number
}
const SceneParent = function ({ nowSceneOrder = 1 }: Props) {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { sceneOrder: paramsSceneOrder } = useParams() as { sceneOrder: string }
  const [sceneOrder, setSceneOrder] = useState<number>(
    parseInt(paramsSceneOrder) || nowSceneOrder,
  )
  const [isKor, setIsKor] = useState<boolean>(false)
  const [isPause, setIsPause] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { taleId } = useParams() as { taleId: string }
  const { data: PlayTaleDetail, isLoading: sceneLoading } = usePlayTaleDetail(
    parseInt(taleId),
  )
  const maxlength = PlayTaleDetail?.sceneCount
  const {
    isLoading: sceneDetailLoading,
    error: sceneDetailError,
    data: sceneDetail,
  } = useSceneDetail(parseInt(taleId), sceneOrder)

  const backgroundMusicAudioRef = useRef<HTMLAudioElement>(null)
  const scriptListAudioRef = useRef<HTMLAudioElement>(null)

  const playEngScript = useCallback(
    function () {
      if (scriptListAudioRef.current) {
        const audioElement = scriptListAudioRef.current
        audioElement.src = sceneDetail?.scriptList[0]?.voice || ""
        audioElement.play()
      }
    },
    [sceneDetail?.scriptList[0]?.voice, scriptListAudioRef.current],
  )
  const playKorScript = useCallback(
    function () {
      if (scriptListAudioRef.current) {
        const audioElement = scriptListAudioRef.current
        audioElement.src = sceneDetail?.scriptList[1]?.voice || ""
        audioElement.play()
        audioElement.volume = 1
      }
    },
    [sceneDetail?.scriptList[1]?.voice, scriptListAudioRef.current],
  )
  const runBackgroundMusic = useCallback(
    function () {
      if (backgroundMusicAudioRef.current) {
        const audioElement = backgroundMusicAudioRef.current
        audioElement.src = sceneDetail?.backgroundMusic || ""
        audioElement.loop = true
        audioElement.play()
        audioElement.volume = 0.5
      }
    },
    [sceneDetail?.backgroundMusic],
  )

  const changeSceneHandler = useCallback(function (type: `next` | `before`) {
    if (type === `next`) {
      setSceneOrder((v) => v + 1)
    } else {
      setSceneOrder((v) => v - 1)
    }
  }, [])

  const { mutateAsync: sceneMutate } = useMutation({
    mutationFn: function (v: AxiosRequestConfig) {
      return apiRequest({
        ...v,
        method: `post`,
        url: `/api/game/scene`,
        data: {
          taleId: `${taleId}`,
          sceneId: `${sceneDetail?.id}`,
        },
      })
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.game())
    },
  })

  useEffect(
    function () {
      if (sceneDetail) {
        const axiosSource = axios.CancelToken.source()
        sceneMutate({ cancelToken: axiosSource.token })

        return function () {
          axiosSource.cancel()
        }
      }
    },
    [sceneOrder, sceneDetail],
  )

  useEffect(
    function () {
      console.log(sceneOrder - 1 === maxlength)
      if (sceneOrder - 1 === maxlength!) {
        navigate(`/playtale/word-test/${taleId}`)
      }
    },
    [sceneOrder, maxlength],
  )

  useEffect(() => {
    runBackgroundMusic()
    // playEngScript()
  }, [runBackgroundMusic, sceneDetailLoading])

  useEffect(
    function () {
      if (isKor) {
        scriptListAudioRef.current?.pause()
        const a = setTimeout(playKorScript, 100)
        return function () {
          clearTimeout(a)
        }
      } else {
        scriptListAudioRef.current?.pause()
        const a = setTimeout(playEngScript, 100)
        return function () {
          clearTimeout(a)
        }
      }
    },
    [sceneOrder, sceneDetailLoading, isKor],
  )

  useEffect(
    function () {
      if (!isPause) {
        scriptListAudioRef.current?.play()
        backgroundMusicAudioRef.current?.play()
      } else {
        scriptListAudioRef.current?.pause()
        backgroundMusicAudioRef.current?.pause()
      }
    },
    [isPause, scriptListAudioRef.current, backgroundMusicAudioRef.current],
  )

  useEffect(
    function () {
      setIsPause(() => false)
    },
    [isKor],
  )

  const toggleKor = function () {
    setIsKor((val) => !val)
  }
  const pauseHandler = function () {
    setIsPause((val) => !val)
  }

  const goNext = function () {
    setSceneOrder((v) => v + 1)
    setIsKor(() => false)
    setIsPause(() => false)
  }
  const goBefore = function () {
    setSceneOrder((v) => {
      if (v > 1) {
        setIsKor(() => false)
        setIsPause(() => false)
        return v - 1
      } else {
        dispatch(DispatchToast("동화의 처음 장면입니다!", false))
        return v
      }
    })
  }

  if (sceneDetailLoading || sceneLoading || !sceneDetail) {
    return <CommonLoading>로딩중...</CommonLoading>
  }

  if (sceneDetailError) {
    return <Navigate to={`/error`} />
  }

  return (
    <>
      <GameNavigator
        isPause={isPause}
        toggleKor={toggleKor}
        togglePause={pauseHandler}
      />
      <audio ref={backgroundMusicAudioRef} />
      <audio ref={scriptListAudioRef} />
      <div
        onClick={goBefore}
        className="fixed z-[101] top-[50%] left-0 cursor-pointer hover:scale-[110%] duration-[0.33s] mx-[2%] rotate-180"
      >
        <svg
          fill="#AB4632"
          version="1.1"
          id="Capa_1"
          width="88px"
          height="88px"
          viewBox="0 0 579.083 579.083"
        >
          <g>
            <path
              d="M492.551,389.644c31.823-21.42,100.979-64.872,83.844-111.997c-19.584-52.632-89.964-94.248-134.028-124.236
		c-25.092-17.136-110.771-78.336-140.76-41.004c-1.836,1.836-2.448,4.896-1.836,7.344c-12.24,25.092-4.896,64.26-4.896,91.188
		c0,4.896,0,9.792,0,14.688c-89.963-0.612-187.883-29.988-275.399-4.284c-5.508,1.836-7.956,5.508-8.568,9.18
		c-0.612,0-1.224,0.612-1.836,0.612c-13.464,7.956-7.956,38.556-7.956,52.02c0,23.257-0.612,47.737,3.672,70.38
		c1.224,5.509,4.896,8.568,9.18,9.181c2.448,3.06,4.896,4.284,8.568,4.284c92.412-1.225,182.988-12.24,275.399-6.732
		c0,29.376-1.224,58.752-5.508,88.128c-0.612,3.672,0.611,6.732,1.836,9.18c-6.12,7.345,0.611,22.645,13.464,20.809
		C372.599,469.203,439.307,425.14,492.551,389.644z"
            />
          </g>
        </svg>
      </div>
      <div
        onClick={goNext}
        className="fixed z-[101] top-[50%] right-0 cursor-pointer hover:scale-[110%] duration-[0.33s] mx-[2%]"
      >
        <svg
          fill="#AB4632"
          version="1.1"
          id="Capa_1"
          width="88px"
          height="88px"
          viewBox="0 0 579.083 579.083"
        >
          <g>
            <path
              d="M492.551,389.644c31.823-21.42,100.979-64.872,83.844-111.997c-19.584-52.632-89.964-94.248-134.028-124.236
		c-25.092-17.136-110.771-78.336-140.76-41.004c-1.836,1.836-2.448,4.896-1.836,7.344c-12.24,25.092-4.896,64.26-4.896,91.188
		c0,4.896,0,9.792,0,14.688c-89.963-0.612-187.883-29.988-275.399-4.284c-5.508,1.836-7.956,5.508-8.568,9.18
		c-0.612,0-1.224,0.612-1.836,0.612c-13.464,7.956-7.956,38.556-7.956,52.02c0,23.257-0.612,47.737,3.672,70.38
		c1.224,5.509,4.896,8.568,9.18,9.181c2.448,3.06,4.896,4.284,8.568,4.284c92.412-1.225,182.988-12.24,275.399-6.732
		c0,29.376-1.224,58.752-5.508,88.128c-0.612,3.672,0.611,6.732,1.836,9.18c-6.12,7.345,0.611,22.645,13.464,20.809
		C372.599,469.203,439.307,425.14,492.551,389.644z"
            />
          </g>
        </svg>
      </div>
      {sceneDetail?.interactiveType ? (
        <InteractionComp
          taleId={parseInt(taleId)}
          sceneOrder={sceneOrder}
          changeScene={changeSceneHandler}
          isKor={isKor}
        />
      ) : (
        <TaleScene
          taleId={parseInt(taleId)}
          sceneOrder={sceneOrder}
          changeScene={changeSceneHandler}
          isKor={isKor}
          isPause={isPause}
          sceneDetail={sceneDetail}
        />
      )}
    </>
  )
}

export default SceneParent
