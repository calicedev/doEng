import AnimationBox from "components/UI/AnimationBox"
import TaleNavigator from "components/UI/TaleNavigator"
import Background from "../../assets/images/Background.png"
import BookStand from "../../assets/images/BookStand.png"
import { useRef } from "react"
import { useWidthHeight } from "hooks/useWidthHwight"
import PlayTaleListItem from "./PlayTaleListItem"
import LoadingComp from "components/UI/LoadingComp"
import apiRequest from "utils/axios"
import { useQuery } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"
import { usePlayTaleList } from "hooks/queries/queries"
import SuperHeroLanding from "./SuperHeroLanding"
import LoadingPage from "pages/LoadingPage"
import { SpinnerDots } from "components/UI/Spinner"
import { Navigate } from "react-router-dom"

const PlayTaleList = function () {
  const imgRef = useRef<HTMLImageElement>(null)
  const { width, height } = useWidthHeight(imgRef)

  const {
    isInitialLoading,
    isLoading,
    isError,
    data: PlayTaleList,
  } = usePlayTaleList()

  if (isLoading) {
    return <LoadingPage />
  }
  if (isError) {
    return <Navigate to={`/error`} />
  }
  return (
    <>
      <TaleNavigator />
      <img
        alt="배경"
        src={Background}
        className="canvas-under-bg-container bg-vegis absolute -z-[60] h-full w-full"
      />
      <SuperHeroLanding>
        <AnimationBox
          boxClasses="bg-vegis absolute w-full h-full px-[9.9%] py-[5.1%]"
          appearClassName="animate-[appear-from-bottom-with-bounce_0.33s_both]"
        >
          <img
            ref={imgRef}
            alt="책장"
            src={BookStand}
            className="w-full h-full"
          />
        </AnimationBox>
      </SuperHeroLanding>
      <div
        className="w-full h-[48%] flex flex-row overflow-y-scroll flex-wrap gap-[1%] px-30% absolute top-[38%] pl-[25.25%] pr-[24%]"
        // style={{ width: `${width}px` }}
      >
        {PlayTaleList ? (
          PlayTaleList.map((tale, idx: number) => {
            return (
              <PlayTaleListItem
                tale={tale}
                key={`play-tale-${tale.id}`}
                animationOrder={idx}
              />
            )
          })
        ) : (
          <SpinnerDots />
        )}
      </div>
      {/* </div> */}
    </>
  )
}

export default PlayTaleList
