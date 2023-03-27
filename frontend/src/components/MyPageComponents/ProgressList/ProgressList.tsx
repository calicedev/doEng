import React from "react"
import dummy from "../DummyData/ProgressList.json"

import { useProgressTaleList } from "hooks/queries/queries"
import { queryKeys } from "hooks/queries/queryKeys"
import ProgressListItem from "./ProgressListItem"

function ProgressList() {
  const {
    isLoading: progressLoading,
    error: progressError,
    data: progressTale,
  } = useProgressTaleList()

  if (!progressTale) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <>
      {progressLoading ? (
        <div>로딩 중</div>
      ) : progressTale ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-8 p-8">
          {progressTale?.map((tale) => (
            <ProgressListItem key={`${tale.id}`} tale={tale} />
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </>
  )
}

export default ProgressList
