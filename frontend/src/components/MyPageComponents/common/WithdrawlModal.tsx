import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useState, useMemo, PropsWithChildren } from "react"
import useApi from "hooks/useApi"
import { useUserMutation } from "hooks/queries/queries"

interface Props {
  closeModal: () => void
}

const WithdrawlModal = function ({ closeModal }: PropsWithChildren<Props>) {
  const { mutate: WithdrawMutate } = useUserMutation()

  // 탈퇴하기

  const withdrawHandler = function () {
    WithdrawMutate({
      method: `delete`,
      url: `/api/member`,
    })
  }

  return (
    <div className="flex flex-col gap-10 px-14 py-10 rounded-lg bg-yellow-50">
      <p className="text-xl font-bold">탈퇴 하시겠습니까?</p>
      <div className="flex justify-between gap-5">
        <MyPageButton text="탈퇴" color="red" onClick={withdrawHandler} />
        <MyPageButton text="취소" onClick={closeModal} />
      </div>
    </div>
  )
}

export default WithdrawlModal
