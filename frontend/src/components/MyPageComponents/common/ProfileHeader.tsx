import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useNavigate, useLocation } from "react-router-dom"
import React, { useState, useMemo, PropsWithChildren } from "react"
import Modal from "components/UI/Modal"
import WithdrawlModal from "./WithdrawlModal"
import AnimationBox from "components/UI/AnimationBox"

interface Props {
  path: "profile" | "edit" | "password"
}

const Profile = function ({ path }: PropsWithChildren<Props>) {
  const navigate = useNavigate()
  const [isModal, setIsModal] = useState(false)

  const toProfile = () => {
    navigate("/mypage/profile")
  }

  const toProfileEdit = () => {
    navigate("/mypage/profile/edit")
  }

  const toProfilePwdEdit = () => {
    navigate("/mypage/profile/password")
  }

  const title = {
    profile: "회원 정보",
    edit: "회원 정보 수정",
    password: "비밀번호 수정",
  }[path]

  const buttons = {
    profile: (
      <>
        <MyPageButton
          text="탈퇴"
          color="red"
          onClick={() => setIsModal(true)}
        />
        <MyPageButton text="수정" onClick={toProfileEdit} />
      </>
    ),
    edit: (
      <>
        <MyPageButton text="취소" color="gray" onClick={toProfile} />
        <MyPageButton text="비밀번호 수정" onClick={toProfilePwdEdit} />
      </>
    ),
    password: (
      <>
        <MyPageButton text="취소" color="gray" onClick={toProfile} />
        <MyPageButton text="회원 정보 수정" onClick={toProfileEdit} />
      </>
    ),
  }[path]

  return (
    <>
      {isModal && (
        <Modal closeModal={() => setIsModal(false)}>
          <WithdrawlModal closeModal={() => setIsModal(false)} />
        </Modal>
      )}
      <AnimationBox appearClassName="animate-appear-from-top-fast">
        <div className="flex flex-col gap-4">
          <div className="flex flex-col sm:flex-row justify-between items-center gap-5 sm:gap-0 mx-3">
            <h1 className="text-3xl font-bold">{title}</h1>
            <div className="flex gap-5">{buttons}</div>
          </div>
          <div className="w-full h-2 bg-orange-600 rounded-xl" />
        </div>
      </AnimationBox>
    </>
  )
}

export default Profile
