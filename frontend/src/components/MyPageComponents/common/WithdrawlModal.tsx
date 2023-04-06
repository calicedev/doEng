import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useState, useMemo, PropsWithChildren } from "react"
import useApi from "hooks/useApi"
import { useUserMutation } from "hooks/queries/queries"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchLogout } from "store"
import { useQueryClient } from "@tanstack/react-query"
import { queryKeys } from "hooks/queries/queryKeys"

interface Props {
  closeModal: () => void
}

const WithdrawlModal = function ({ closeModal }: PropsWithChildren<Props>) {
  const { mutateAsync: WithdrawMutate } = useUserMutation()
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const queryClient = useQueryClient()

  // 탈퇴하기

  const withdrawHandler = function () {
    WithdrawMutate({
      method: `delete`,
      url: `/api/member`,
    })
      .then((res) => {
        dispatch(DispatchLogout())
      })
      .then(() => {
        queryClient.removeQueries(queryKeys.user())
        navigate(`/`)
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
