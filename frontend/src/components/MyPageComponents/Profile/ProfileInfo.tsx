import dummy from "components/MyPageComponents/DummyData/Profile.json"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import React, { useState, useRef, useEffect } from "react"
import Modal from "components/UI/Modal"
import MyPageInput from "../common/MyPageInput"
import { useSelector } from "react-redux"
import { useUserData } from "hooks/queries/queries"
import { useInput } from "hooks/useInput"

interface userData {
  id: number
  memberId: string
  email: string
  nickname: string
  name: string
  phone: string
  createdAt: string
}

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

  const {
    isLoading: queryLoading,
    error: queryError,
    data: user,
  } = useUserData()

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

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
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

const exData = {
  id: 1,
  memberId: "doeng1",
  email: "abcd@gmail.com",
  nickname: "두잉",
  name: "홍길동",
  phone: "010-8832-2029",
  createdAt: "2017-09-11",
}
