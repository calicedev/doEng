import React from "react"

import { useProgressTaleList } from "hooks/queries/queries"
import { queryKeys } from "hooks/queries/queryKeys"
import ProgressListItem from "./ProgressListItem"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"
import CommonLoading from "components/UI/CommonLoading"

function ProgressList() {
  const {
    isLoading: progressLoading,
    error: progressError,
    data: progressTale,
  } = useProgressTaleList()

  if (progressLoading) {
    return <CommonLoading></CommonLoading>
  }

  if (!progressTale) {
    return <div>잘못된 접근입니다.</div>
  }

  return (
    <>
      {progressLoading ? (
        <div>로딩 중</div>
      ) : progressTale ? (
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8">
          {progressTale?.map((tale, idx) => (
            <AnimationBox appearClassName={`${textOneByOne[idx]}`}>
              <ProgressListItem key={`${tale.id}`} tale={tale} />
            </AnimationBox>
          ))}
        </div>
      ) : (
        <div>잘못된 접근입니다.</div>
      )}
    </>
  )
}

export default ProgressList
