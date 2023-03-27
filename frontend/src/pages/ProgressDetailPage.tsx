import React from "react"
import { useParams } from "react-router-dom"
import dummy from "components/MyPageComponents/DummyData/ProgressDetail.json"
import ProgressDetail from "components/MyPageComponents/ProgressDetail/ProgressDetail"
import ProgressDetailTest from "components/MyPageComponents/ProgressDetail/ProgressDetailTest"
import ProgressDetailPhoto from "components/MyPageComponents/ProgressDetail/ProgressDetailPhoto"
import {
  useProgressTaleDetail,
  ProgressTaleDetail,
  ProgressScene,
  ProgressTestResult,
  ProgressImage,
} from "hooks/queries/queries"

function ProgressDetailPage() {
  const { taleId } = useParams() as { taleId: string }

  const {
    isLoading: progressDetailLoading,
    error: progressDetailError,
    data: progressDetailData,
  } = useProgressTaleDetail(parseInt(taleId))
  console.log("1111111111111111")
  console.log(progressDetailData)

  return (
    <div className="h-full flex flex-nowrap">
      <div className=" basis-1/3 p-10 place-self-center">
        {progressDetailLoading ? (
          <>
            <div>로딩중입니다</div>
          </>
        ) : progressDetailData ? (
          <ProgressDetail tale={progressDetailData} />
        ) : (
          <div>진행중인 동화가 존재하지 않습니다</div>
        )}
      </div>
      <div className={`flex flex-col basis-2/3`}>
        <div className=" basis-1/2">
          {progressDetailLoading ? (
            <>
              <div>로딩중입니다</div>
            </>
          ) : progressDetailData?.sceneList ? (
            <ProgressDetailPhoto
              key={progressDetailData.id}
              talePhoto={progressDetailData.sceneList}
            />
          ) : (
            <div>사진이 존재하지 않습니다</div>
          )}
        </div>
        <div className="basis-1/2 place-self-center pt-[10%]">
          {progressDetailLoading ? (
            <>
              <div>로딩중입니다</div>
            </>
          ) : progressDetailData?.testResult ? (
            <ProgressDetailTest taleTest={progressDetailData.testResult} />
          ) : (
            <div>테스트 결과가 존재하지 않습니다</div>
          )}
        </div>
      </div>
    </div>
  )
}

export default ProgressDetailPage
