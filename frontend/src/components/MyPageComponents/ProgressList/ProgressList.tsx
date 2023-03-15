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
      className=" border-2 border-orange-300 rounded-lg py-2 px-2 cursor-pointer"
      onClick={pushProgressListDetail}
    >
      <img
        className="w-full"
        src={tale.backgroundImage}
        alt="progressBackground"
      />{" "}
      <div>{tale.title}</div>
      <div className="w-full bg-gray-200 rounded-full mb-4 dark:bg-gray-700">
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
