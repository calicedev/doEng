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
  const toProgressDetail = () => {
    navigate(`/mypage/progress/${tale.id}`)
  }
  return (
    <div
      className="flex flex-col items-center gap-1 relative min-w-[180px] px-3 py-1 border-[3px] rounded-lg border-orange-300 bg-white bg-opacity-90 cursor-pointer ease-in-out duration-300 hover:scale-110"
      onClick={toProgressDetail}
    >
      <div
        className={`overflow-hidden relative z-0 w-full rounded drop-shadow-lg`}
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={tale.backgroundImage}
          alt="동화책 이미지"
        />
      </div>
      <div>{tale.title}</div>

      <div className="flex justify-center relative w-full mb-0.5 rounded-full bg-gray-200 dark:bg-gray-700 ">
        <div
          className="absolute top-[50%] left-[3%] translate-y-[-50%] h-[72%] rounded-full bg-lime-500 dark:bg-green-500 duration-[0.33s]"
          style={{
            width: `${100 * 0.94}%`,
            transform: `width: 100%`,
          }}
        ></div>
        <div className="py-[3px] text-white text-sm z-[5]">
          {tale.progress}%
        </div>
      </div>
    </div>
  )
}

export default ProgressListItem
