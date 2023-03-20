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
import { useParams } from "react-router-dom"
import axios from "utils/axios"

interface Review {
  id: number
  memberId: string
  score: number
  content: string
}
// React Query 작업 /////////////////////////////////
const TaleDetailPage = function () {
  const { taleId } = useParams()

  const [taleDetail, setTaleDetail] = useState(exData)
  const { isLoading, isError, axiosRequest } = useApi()

  // 마운트 시 책 리스트 정보 받아오기
  useEffect(() => {
    axiosRequest(
      {
        method: "get",
        url: `/api/mypage/tale-list/${taleId}`,
      },
      (res) => {
        setTaleDetail(res.data)
      },
      "책 정보를 불러오지 못했습니다",
    )
  }, [axiosRequest, taleId])

  // ["준비물1", "준비물2", "준비물3"] ->  "준비물1, 준비물2, 준비물3"
  const materialList = useMemo(() => {
    return taleDetail.materialList
      .reduce((acc, cur) => acc + ", " + cur.name, "")
      .slice(1)
  }, [taleDetail.materialList])

  // 리뷰 가져오기
  const getReviews = () => {
    axiosRequest(
      {
        method: "get",
        url: `/api/mypage/review/${taleId}/review-list`,
      },
      (res) => {
        const newTaleDetail = { ...taleDetail }
        newTaleDetail.myReview = res.data.myReview
        newTaleDetail.reviewList = res.data.reviewList
        setTaleDetail(newTaleDetail)
      },
      "리뷰 정보를 불러오지 못했습니다",
    )
  }

  return (
    <div className="flex flex-col items-center sm:flex-row sm:items-stretch gap-10 p-6 overflow-y-auto">
      <TaleDetailHeader
        backgroundImage={taleDetail.backgroundImage}
        title={taleDetail.title}
        score={taleDetail.score}
        purchased={taleDetail.purchased}
      />
      <div className="flex-1 flex flex-col gap-5">
        <TitleContent title={`줄거리`}>{taleDetail.description}</TitleContent>
        <TitleContent title={`준비물`}>{materialList}</TitleContent>
        {taleDetail.purchased && (
          <TitleContent title={`내 리뷰`}>
            <MyReview review={taleDetail.myReview} getReviews={getReviews} />
          </TitleContent>
        )}
        <ReviewList reviewList={taleDetail.reviewList} />
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
    <div className="flex flex-col gap-2 font-medium">
      <div className="font-bold text-xl">{title}</div>
      {children}
    </div>
  )
}

export default TaleDetailPage

const exData = {
  id: 1,
  title: "기여운 강아지가 가방에 들어가는 이야기",
  backgroundImage:
    "https://mblogthumb-phinf.pstatic.net/MjAyMDExMDZfMTE3/MDAxNjA0NjIzMDcyMTIx.dnBY_69oDFP8FcsQRrUEN-ndhP6LeSO9XC-1jaXATi4g._cIMEdFaQO5rIwq6R_hqSdSXM1CGmDsIl4QGDPcPvWYg.PNG.skyzzang011/2.png?type=w800",
  description:
    "오백살까지 살고싶은 말티즈는 공주님을 구하러 마법의 성으로 떠나가는데...",
  score: 4.2,
  price: 1500000,
  purchased: true,
  materialList: [
    {
      id: 1,
      name: "용기",
    },
    {
      id: 2,
      name: "빵",
    },
  ],
  myReview: {
    id: 1,
    memberId: "Okieee",
    score: 4,
    content: "정말 재밌는 체고의 동화채깁니다",
  },
  reviewList: [
    {
      id: 2,
      memberId: "calice",
      score: 3,
      content: "오와 너무 잼ㅆ어ㅛ 실화인가요?",
    },
    {
      id: 3,
      memberId: "user12",
      score: 4,
      content: "내안에 흐겸룡이 ㅇ루부짖느다",
    },
    {
      id: 4,
      memberId: "calice",
      score: 3,
      content: "오와 너무 잼ㅆ어ㅛ 실화인가요?",
    },
    {
      id: 5,
      memberId: "user12",
      score: 4,
      content: "내안에 흐겸룡이 ㅇ루부짖느다",
    },
    {
      id: 6,
      memberId: "calice",
      score: 3,
      content: "오와 너무 잼ㅆ어ㅛ 실화인가요?",
    },
    {
      id: 7,
      memberId: "user12",
      score: 4,
      content: "내안에 흐겸룡이 ㅇ루부짖느다",
    },
    {
      id: 8,
      memberId: "calice",
      score: 3,
      content: "오와 너무 잼ㅆ어ㅛ 실화인가요?",
    },
    {
      id: 9,
      memberId: "user12",
      score: 4,
      content: "내안에 흐겸룡이 ㅇ루부짖느다",
    },
  ],
}
