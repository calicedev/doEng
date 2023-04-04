import { useSceneDetail, usePlayTaleDetail, Scene } from "hooks/queries/queries"
import React, {
  useState,
  useRef,
  useEffect,
  PropsWithChildren,
  useMemo,
  useCallback,
} from "react"
import { useNavigate } from "react-router-dom"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import LoadingPage from "pages/LoadingPage"

interface TaleSceneProps {
  taleId: number
  sceneOrder: number
  changeScene: (type: `next` | `before`) => void
  isKor?: boolean
  isPause?: boolean
  sceneDetail: Scene
}

function TaleScene({
  taleId,
  sceneOrder,
  changeScene,
  isKor = false,
  isPause = false,
}: PropsWithChildren<TaleSceneProps>) {
  const { data } = usePlayTaleDetail(taleId)
  const maxlength = data?.sceneCount
  const navigate = useNavigate()

  const {
    isLoading: sceneDetailLoading,
    error: sceneDetailError,
    data: sceneDetail,
  } = useSceneDetail(taleId, sceneOrder)

  const engScripts = useMemo(
    function () {
      let engLi: string[] = []
      if (sceneDetail?.scriptList[0].content) {
        engLi = sceneDetail.scriptList[0].content.split(" ")
      }
      return engLi
    },
    [sceneDetail?.scriptList[0].content, sceneDetailLoading],
  )

  const korScripts = useMemo(
    function () {
      let korLi: string[] = []
      if (sceneDetail?.scriptList[1].content) {
        korLi = sceneDetail.scriptList[1].content.split(" ")
      }
      return korLi
    },
    [sceneDetail?.scriptList[0].content, sceneDetailLoading],
  )

  const nextScene = function () {
    changeScene(`next`)
  }
  const beforeScene = function () {
    changeScene(`before`)
  }

  if (sceneDetailLoading) {
    return <LoadingPage />
  }
  return (
    <>
      {/* <audio ref={backgroundMusicAudioRef} />
      <audio ref={scriptListAudioRef} /> */}
      <div className="h-full w-full bg-scene-back content-center bg-no-repeat bg-cover relative">
        <img
          src={sceneDetail?.image}
          className="h-[88%] w-full bg-img-gradient object-contain top-[50%] left-[50%] absolute translate-x-[-50%] translate-y-[-55%] z-[40]"
        />
        {/* <div className="relative z-[49] left-[50%] bottom-[-60%] w-[70%] h-auto p-5 flex flex-row flex-wrap items-center justify-center translate-x-[-50%] font-jalnan text-[26px] gap-[0.5rem] ">
          {engScripts.map((val, idx) => {
            return (
              <>
                <AnimationBox
                  key={`stript-eng-${idx}`}
                  boxClasses="drop-shadow-xl text-stroke text-[55px]"
                  appearClassName={`${textOneByOne[idx + 5]}`}
                >
                  {val}
                </AnimationBox>
              </>
            )
          })}
        </div> */}
        <div className="relative z-[49] left-[50%] bottom-[-66%] w-[70%] h-auto p-5 flex flex-row flex-wrap items-center justify-center translate-x-[-50%] font-jalnan text-[26px] gap-[1rem]">
          {isKor
            ? korScripts.map((val, idx) => {
                return (
                  <>
                    <AnimationBox
                      key={`stript-eng-${idx}`}
                      boxClasses="drop-shadow-xl text-stroke text-[55px]"
                      appearClassName={`${textOneByOne[idx + 5]}`}
                    >
                      {val}
                    </AnimationBox>
                  </>
                )
              })
            : engScripts.map((val, idx) => {
                return (
                  <>
                    <AnimationBox
                      key={`stript-eng-${idx}`}
                      boxClasses="drop-shadow-xl text-stroke text-[55px]"
                      appearClassName={`${textOneByOne[idx + 5]}`}
                    >
                      {val}
                    </AnimationBox>
                  </>
                )
              })}
        </div>
      </div>
    </>
  )
}

export default TaleScene
