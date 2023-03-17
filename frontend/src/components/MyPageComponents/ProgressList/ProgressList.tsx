import React from "react"
import dummy from "../DummyData/ProgressList.json"
import { useNavigate } from "react-router-dom"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  progress: number
}

interface TaleProps {
  tale: Tale
}

function ProgressList({ tale }: TaleProps) {
  const navigate = useNavigate()

  const pushProgressListDetail = () => {
    navigate(`/mypage/progress/${tale.id}`)
  }
  return (
    <div
      className=" border-[3px] border-orange-300 bg-white rounded-lg flex flex-col items-center gap-2 relative p-3 min-w-[180px] cursor-pointer ease-in-out duration-300 hover:scale-110"
      onClick={pushProgressListDetail}
    >
      <div
        className={`overflow-hidden relative z-0 w-full rounded drop-shadow-lg`}
        style={{ paddingBottom: "133.33%" }}
      >
        <img
          className="absolute top-0 left-0 w-full h-full object-cover"
          src={tale.backgroundImage}
          alt="progressBackground"
        />{" "}
      </div>
      <div>{tale.title}</div>
      <div className="w-full bg-gray-200 rounded-full mb-0.5 dark:bg-gray-700">
        <div
          className="bg-green-600 rounded-full dark:bg-green-500"
          style={{ width: `${tale.progress}%` }}
        >
          {tale.progress}%
        </div>
      </div>
    </div>
  )
}

export default ProgressList
