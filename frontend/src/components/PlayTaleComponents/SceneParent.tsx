import GameNavigator from "components/UI/GameNavigator"
import { usePlayTaleDetail, useSceneDetail } from "hooks/queries/queries"
import { Navigate, Outlet, useParams } from "react-router-dom"
import InteractionComp from "./InteractionComp"
import { useState } from "react"
import TaleScene from "./PlayTaleScene/TaleScene"
import ErrorPage from "pages/ErrorPage"

interface Props {
  nowSceneOrder?: number
}
const SceneParent = function ({ nowSceneOrder = 1 }: Props) {
  const [sceneOrder, setSceneOrder] = useState<number>(1)
  const { taleId } = useParams() as { taleId: string }
  const { data: PlayTaleDetail } = usePlayTaleDetail(parseInt(taleId))
  const { data: sceneData, isError } = useSceneDetail(
    parseInt(taleId),
    sceneOrder,
  )
  const changeSceneHandler = function () {
    setSceneOrder((v) => v + 1)
  }
  if (sceneOrder === PlayTaleDetail?.sceneCount) {
    return <Navigate to={`/playtale/word-test/${taleId}`} />
  }
  if (isError) {
    return <Navigate to={`/error`} />
  }
  return (
    <>
      <GameNavigator />
      {sceneData?.interactiveType ? (
        <InteractionComp
          taleId={parseInt(taleId)}
          sceneOrder={sceneOrder}
          changeScene={changeSceneHandler}
        />
      ) : (
        <TaleScene
          taleId={parseInt(taleId)}
          sceneOrder={sceneOrder}
          changeScene={changeSceneHandler}
        />
      )}
    </>
  )
}

export default SceneParent
