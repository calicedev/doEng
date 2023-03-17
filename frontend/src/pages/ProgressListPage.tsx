import React from "react"
import { Link } from "react-router-dom"
import dummy from "../components/MyPageComponents/DummyData/ProgressList.json"
import ProgressList from "../components/MyPageComponents/ProgressList/ProgressList"

interface Tale {
  id: number
  title: string
  backgroundImage: string
  progress: number
}

function ProgressListPage() {
  const { taleList }: { taleList: Tale[] } = dummy
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8">
      {taleList.map((tale: Tale) => (
        <ProgressList key={tale.id} tale={tale} />
      ))}
    </div>
  )
}

export default ProgressListPage
