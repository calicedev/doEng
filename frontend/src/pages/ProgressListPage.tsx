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
    <div>
      <h1>ProgressListPage</h1>
      <div className="grid grid-cols-5 gap-4">
        {taleList.map((tale: Tale) => (
          <ProgressList key={tale.id} tale={tale} />
        ))}
      </div>
    </div>
  )
}

export default ProgressListPage
