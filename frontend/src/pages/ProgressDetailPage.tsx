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
import AnimationBox from "components/UI/AnimationBox"

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
        <div
          id="progress-detail-container"
          className="flex flex-col items-center sm:flex-row sm:items-stretch gap-7 w-full h-full p-6 overflow-x-hidden overflow-y-auto"
        >
          <div
            className={`self-center w-[80%] sm:w-[40%] md:w-[30%] lg:w-[25%]`}
          >
            <AnimationBox appearClassName="animate-appear-from-left-fast">
              <ProgressDetailHeader tale={progressDetail} />
            </AnimationBox>
          </div>
          <div className="flex-1 flex flex-col gap-16 sm:gap-10 w-[100%] sm:w-[60%] md:w-[70%] lg:w-[75%] h-full">
            <div className="w-full h-[40%]">
              {progressDetail.sceneList && (
                <AnimationBox appearClassName="animate-appear-from-bottom-fast">
                  <ProgressDetailSceneList
                    key={progressDetail.id}
                    sceneList={progressDetail.sceneList}
                  />
                </AnimationBox>
              )}
            </div>
            <div className={`w-full h-[50%]`}>
              {progressDetail.testResult && (
                <ProgressDetailTest testResult={progressDetail.testResult} />
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
