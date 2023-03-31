import React from "react"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { useProgressTaleList } from "hooks/queries/queries"
import { DispatchToast } from "store"
import ProgressListItem from "./ProgressListItem"
import CommonLoading from "components/UI/CommonLoading"
import AnimationBox, { textOneByOne } from "components/UI/AnimationBox"

function ProgressList() {
  const dispatch = useStoreDispatch()
  const {
    isLoading: progressLoading,
    isError: progressError,
    data: progressTale,
  } = useProgressTaleList()

  if (progressError) {
    dispatch(DispatchToast("동화책 정보를 불러오지 못했습니다.", false))
  }

  return (
    <>
      {progressLoading ? (
        <CommonLoading />
      ) : (
        <div className="grid grid-cols-2 flex-nowrap sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6 p-8">
          {progressTale?.map((tale, idx) => (
            <AnimationBox
              key={`tale-animation-${tale.id}`}
              appearClassName={`${textOneByOne[idx]}`}
            >
              <ProgressListItem key={`tale-${tale.id}`} tale={tale} />
            </AnimationBox>
          ))}
        </div>
      )}
    </>
  )
}

export default ProgressList
