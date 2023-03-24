import AnimationBox from "components/UI/AnimationBox"
import TaleNavigator from "components/UI/TaleNavigator"
import PanDDaegi from "../../assets/images/PanDDaegi.png"
import DDuGGung from "../../assets/images/PanDDuGGung.png"
import { useRef } from "react"
import { useWidthHeight } from "hooks/useWidthHwight"
import PlayTaleListItem from "./PlayTaleListItem"
import { useTaleStoreList } from "hooks/queries/tale"
import LoadingComp from "components/UI/LoadingComp"
import { useQuery } from "react-query"
import apiRequest from "utils/axios"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  score: number
  purchased: boolean
}

const PlayTaleList = function () {
  const imgRef = useRef<HTMLImageElement>(null)
  const { width, height } = useWidthHeight(imgRef)

  const {
    isLoading,
    error,
    data: TaleStoreList,
  } = useQuery<Tale[]>([`test`], function () {
    return apiRequest({
      method: `get`,
      url: `/api/tale/list`,
    }).then((res) => res.data)
  })
  console.log(TaleStoreList)
  if (!TaleStoreList) {
    return <LoadingComp />
  }
  return (
    <>
      <TaleNavigator />
      <div className="canvas-under-bg-container h-full w-full flex items-center justify-center">
        <AnimationBox
          boxClasses="h-full w-full flex items-center justify-center"
          appearClassName="animate-[appear-from-bottom-with-bounce_0.66s_0.44s_both]"
        >
          <img ref={imgRef} alt="bg" src={PanDDaegi} className="h-[90%]" />
        </AnimationBox>
      </div>
      {/* <div className="canvas-under-bg-container w-full relative top-0">
        <AnimationBox
          boxClasses="h-full w-full flex items-center justify-center"
          appearClassName="animate-[appear-from-bottom-with-bounce-second_0.66s_0.44s_both]"
        >
        <img alt="dg" src={DDuGGung} className="" />
      </AnimationBox>
      </div> */}
      <div
        className="py-[6.9%] px-[9.9%]"
        style={{ width: `${width}px`, height: `${height}px` }}
      >
        <div className="w-full h-full flex flex-row overflow-y-scroll flex-wrap gap-[1%]">
          {TaleStoreList.filter(
            (val) => val.purchased === false /*이거 true임*/,
          ).map((tale) => {
            return <PlayTaleListItem tale={tale} />
          })}
        </div>
      </div>
    </>
  )
}

export default PlayTaleList
