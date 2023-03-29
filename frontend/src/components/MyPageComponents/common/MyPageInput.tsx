import React, {
  FC,
  PropsWithChildren,
  MouseEvent,
  useState,
  RefObject,
} from "react"

interface Props {
  type:
    | "id"
    | "name"
    | "nickname"
    | "email"
    | "phone"
    | "originalPwd"
    | "newPwd"
    | "confirmPwd"
  disabled?: boolean
  isValid?: boolean | null
  validMessage?: string
  onChange?: () => void
  inputRef?: RefObject<HTMLInputElement>
}

const MyPageInput = function ({
  type,
  disabled = false,
  isValid = null,
  validMessage = "",
  onChange = () => {},
  inputRef,
}: PropsWithChildren<Props>) {
  const label = {
    id: "아이디",
    name: "이름",
    nickname: "닉네임",
    email: "이메일",
    phone: "핸드폰 번호",
    originalPwd: "현재 비밀번호",
    newPwd: "새 비밀번호",
    confirmPwd: "새 비밀번호 확인",
  }[type]

  const placeholder = {
    id: "아이디를 입력하세요",
    name: "이름을 입력하세요",
    nickname: "닉네임을 입력하세요",
    email: "이메일을 입력하세요",
    phone: "핸드폰 번호를 입력하세요",
    originalPwd: "현재 비밀번호를 입력하세요",
    newPwd: "새 비밀번호를 입력하세요",
    confirmPwd: "새 비밀번호 확인을 확인해주세요",
  }[type]

  const inputType = {
    id: "text",
    name: "text",
    nickname: "text",
    email: "text",
    phone: "text",
    originalPwd: "password",
    newPwd: "password",
    confirmPwd: "password",
  }[type]

  return (
    <div className={`flex-1 flex flex-col gap-3`}>
      <label
        htmlFor={`mypage-input-${type}`}
        className={`text-lg font-bold font-jalnan text-[33px]`}
      >
        {label}
      </label>
      <input
        ref={inputRef}
        id={`mypage-input-${type}`}
        type={inputType}
        placeholder={placeholder}
        disabled={disabled}
        onChange={onChange}
        className={`py-3 px-5 bg-white rounded-full shadow-xl text-lg text-[22px]`}
      />
    </div>
  )
}

export default MyPageInput
