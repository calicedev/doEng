import IconButton from "components/UI/IconButton"
import React, { useState, FC, PropsWithChildren } from "react"
import StarRating from "../common/StarRating"
import InputStarRating from "../common/InputStarRating"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { BsFillPencilFill, BsFillTrash3Fill } from "react-icons/bs"
import { useNavigate, useParams } from "react-router-dom"
import { useMutation, useQuery, useQueryClient } from "react-query"
import apiRequest from "utils/axios"
import { DispatchToast } from "store"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { Review } from "hooks/queries/queries"

// interface Review {
//   id: number
//   memberId: string
//   score: number
//   content: string
// }

interface Props {
  review: Review
}

const MyReview = function ({ review }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const queryClient = useQueryClient()
  const { taleId } = useParams() as { taleId: string } // 참조: https://velog.io/@euji42/Typescript-useParams-%ED%83%80%EC%9E%85-oi26j7va
  // if (!taleId) {
  //   navigate(-1)
  //   return <div>부적절한 접근입니다.</div>
  // }

  const [isUpdating, setIsUpdating] = useState(false)
  const [score, setScore] = useState(review ? review.score : 0)
  const [content, setContent] = useState(review ? review.content : "")

  const { mutate: postReview } = useMutation(
    function () {
      return apiRequest({
        method: `post`,
        url: `/api/mypage/review/${taleId}`,
        data: {
          score,
          content,
        },
      })
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries([`tale`, parseInt(taleId)])
      },
      onError: function () {
        dispatch(DispatchToast("리뷰 작성 실패! 재시도 바랍니다.", false))
      },
    },
  )
  const { mutate: putReview } = useMutation(
    function () {
      return apiRequest({
        method: `put`,
        url: `/api/mypage/review/${taleId}`,
        data: {
          score,
          content,
        },
      })
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries([`tale`, parseInt(taleId)])
      },
      onError: function () {
        dispatch(DispatchToast("리뷰 수정 실패! 재시도 바랍니다.", false))
      },
    },
  )
  const { mutate: delReview } = useMutation(
    function () {
      return apiRequest({
        method: `delete`,
        url: `/api/mypage/review/${taleId}`,
        data: {
          score,
          content,
        },
      })
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries([`tale`, parseInt(taleId)])
      },
      onError: function () {
        dispatch(DispatchToast("리뷰 삭제 실패! 재시도 바랍니다.", false))
      },
    },
  )

  const createReview = function () {
    postReview()
  }

  const updateReview = function () {
    putReview()
  }

  const deleteReview = function () {
    delReview()
  }

  // 리뷰 수정 취소
  const cancelUpdating = () => {
    setScore(review ? review.score : 0)
    setContent(review ? review.content : "")
    setIsUpdating(false)
  }

  const containerClass = `flex flex-col gap-2`
  const innerClass = `flex justify-between gap-6 text-lg`
  const inputClass = `flex-1 rounded px-3`
  return (
    <>
      {!review ? (
        <div className={`${containerClass}`}>
          <InputStarRating size={`large`} rating={score} setRating={setScore} />
          <div className={`${innerClass}`}>
            <input value={content} type="text" className={`${inputClass}`} />
            <MyPageButton text="작성" color={`orange`} onClick={createReview} />
          </div>
        </div>
      ) : isUpdating ? (
        <div className={`${containerClass}`}>
          <InputStarRating size={`large`} rating={score} setRating={setScore} />
          <div className={`${innerClass}`}>
            <input
              value={content}
              type="text"
              className={`${inputClass}`}
              onChange={(e) => setContent(e.target.value)}
            />
            <MyPageButton text="취소" color={`gray`} onClick={cancelUpdating} />
            <MyPageButton text="수정" color={`orange`} onClick={updateReview} />
          </div>
        </div>
      ) : (
        <div className={`${containerClass}`}>
          <StarRating rating={review.score} size={`large`} />
          <div className={`${innerClass}`}>
            <p className={`flex-1`}>{review.content}</p>
            <IconButton
              icon={<BsFillPencilFill />}
              size={`small`}
              onClick={() => {
                setIsUpdating(true)
              }}
            />
            <IconButton
              icon={<BsFillTrash3Fill />}
              size={`small`}
              onClick={deleteReview}
            />
          </div>
        </div>
      )}
    </>
  )
}

export default MyReview
