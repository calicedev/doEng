import axios from "axios"
import useApi from "hooks/useApi"
import useINEP from "hooks/useINEP"
import { useInput } from "hooks/useInput"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { PropsWithChildren, useRef, useEffect, useState } from "react"
import { DispatchToast } from "store"
import { findActions } from "store/findSlice"
import { emailValidation } from "utils/validation"
import { SpinnerDots } from "./Spinner"

interface PropsInputWithCert {
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
      authURL: `/api/auth/check/phone/send`,
      certURL: `/api/auth/check/phone/confirm`,
    }
  } else if (hookType === "email") {
    return {
      labelText: "Email",
      placeholder: "이메일을 입력해주세요.",
      authURL: `/api/auth/check/email/send`,
      certURL: `/api/auth/check/email/confirm`,
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
  htmlId,
  hookType = `email`,
}: PropsWithChildren<PropsInputWithCert>) {
  const dispatch = useStoreDispatch()
  const inputRef = useRef<HTMLInputElement>(null)
  const certInputRef = useRef<HTMLInputElement>(null)
  const { inputData, isValid, validMessage, onChangeHandler, onBlurHandler } =
    useInput(inputRef, emailValidation, 50)
  const certOnChange = function () {}
  const certOnBlur = function () {}

  const { labelText, placeholder, authURL, certURL } =
    getLabelTextNPlaceHolder(hookType)
  const [bgClasses, setBgClasses] = useState<string>("bg-white")
  const [textClasses, setTextClasses] = useState<string>("text-black")
  const [borderClasses, setBorderClasses] = useState<string>(
    "border-black-500 border-[4px]",
  )
  useEffect(
    function () {
      if (isValid === null) {
        setBgClasses(() => `bg-white`)
        setTextClasses(() => `text-black`)
        setBorderClasses(() => `border-black-500 border-[4px]`)
      } else if (isValid === true) {
        setBgClasses(() => `bg-blue-200`)
        setTextClasses(() => `text-blue-900`)
        setBorderClasses(() => `border-blue-500 border-[4px]`)
      } else if (isValid === false) {
        setBgClasses(() => `bg-red-200`)
        setTextClasses(() => `text-red-900`)
        setBorderClasses(() => `border-red-500 border-[4px]`)
      }
    },
    [isValid],
  )

  useEffect(
    function () {
      const timeId = setTimeout(function () {
        dispatch(findActions.changeEmail({ emailInput: inputData }))
      }, 200)
      return function () {
        clearTimeout(timeId)
      }
    },
    [inputData, dispatch],
  )

  const { id, email, isCert } = useStoreSelector((state) => state.find)

  const [certMessage, setCertMessage] = useState<string>("")

  const [lockDownClasses, setLockDownClasses] = useState<string>("")
  useEffect(
    function () {
      if (isCert) {
        setLockDownClasses(() => `lock-down-box`)
      }
    },
    [isCert],
  )
  const {
    isLoading: authReqLoading,
    isError: authReqError,
    axiosRequest: authReqAxios,
    btnClasses: authReqBtnClasses,
  } = useApi()
  const {
    isLoading: certLoading,
    isError: certError,
    axiosRequest: certReqAxios,
    btnClasses: certBtnClasses,
  } = useApi()

  const onAuthReqHandler = function () {
    authReqAxios(
      {
        method: `post`,
        baseURL: `https://j8a601.p.ssafy.io`,
        url: `${authURL}`,
        data: {
          memberId: `${id}`,
          email: `${inputData}`,
        },
      },
      function () {
        dispatch(DispatchToast("인증 번호가 이메일로 발송되었습니다.", true))
      },
      "ID와 Email이 일치하지 않습니다!",
    )
  }
  const onCertHandler = function () {
    certReqAxios(
      {
        method: `post`,
        url: `${certURL}`,
        data: {
          email: `${email}`,
          confirmCode: `${certInputRef.current?.value}`,
        },
      },
      function () {
        setCertMessage("인증 성공!")
        dispatch(DispatchToast("인증에 성공하셨습니다!", true))
        dispatch(findActions.certSuccess({}))
      },
      "인증 실패!",
    )
  }

  return (
    <div className={`${lockDownClasses}`}>
      <div
        className={`box-border flex rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-3 items-center shadow-xl duration-[0.44s] gap-2 ${bgClasses} ${borderClasses}`}
      >
        <label
          htmlFor={`find-origin-${htmlId}`}
          className={`box-border h-full w-full flex items-center justify-center basis-1/5 font-semibold text-xl sm:text-3xl mobile:text-2xl font-hopang-white`}
        >
          {labelText}
        </label>
        <input
          ref={inputRef}
          id={`find-origin-${htmlId}`}
          type={`text`}
          onChange={onChangeHandler}
          onBlur={onBlurHandler}
          placeholder={placeholder}
          className={`box-border w-full h-full flex items-center basis-[60%] text-sm sm:text-xl mobile:text-lg px-3 rounded-[8px] font-jalnan duration-[0.44s] ${bgClasses}`}
          maxLength={50}
        />
        <div
          className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${authReqBtnClasses}`}
          onClick={onAuthReqHandler}
        >
          {authReqLoading ? <SpinnerDots /> : authReqError ? "에러!" : "요청"}
        </div>
      </div>
      <div
        className={`box-border min-h-[20px] max-h-[40px] min-w-[288px] h-[5vh] max-w-[480px] w-[40vw] px-4 pt-2 items-center text-lg sm:text-[1rem] mobile:text-sm duration-[0.44s] font-dolbom-regular ${textClasses}`}
      >
        {validMessage}
      </div>
      <div
        className={`box-border flex rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-3 items-center shadow-xl duration-[0.44s] gap-2 ${
          isCert
            ? `bg-blue-200 text-blue-900 border-blue-500 border-[4px]`
            : `bg-white border-black-500 border-[4px] text-black`
        }`}
      >
        <label
          htmlFor={`find-cert-${htmlId}`}
          className={`box-border h-full w-full flex items-center justify-center basis-1/5 font-semibold text-xl sm:text-3xl mobile:text-2xl font-hopang-white`}
        >
          Code
        </label>
        <input
          ref={certInputRef}
          id={`find-cert-${htmlId}`}
          type={`text`}
          onChange={certOnChange}
          onBlur={certOnBlur}
          placeholder={`인증 번호를 입력해주세요.`}
          className={`box-border w-full h-full flex items-center basis-[60%] text-sm sm:text-xl mobile:text-lg px-3 rounded-[8px] font-jalnan duration-[0.44s] ${
            isCert ? `bg-blue-200` : `bg-white`
          }`}
          maxLength={10}
        />
        <div
          className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${certBtnClasses}`}
          onClick={onCertHandler}
        >
          {certLoading ? <SpinnerDots /> : certError ? "에러!" : "인증"}
        </div>
      </div>
      <div
        className={`box-border min-h-[20px] max-h-[40px] min-w-[288px] h-[5vh] max-w-[480px] w-[40vw] px-4 pt-2 items-center text-lg sm:text-[1rem] mobile:text-sm duration-[0.44s] font-dolbom-regular ${
          isCert ? "text-blue-900" : "text-black"
        }`}
      >
        {certMessage}
      </div>
    </div>
  )
}
export default InputWithCert
