import dummy from "components/MyPageComponents/DummyData/Profile.json"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate } from "react-router-dom"
import React, { useState } from "react"
import Modal from "components/UI/Modal"
import MyPageInput from "../common/MyPageInput"
import { useSelector } from "react-redux"
import { useUserQuery } from "hooks/queries/user"

interface userData {
  id: number
  memberId: string
  email: string
  nickname: string
  name: string
  phone: string
  createdAt: string
}

function Profile() {
  // const user = useSelector((state) => state.user)

  const {
    isLoading: queryLoading,
    error: queryError,
    data: queryData,
  } = useUserQuery()

  const user = queryData

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <MyPageInput type="name" value={user?.name || ""} />
        <MyPageInput type="nickname" value={user?.nickname || ""} />
      </div>
      <MyPageInput type="id" value={user?.memberId || ""} />
      <MyPageInput type="email" value={user?.email || ""} />
      <MyPageInput type="phone" value={user?.phone || ""} />
    </div>
  )
}

export default Profile

const exData = {
  id: 1,
  memberId: "doeng1",
  email: "abcd@gmail.com",
  nickname: "두잉",
  name: "홍길동",
  phone: "010-8832-2029",
  createdAt: "2017-09-11",
}
