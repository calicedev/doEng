import { RefObject, useEffect, useState } from "react"
/* eslint-disable */
// hook의 타입

type inputHook = (
  ref: RefObject<HTMLInputElement | null>,
  validation: (inputData: string) => { status: boolean; message: string }
) => {
  inputData: string
  isValid: boolean | null
  validMessage: string
  onChangeHandler: () => void
  setFirstData: (data: string) => void
  onResetHandler: () => void
  onBlurHandler: () => void
}

// 기본 콜백 함수 설정을 모르겠어서 선언해서 쓰는 것임.
const initialFunc = function (inputData: string = "필요 없음") {
  return {
    status: true,
    message: "validation이 필요 없습니다.",
  }
}
/*
input 태그에 ref를 달아서 해당 ref를 넣어주고, validation 함수를 받아야 한다.
*/
export const useInput: inputHook = function (ref, validation = initialFunc) {
  const [inputData, setInputData] = useState<string>("")
  const [onTouched, setOnTouched] = useState<boolean>(false)
  const [isValid, setIsValid] = useState<boolean>(false)
  const [validMessage, setValidMessage] = useState<string>("")

  // Touched 고려한 validation
  useEffect(
    function () {
      const { status, message } = validation(inputData)
      if (status === true) {
        setIsValid(() => true)
        setValidMessage(() => message)
        setOnTouched(() => true)
        return
      } else if (onTouched === true) {
        setIsValid(() => status)
        setValidMessage(() => message)
      }
    },
    [inputData, onTouched, validation]
  )

  // onChange시 실행 할 함수.
  const onChangeHandler: () => void = function () {
    setInputData(() => (ref.current ? ref.current.value : ""))
    setIsValid(() => validation(ref.current ? ref.current.value : "").status)
  }

  // 초기값 설정 필요 시
  const setFirstData: (firstValue: string) => void = function (firstValue) {
    setInputData(() => firstValue)
    if (ref.current) {
      ref.current.value = firstValue
    }
  }

  // 인풋값 리셋하기.
  const onResetHandler: () => void = function () {
    setInputData(() => "")
    if (ref.current) {
      ref.current.value = ""
    }
  }

  // 블러 시
  const onBlurHandler: () => void = function () {
    setOnTouched(() => true)
  }

  return {
    inputData,
    isValid,
    validMessage,
    onChangeHandler,
    setFirstData,
    onResetHandler,
    onBlurHandler,
  }
}
