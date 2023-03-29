import GameNavigator from "components/UI/GameNavigator"
import { usePlayTaleDetail, useSceneDetail } from "hooks/queries/queries"
import { Outlet, useParams } from "react-router-dom"
import InteractionComp from "./InteractionComp"
import { useState } from "react"
import TaleScene from "./PlayTaleScene/TaleScene"

const SceneParent = function () {
  const [sceneOrder, setSceneOrder] = useState<number>(1)
  const { taleId } = useParams() as { taleId: string }
  const { data: PlayTaleDetail } = usePlayTaleDetail(parseInt(taleId))
  const { data: sceneData } = useSceneDetail(parseInt(taleId), sceneOrder)
  const changeSceneHandler = function () {
    setSceneOrder((v) => v + 1)
  }
  console.log(sceneData)
  return (
    <>
      <GameNavigator />
      <div>씬</div>
      <div>씬</div>
      <div>씬</div>
      {sceneData?.interactiveType ? (
        <InteractionComp />
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
