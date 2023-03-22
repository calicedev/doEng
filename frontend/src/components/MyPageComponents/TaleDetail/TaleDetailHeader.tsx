import axios, { AxiosProxyConfig } from "axios"
import React, { FC, PropsWithChildren, MouseEvent, ReactNode } from "react"
import { useNavigate } from "react-router-dom"
import MyPageButton from "../common/MyPageButton"
import StarRating from "../common/StarRating"

interface Props {
  backgroundImage: string
  title: string
  score: number
  purchased: boolean
}

const TaleDetailHeader: FC<PropsWithChildren<Props>> = function ({
  backgroundImage,
  title,
  score,
  purchased,
}) {
  const navigate = useNavigate()
  const tryPayment = function (event: MouseEvent<HTMLButtonElement>) {
    event.preventDefault()
    const config = {
      next_redirect_pc_url: "",
      tid: "",
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "안녕하세요",
        quantity: 1,
        total_amount: 100,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000",
        fail_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
      },
    }
    const { params } = config
    const proxy: AxiosProxyConfig = {
      protocol: `https`,
      host: `kapi.kakao.com`,
      port: 3000,
    }
    axios({
      method: `post`,
      baseURL: `https://kapi.kakao.com`,
      url: `/v1/payment/ready`,
      headers: {
        Authorization: `KakaoAK 카카오데브어드민키`,
        "Content-Type": "application/x-www-form-urlencoded;charset=utf-8",
      },
      params: {
        cid: "TC0ONETIME",
        partner_order_id: "partner_order_id",
        partner_user_id: "partner_user_id",
        item_name: "안녕하세요",
        quantity: 1,
        total_amount: 100,
        tax_free_amount: 0,
        approval_url: "http://localhost:3000",
        fail_url: "http://localhost:3000",
        cancel_url: "http://localhost:3000",
      },
      // proxy: {
      //   protocol: `https`,
      //   host: `kapi.kakao.com`,
      //   port: `3000`,
      //   Authorization: `KakaoAK 038e4946f1e5296665d45fcd47efb181`,
      // }
    }).then((res) => {
      console.log(res)
      window.location.href = `${res.data.next_redirect_pc_url}`
      // navigate(`${res.data.next_redirect_pc_url}`)
    })
  }
  return (
    <div
      className={`flex flex-col items-center gap-4 min-w-[250px] w-[80%] sm:w-[27%]`}
    >
      <div
        className={`overflow-hidden relative w-[80%] rounded drop-shadow-md`}
        style={{ paddingBottom: "110%" }}
      >
        <img
          src={backgroundImage}
          alt={title}
          className={`absolute top-0 left-0 w-full h-full object-cover`}
        />
      </div>
      <p className={`font-bold text-2xl text-center`}>{title}</p>
      <div className={`flex gap-2 text-xl items-center`}>
        <StarRating rating={score} size="medium" /> {score}
      </div>
      {!purchased ? (
        <MyPageButton disabled={true} text="구매완료" />
      ) : (
        <MyPageButton disabled={false} text="구매하기" onClick={tryPayment} />
      )}
    </div>
  )
}

export default TaleDetailHeader
