import GameNavigator from "components/UI/GameNavigator"
import { usePlayTaleDetail, useSceneDetail } from "hooks/queries/queries"
import { Navigate, Outlet, useParams } from "react-router-dom"
import InteractionComp from "./InteractionComp"
import { useCallback, useEffect, useState } from "react"
import TaleScene from "./PlayTaleScene/TaleScene"
import ErrorPage from "pages/ErrorPage"
import apiRequest from "utils/axios"
import CommonLoading from "components/UI/CommonLoading"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"
import axios, { AxiosRequestConfig } from "axios"

interface Props {
  nowSceneOrder?: number
}
const SceneParent = function ({ nowSceneOrder = 1 }: Props) {
  const { sceneOrder: paramsSceneOrder } = useParams() as { sceneOrder: string }
  const [sceneOrder, setSceneOrder] = useState<number>(
    parseInt(paramsSceneOrder),
  )
  const [isKor, setIsKor] = useState<boolean>(false)
  const [isPause, setIsPause] = useState<boolean>(false)
  const queryClient = useQueryClient()
  const { taleId } = useParams() as { taleId: string }
  const { data: PlayTaleDetail, isLoading: sceneLoading } = usePlayTaleDetail(
    parseInt(taleId),
  )
  const {
    data: sceneData,
    isError,
    isLoading: scenedetailLoading,
  } = useSceneDetail(parseInt(taleId), sceneOrder)

  const changeSceneHandler = useCallback(function () {
    setSceneOrder((v) => v + 1)
  }, [])
  const { mutateAsync: sceneMutate } = useMutation({
    mutationFn: function (v: AxiosRequestConfig) {
      return apiRequest({
        method: `post`,
        url: `/api/game/scene`,
        data: {
          taleId: `${taleId}`,
          sceneId: `${sceneData?.id}`,
        },
        ...v,
      })
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.game())
    },
  })

  useEffect(
    function () {
      if (sceneData) {
        const axiosSource = axios.CancelToken.source()
        sceneMutate({ cancelToken: axiosSource.token })
          .then((res) => {
            // console.log(res)
            console.log(sceneData?.id)
            console.log(sceneData?.sceneOrder)
          })
          .catch((err) => {
            // console.log(err)
          })

        return function () {
          axiosSource.cancel()
        }
      }
    },
    [sceneOrder, sceneData],
  )

  const toggleKor = function () {
    setIsKor((val) => !val)
  }
  const pauseHandler = function () {
    setIsPause((val) => !val)
  }

  if (scenedetailLoading || sceneLoading) {
    return <CommonLoading>로딩중...</CommonLoading>
  }

  if (sceneOrder === PlayTaleDetail?.sceneCount) {
    return <Navigate to={`/playtale/word-test/${taleId}`} />
  }
  if (isError) {
    return <Navigate to={`/error`} />
  }
  return (
    <>
      <GameNavigator toggleKor={toggleKor} togglePause={pauseHandler} />
      {sceneData?.interactiveType ? (
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
        />
      )}
    </>
  )
}

export default SceneParent
