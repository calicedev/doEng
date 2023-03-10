import MyReview from "components/MyPageComponents/TaleDetail/MyReview"
import ReviewList from "components/MyPageComponents/TaleDetail/ReviewList"
import TaleDetailHeader from "components/MyPageComponents/TaleDetail/TaleDetailHeader"
import Modal from "components/UI/Modal"
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

const TaleDetailPage = function () {
  const [taleDetail, setTaleDetail] = useState(exData)

  const { taleId } = useParams()

  // 마운트 시 책 디테일 정보 받아오기
  useEffect(() => {
    axios({ url: `/api/mypage/tale-list/${taleId}`, method: "get" })
      .then((res) => {
        setTaleDetail(res.data)
      })
      .catch((err) => {
        alert(err.response.msg)
      })
  }, [])

  // 준비물 객체 리스트 "준비물1, 준비물2, 준비물3" 문자열
  const materialList = useMemo(() => {
    return taleDetail.materialList
      .reduce((acc, cur) => acc + ", " + cur.name, "")
      .slice(1)
  }, [taleDetail.materialList])

  // 내 리뷰와 리뷰 리스트를 업데이트 하는 함수
  const setReviews = (myReview: Review, reviewList: Array<Review>) => {
    const newTaleDetail = { ...taleDetail }
    newTaleDetail.myReview = myReview
    newTaleDetail.reviewList = reviewList
  }

  return (
    <div className="flex gap-10">
      <TaleDetailHeader
        backgroundImage={taleDetail.backgroundImage}
        title={taleDetail.title}
        score={taleDetail.score}
        purchased={taleDetail.purchased}
      />
      <div className="flex flex-col gap-5">
        <TitleContent title={`줄거리`}>{taleDetail.description}</TitleContent>
        <TitleContent title={`준비물`}>{materialList}</TitleContent>
        {taleDetail.purchased && (
          <TitleContent title={`내 리뷰`}>
            <MyReview review={taleDetail.myReview} setReviews={setReviews} />
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
    <div className="flex flex-col">
      <div>{title}</div>
      {children}
    </div>
  )
}

export default TaleDetailPage

const exData = {
  id: 1,
  title: "기여운 강아지",
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
  ],
}
