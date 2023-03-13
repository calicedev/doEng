import axios from "axios"
import useApi from "hooks/useApi"
import useINEP from "hooks/useINEP"
import { useInput } from "hooks/useInput"
import { PropsWithChildren, useRef, useEffect } from "react"
import { emailValidation } from "utils/validation"
import { SpinnerDots } from "./Spinner"

interface PropsInputWithCert {
  certHandler: (isSuccess: boolean) => void
  htmlId: string
  hookType: string
}

interface ReturnLabelText {
  labelText: string
  placeholder: string
  authURL: string
  certURL: string
}

const getLabelTextNPlaceHolder = function (hookType: string): ReturnLabelText {
  if (hookType === "phone") {
    return {
      labelText: "Phone",
      placeholder: "핸드폰 번호를 입력해주세요.",
      authURL: `/api/check/phone/`,
      certURL: `/api/member/check/phonecode`,
    }
  } else if (hookType === "email") {
    return {
      labelText: "Email",
      placeholder: "이메일을 입력해주세요.",
      authURL: `/api/check/email/`,
      certURL: `/api/member/check/emailcode`,
    }
  } else {
    return {
      labelText: "뭔가 잘못 되었습니다.",
      placeholder: "새로고침 해주세요.",
      authURL: ``,
      certURL: ``,
    }
  }
}

const InputWithCert = function ({
  certHandler,
  htmlId,
  hookType,
}: PropsWithChildren<PropsInputWithCert>) {
  const inputRef = useRef<HTMLInputElement>(null)
  const { inputData, isValid, validMessage, onChangeHandler, onBlurHandler } =
    useInput(inputRef, emailValidation, 50)

  const { isLoading, isError, axiosRequest, btnClasses } = useApi()
  const { labelText, placeholder, authURL, certURL } =
    getLabelTextNPlaceHolder(hookType)

  useEffect(
    function () {
      if (isValid) {
        console.log("클래스 변환 해줘야함")
      } else {
        console.log("클래스 변환 해줘야함")
      }
    },
    [isValid],
  )

  const onAuthReqHandler = function () {
    // 그냥 useApi 써서 Toast Dispatch 해주면 될 듯.
  }
  const onCertHandler = function () {
    // 여기서는 axios 요청도 넣어서 성공하면 certHandler(true) 해주고
    // lock-down-box 넣어주면 될 듯.
  }

  return (
    <>
      <div>
        <label htmlFor={`find-origin-${htmlId}`}>{labelText}</label>
        <input
          ref={inputRef}
          id={`find-origin-${htmlId}`}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder={placeholder}
        />
        <div>{isLoading ? <SpinnerDots /> : isError ? "에러!" : "요청"}</div>
      </div>
      <div>{validMessage}</div>
      <div>
        <label htmlFor={`find-cert-${htmlId}`}></label>
        <input
          ref={inputRef}
          id={`find-cert-${htmlId}`}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
        />
        <div>{isLoading ? <SpinnerDots /> : isError ? "에러!" : "인증"}</div>
      </div>
    </>
  )
}
export default InputWithCert
