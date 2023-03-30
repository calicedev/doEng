import InputWithValidation from "components/UI/InputWithValidation"
import { useUserData } from "hooks/queries/queries"
import { useInput } from "hooks/useInput"
import { useWidthHeight } from "hooks/useWidthHwight"
import ErrorPage from "pages/ErrorPage"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import {
  emailValidation,
  idValidation,
  nicknameValidation,
} from "utils/validation"

const GoogleAdditionalInput = function () {
  const navigate = useNavigate()

  const [idInputRef, emailInputRef, nickInputRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const {
    onBlurHandler: idBlur,
    onChangeHandler: idChange,
    inputData: idInput,
    validMessage: idValidMessage,
    isValid: idValid,
  } = useInput(idInputRef, idValidation)
  const {
    onBlurHandler: emailBlur,
    onChangeHandler: emailChange,
    inputData: emailInput,
    validMessage: emailValidMessage,
    isValid: emailValid,
  } = useInput(emailInputRef, emailValidation)
  const {
    onBlurHandler: nickBlur,
    onChangeHandler: nickChange,
    inputData: nickInput,
    validMessage: nickValidMessage,
    isValid: nickValid,
  } = useInput(nickInputRef, nicknameValidation)
  // const {} = useInput(nickInputRef)

  // if (isError) {
  //   return <ErrorPage />
  // }

  const loginHandler = function (e: FormEvent) {
    e.preventDefault()
  }

  const [loginBtnClasses, setLoginBtnClasses] = useState<string>(
    "bg-lime-400 text-green-900 border-lime-600",
  )
  return (
    <form
      className="h-[100%] w-[50%] flex items-center justify-center flex-col"
      onSubmit={loginHandler}
    >
      <InputWithValidation
        inputRef={idInputRef}
        labelText={`ID`}
        inputId={`google-id`}
        inputType={`text`}
        placeHolder={`아이디를 입력해주세요.`}
        validMessage={idValidMessage}
        isValid={idValid}
        inputChange={idChange}
        inputBlur={idBlur}
        maxLength={16}
      />
      <InputWithValidation
        inputRef={emailInputRef}
        labelText={`E-mail`}
        inputId={`google-email`}
        inputType={`email`}
        placeHolder={`이메일을 입력해주세요.`}
        validMessage={emailValidMessage}
        isValid={emailValid}
        inputChange={emailChange}
        inputBlur={emailBlur}
        maxLength={50}
      />
      <InputWithValidation
        inputRef={nickInputRef}
        labelText={`Nick`}
        inputId={`google-nick`}
        inputType={`text`}
        placeHolder={`닉네임을 입력해주세요.`}
        validMessage={nickValidMessage}
        isValid={nickValid}
        inputChange={nickChange}
        inputBlur={nickBlur}
        maxLength={16}
      />

      <button
        className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] ${loginBtnClasses}`}
      >
        하이요
      </button>
    </form>
  )
}

export default GoogleAdditionalInput
