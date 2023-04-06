import MyReview from "components/MyPageComponents/TaleDetail/TaleDetailMyReview"
import ReviewList from "components/MyPageComponents/TaleDetail/TaleDetailReviewList"
import TaleDetailHeader from "components/MyPageComponents/TaleDetail/TaleDetailHeader"
import Modal from "components/UI/Modal"
import useApi from "hooks/useApi"
import React, {
  useState,
  useMemo,
  useEffect,
  FC,
  PropsWithChildren,
} from "react"
import { useNavigate, useParams } from "react-router-dom"
import axios from "utils/axios"
import { useQuery } from "@tanstack/react-query"
import apiRequest from "utils/axios"
import { SpinnerDots } from "components/UI/Spinner"
import { Material, useStoreTaleDetail } from "hooks/queries/queries"
import AnimationBox from "components/UI/AnimationBox"

// React Query 작업 /////////////////////////////////
const TaleDetailPage = function () {
  const navigate = useNavigate()
  const { taleId } = useParams() as { taleId: string }

  const {
    isLoading: taleLoading,
    error: taleError,
    data: taleDetail,
  } = useStoreTaleDetail(parseInt(taleId))

  // ["준비물1", "준비물2", "준비물3"] ->  "준비물1, 준비물2, 준비물3"
  const materialList = useMemo(() => {
    return taleDetail?.materialList
      .reduce((acc: string, cur: Material) => acc + ", " + cur?.name, "")
      .slice(1)
  }, [taleDetail?.materialList])
  // const materialList = taleDetail?.materialList[0].name

  if (taleLoading) {
    return <SpinnerDots />
  }

  if (!taleDetail) {
    return <div>새로고침 바랍니다</div>
  }

  return (
    <div className="flex flex-col sm:flex-row items-center sm:items-stretch gap-10 h-full p-6 overflow-y-auto">
      <div className={`self-center w-[80%] sm:w-[40%] md:w-[30%] lg:w-[22%]`}>
        <AnimationBox appearClassName="animate-appear-from-left-fast">
          <TaleDetailHeader />
        </AnimationBox>
      </div>
      <div className="flex-1 flex flex-col gap-10 sm:gap-10 w-[100%] sm:w-[60%] md:w-[70%] lg:w-[78%] h-full">
        <TitleContent title={`줄거리`}>{taleDetail?.description}</TitleContent>
        {/* <TitleContent title={`준비물`}>{materialList}</TitleContent> */}
        {taleDetail?.purchased && (
          <TitleContent title={`내 리뷰`}>
            <MyReview />
          </TitleContent>
        )}
        <ReviewList />
      </div>
    </div>
  )
}

interface Props {
  title: string
}

const TitleContent: FC<PropsWithChildren<Props>> = function ({
  title,
  children,
}) {
  return (
    <AnimationBox appearClassName="animate-appear-from-bottom-fast">
      <div className="flex flex-col gap-2 font-medium">
        <div className="font-bold text-2xl">{title}</div>
        <div className="text-xl">{children}</div>
      </div>
    </AnimationBox>
  )
}

export default TaleDetailPage
