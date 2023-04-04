import axios, { AxiosProxyConfig } from "axios"
import { useStoreTaleDetail } from "hooks/queries/queries"
import React, { FC, PropsWithChildren, MouseEvent, ReactNode } from "react"
import { useQuery } from "@tanstack/react-query"
import { useNavigate, useParams } from "react-router-dom"
import apiRequest from "utils/axios"
import MyPageButton from "../common/MyPageButton"
import StarRating from "../common/StarRating"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { payActions } from "store/paySlice"

interface Props {}

const TaleDetailHeader: FC<PropsWithChildren<Props>> = function ({}) {
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()
  const { taleId } = useParams() as { taleId: string }
  const {
    isLoading: taleLoading,
    error: taleError,
    data: taleDetail,
  } = useStoreTaleDetail(parseInt(taleId))

  const tryPayment = function (event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    dispatch(payActions.setWannaBought({ taleId: parseInt(taleId) }))

    const config = {
      next_redirect_pc_url: "",
      tid: "",
    }

    axios({
      method: `post`,
      baseURL: `https://kapi.kakao.com`,
      url: `/v1/payment/ready`,
      headers: {
        Authorization: `KakaoAK ${process.env.REACT_APP_PAYMENT_KEY}`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "안녕하세요",
        quantity: 1,
        total_amount: taleDetail?.price || 1000000,
        tax_free_amount: 0,
        approval_url: `https://j8a601.p.ssafy.io/pay/success`,
        fail_url: `https://j8a601.p.ssafy.io/pay/fail`,
        cancel_url: `https://j8a601.p.ssafy.io/pay/fail`,
      },
    }).then((res) => {
      console.log(res.data.tid)
      dispatch(payActions.setTid({ tid: res.data.tid }))
      window.location.href = `${res.data.next_redirect_pc_url}`
    })
  }

  return (
    <div
      className={`self-center flex flex-col items-center gap-4 min-w-[250px] w-[80%] sm:w-[27%]`}
    >
      <div
        className={`overflow-hidden relative w-[80%] pb-[110%] rounded bg-white shadow-lg`}
      >
        <img
          src={taleDetail?.backgroundImage}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <p className={`font-bold text-3xl text-center`}>{taleDetail?.title}</p>
      <div className={`flex gap-2 text-xl items-center`}>
        <StarRating rating={taleDetail?.score!} size="medium" />{" "}
        {taleDetail?.score}
      </div>
      {taleDetail?.purchased ? (
        <MyPageButton disabled={true} text="구매완료" />
      ) : (
        <MyPageButton disabled={false} text="구매하기" onClick={tryPayment} />
      )}
    </div>
  )
}

export default TaleDetailHeader
