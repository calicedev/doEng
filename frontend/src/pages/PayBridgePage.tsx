import LoadingComp from "components/UI/LoadingComp"
import {
  Navigate,
  useNavigate,
  useParams,
  useSearchParams,
} from "react-router-dom"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import apiRequest from "utils/axios"
import { queryKeys } from "hooks/queries/queryKeys"
import { useEffect } from "react"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { payActions } from "store/paySlice"
import axios from "axios"
import { DispatchToast } from "store"
import LoadingPage from "./LoadingPage"

const PayBridgePage = function () {
  const queryClient = useQueryClient()
  const { isSuccess } = useParams()
  const [SearchParams] = useSearchParams()
  const pg_token = SearchParams.get(`pg_token`)
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { wannaBought, tid } = useStoreSelector((state) => state.pay)

  const { mutateAsync: purchaseMutation } = useMutation(
    function () {
      return apiRequest({
        method: `post`,
        url: `/api/mypage/purchased`,
        data: {
          taleId: wannaBought,
        },
      })
    },
    {
      onSuccess: function () {
        queryClient.invalidateQueries(queryKeys.user()) // taleId를 redux로 관리!
      },
      onError: function () {
        dispatch(payActions.resetWannaBought({}))
      },
    },
  )

  const successPayment = async function () {
    // 카카오로 보내서 tid? 를 받아오기.
    await axios({
      method: `post`,
      baseURL: `https://kapi.kakao.com`,
      url: `/v1/payment/approve`,
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_PAYMENT_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        tid: tid,
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        pg_token: pg_token,
      },
    }).then((res) => {
      console.log(res)
      purchaseMutation()
        .then((res) => {
          const a = wannaBought
          dispatch(payActions.resetWannaBought({}))
          dispatch(payActions.resetTid({}))
          dispatch(DispatchToast("구매 성공! 재밌게 즐겨주세요!", true))
          navigate(`/mypage/talestore/${a}`)
        })
        .catch((err) => {
          const a = wannaBought
          dispatch(payActions.resetWannaBought({}))
          dispatch(payActions.resetTid({}))
          dispatch(DispatchToast("구매 실패! 재시도 부탁드립니다!", false))
          navigate(`/mypage/talestore/${a}`)
        })
    })
  }

  // if (isSuccess === `fail`) {
  //   navigate(-2)
  //   // 실패하면 이전 페이지로 보내줘야 하기에, 이전 페이지 url을 갖고 있어야 할듯?
  //   return <>ㅎㅇ</>
  // }

  useEffect(
    function () {
      if (isSuccess === "success") {
        successPayment()
        // purchaseMutation().then((res) => {
        //   console.log(res)
        // })
      } else {
        const a = wannaBought
        dispatch(payActions.resetWannaBought({}))
        dispatch(payActions.resetTid({}))
        dispatch(DispatchToast("구매 실패! 재시도 부탁드립니다!", false))
        navigate(`/mypage/talestore/${a}`)
      }
    },
    [isSuccess],
  )

  return <LoadingPage loadingText="결제 진행중입니다..." />
}

export default PayBridgePage
