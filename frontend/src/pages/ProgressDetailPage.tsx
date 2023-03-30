import React from "react"
import { useParams } from "react-router-dom"
import dummy from "components/MyPageComponents/DummyData/ProgressDetail.json"
import ProgressDetailHeader from "components/MyPageComponents/ProgressDetail/ProgressDetailHeader"
import ProgressDetailTest from "components/MyPageComponents/ProgressDetail/ProgressDetailTest"
import ProgressDetailSceneList from "components/MyPageComponents/ProgressDetail/ProgressDetailSceneList"
import {
  useProgressTaleDetail,
  ProgressTaleDetail,
  ProgressScene,
  ProgressTestResult,
  ProgressImage,
} from "hooks/queries/queries"

import CommonLoading from "components/UI/CommonLoading"

function ProgressDetailPage() {
  const { taleId } = useParams() as { taleId: string }

  const {
    isLoading: progressDetailLoading,
    error: progressDetailError,
    data: progressDetail,
  } = useProgressTaleDetail(parseInt(taleId))

  return (
    <>
      {progressDetailLoading ? (
        <CommonLoading />
      ) : progressDetail ? (
        <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-10 p-6 overflow-y-auto">
          <div className={`min-w-[300px] w-[80%] sm:w-[30%]`}>
            <ProgressDetailHeader tale={progressDetail} />
          </div>
          <div className="flex-1 flex flex-col gap-5">
            <div className="flex-1">
              {progressDetail.sceneList && (
                <ProgressDetailSceneList
                  key={progressDetail.id}
                  photoList={progressDetail.sceneList}
                />
              )}
            </div>
            <div className={`flex-1`}>
              {progressDetail.testResult && (
                <ProgressDetailTest taleTest={progressDetail.testResult} />
              )}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
    </>
  )
}

export default ProgressDetailPage
