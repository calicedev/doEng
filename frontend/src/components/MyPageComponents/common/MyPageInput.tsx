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
    | "oldPwd"
    | "newPwd"
    | "confirmNewPwd"
    | "confirmPwd"
  value?: string
  disabled?: boolean
  isValid?: boolean | null
  validMessage?: string
  onChange?: (value: string) => void
  ref?: RefObject<HTMLInputElement>
}

const MyPageInput = function ({
  type,
  value = "",
  disabled = false,
  isValid = null,
  validMessage = "",
  onChange = () => {},
  ref,
}: PropsWithChildren<Props>) {
  const label = {
    id: "아이디",
    name: "이름",
    nickname: "닉네임",
    email: "이메일",
    phone: "핸드폰 번호",
    oldPwd: "현재 비밀번호",
    newPwd: "새 비밀번호",
    confirmNewPwd: "새 비밀번호 확인",
    confirmPwd: "비밀번호 확인",
  }[type]

  const placeholder = {
    id: "아이디를 입력하세요",
    name: "이름을 입력하세요",
    nickname: "닉네임을 입력하세요",
    email: "이메일을 입력하세요",
    phone: "핸드폰 번호를 입력하세요",
    oldPwd: "현재 비밀번호를 입력하세요",
    newPwd: "새 비밀번호를 입력하세요",
    confirmNewPwd: "새 비밀번호 확인을 확인해주세요",
    confirmPwd: "비밀번호를 입력하세요",
  }[type]

  const inputType = {
    id: "text",
    name: "text",
    nickname: "text",
    email: "text",
    phone: "text",
    oldPwd: "password",
    newPwd: "password",
    confirmNewPwd: "password",
    confirmPwd: "password",
  }[type]

  const [inputValue, setInputValue] = useState(value)

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value // get the new value of the input field from the event object
    setInputValue(newValue) // update the state variable with the new value
    onChange(newValue) // call the onChange prop with the new value
  }

  return (
    <div className={`flex-1 flex flex-col gap-1`}>
      <label htmlFor={`mypage-input-${type}`} className={`text-lg font-bold`}>
        {label}
      </label>
      <input
        ref={ref}
        id={`mypage-input-${type}`}
        type={inputType}
        value={inputValue}
        placeholder={placeholder}
        disabled={disabled}
        onChange={handleInputChange}
        className={`py-1 px-2 bg-white rounded shadow-xl text-lg `}
      />
    </div>
  )
}

export default MyPageInput
