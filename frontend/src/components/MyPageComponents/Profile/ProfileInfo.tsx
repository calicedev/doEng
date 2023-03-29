import dummy from "components/MyPageComponents/DummyData/Profile.json"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import React, { useState, useRef, useEffect } from "react"
import Modal from "components/UI/Modal"
import MyPageInput from "../common/MyPageInput"
import { useSelector } from "react-redux"
import { useUserData } from "hooks/queries/queries"
import { useInput } from "hooks/useInput"
import CommonLoading from "components/UI/CommonLoading"
import LoadingPage from "pages/LoadingPage"

function ProfileInfo() {
  // const user = useSelector((state) => state.user)
  const [nameRef, nickRef, idRef, emailRef, phoneRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const { setFirstData: idFirstData } = useInput(idRef)
  const { setFirstData: nameFirstData } = useInput(nameRef)
  const { setFirstData: nickFirstData } = useInput(nickRef)
  const { setFirstData: emailFirstData } = useInput(emailRef)
  const { setFirstData: phoneFirstData } = useInput(phoneRef)

  const { isLoading: userLoading, error: userError, data: user } = useUserData()

  useEffect(
    function () {
      idFirstData(user?.memberId || "")
      nameFirstData(user?.name || "")
      nickFirstData(user?.nickname || "")
      emailFirstData(user?.email || "")
      phoneFirstData(user?.phone || "")
    },
    [user?.name, user?.nickname, user?.memberId, user?.email, user?.phone],
  )
  if (userLoading) {
    return (
      <LoadingPage>
        <div className="text-[44px]">로딩중...</div>
      </LoadingPage>
    )
  }

  return (
    <div className="flex flex-col p-10 h-full justify-center">
      <div className="flex gap-10 flex-1">
        <MyPageInput type="name" inputRef={nameRef} disabled={true} />
        <MyPageInput type="nickname" inputRef={nickRef} disabled={true} />
      </div>
      <MyPageInput type="id" inputRef={idRef} disabled={true} />
      <MyPageInput type="email" inputRef={emailRef} disabled={true} />
      <MyPageInput type="phone" inputRef={phoneRef} disabled={true} />
    </div>
  )
}

export default ProfileInfo
