import React, { PropsWithChildren, useRef } from "react"
import { useNavigate } from "react-router-dom"
import { ProgressTale } from "hooks/queries/queries"
import { useWidthHeight } from "hooks/useWidthHwight"
import Graph from "components/CanvasComponents/BarGraph/Graph"

interface Props {
  tale: ProgressTale
}

function ProgressListItem({ tale }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const pushProgressListDetail = () => {
    navigate(`/mypage/progress/${tale.id}`)
  }
  const barRef = useRef<HTMLDivElement>(null)
  const { width, height } = useWidthHeight(barRef)
  return (
    <div
      className=" border-[3px] border-orange-300 bg-white rounded-lg flex flex-col items-center gap-2 relative p-3 min-w-[180px] cursor-pointer ease-in-out duration-300 hover:scale-110"
      onClick={pushProgressListDetail}
    >
      <div
        className={`basis-[70%] overflow-hidden relative z-0 w-full rounded drop-shadow-lg`}
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={tale.backgroundImage}
          alt="progressBackground"
        />{" "}
      </div>
      <div className="relative">{tale.title}</div>

      <div
        ref={barRef}
        className="relative w-full bg-gray-200 rounded-full mb-0.5 dark:bg-gray-700 flex justify-center"
      >
        <div
          className="bg-green-600 rounded-full h-[72%] dark:bg-green-500 absolute top-[50%] left-[3%] translate-y-[-50%] duration-[0.33s]"
          style={{
            width: `0`, // `${tale.progress * 0.94}%`,
            transform: `width: 100%`,
          }}
        ></div>
        <div className="z-[5]">{tale.progress || 0}%</div>
      </div>
    </div>
  )
}

export default ProgressListItem
