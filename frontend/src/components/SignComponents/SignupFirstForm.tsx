import { PropsWithChildren, RefObject, useEffect, useState } from "react"
import InputInSignup from "../UI/InputInSignup"

interface PropsSignupFirstForm {
  toggleStep: () => void
  nameRef: RefObject<HTMLInputElement>
  nameValid: boolean | null
  nameValidMessage: string
  nameChangeHandler: () => void
  nameBlurHandler: () => void
  emailRef: RefObject<HTMLInputElement>
  emailValid: boolean | null
  emailValidMessage: string
  emailChangeHandler: () => void
  emailBlurHandler: () => void
  emailCertRef: RefObject<HTMLInputElement>
  emailCertValidMessage: string
  emailCertValid: boolean | null
  emailCertChangeHandler: () => void
  emailCertClickHandler: () => void
  phoneRef: RefObject<HTMLInputElement>
  phoneValid: boolean | null
  phoneValidMessage: string
  phoneChangeHandler: () => void
  phoneBlurHandler: () => void
  phoneCertRef: RefObject<HTMLInputElement>
  phoneCertValidMessage: string
  phoneCertValid: boolean | null
  phoneCertChangeHandler: () => void
  phoneCertClickHandler: () => void
}

const SignupFirstForm = function ({
  toggleStep,
  nameRef,
  nameValid,
  nameValidMessage,
  nameChangeHandler,
  nameBlurHandler,
  emailRef,
  emailValid,
  emailValidMessage,
  emailChangeHandler,
  emailBlurHandler,
  emailCertRef,
  emailCertValidMessage,
  emailCertValid,
  emailCertChangeHandler,
  emailCertClickHandler,
  phoneRef,
  phoneValid,
  phoneValidMessage,
  phoneChangeHandler,
  phoneBlurHandler,
  phoneCertRef,
  phoneCertValidMessage,
  phoneCertValid,
  phoneCertChangeHandler,
  phoneCertClickHandler,
}: PropsWithChildren<PropsSignupFirstForm>) {
  const [lockEmailClasses, setLockEmailClasses] = useState<string>("")
  const [lockEmailTabIndex, setLockEmailTabIndex] = useState<number>(0)
  const [lockPhoneClasses, setLockPhoneClasses] = useState<string>("")
  const [lockPhoneTabIndex, setLockPhoneTabIndex] = useState<number>(0)
  useEffect(
    function () {
      if (emailCertValid) {
        setLockEmailClasses(() => `lock-down-box`)
        setLockEmailTabIndex(() => -1)
      }
    },
    [emailCertValid],
  )
  // useEffect(function() {
  //   if (phoneCertValid) {
  //     setLockPhoneClasses(() => `lock-down-box`)
  //     setLockPhoneTabIndex(() => -1)
  //   }
  // }, [phoneCertValid])

  return (
    <div>
      <br />
      <br />
      <InputInSignup
        inputRef={nameRef}
        labelText={`name`}
        inputId={`signup-name`}
        inputType={`text`}
        additionalClasses={``}
        placeHolder={`이름을 입력하세요.`}
        validMessage={nameValidMessage}
        isValid={nameValid}
        inputChange={nameChangeHandler}
        inputBlur={nameBlurHandler}
        maxLength={8}
      />
      <div>
        <div className={`flex flex-row items-center justify-center gap-4`}>
          <InputInSignup
            inputRef={emailRef}
            labelText={`email`}
            inputId={`signup-email`}
            inputType={`email`}
            additionalClasses={``}
            placeHolder={`이메일을 입력하세요.`}
            validMessage={emailValidMessage}
            isValid={emailValid}
            inputChange={emailChangeHandler}
            inputBlur={emailBlurHandler}
            maxLength={50}
          >
            <div
              className={`bg-blue-400 basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s]`}
            >
              요청
            </div>
          </InputInSignup>
        </div>
        <div>
          <InputInSignup
            inputRef={emailCertRef}
            labelText={`code`}
            inputId={`signup-email-cert`}
            inputType={`text`}
            additionalClasses={``}
            placeHolder={`인증 코드를 입력하세요.`}
            validMessage={emailCertValidMessage}
            isValid={emailCertValid}
            inputChange={emailCertChangeHandler}
            inputBlur={() => {}}
            maxLength={50}
          >
            <div
              className={`bg-blue-400 basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s]`}
              onClick={emailCertClickHandler}
            >
              인증
            </div>
          </InputInSignup>
        </div>
      </div>
      <div>
        <div>
          <InputInSignup
            inputRef={phoneRef}
            labelText={`phone`}
            inputId={`signup-phone`}
            inputType={`phone`}
            additionalClasses={``}
            placeHolder={`휴대폰 번호를 입력하세요.`}
            validMessage={phoneValidMessage}
            isValid={phoneValid}
            inputChange={phoneChangeHandler}
            inputBlur={phoneBlurHandler}
            maxLength={50}
          >
            <div
              className={`bg-blue-400 basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s]`}
            >
              요청
            </div>
          </InputInSignup>
        </div>
        <div>
          <InputInSignup
            inputRef={phoneCertRef}
            labelText={`code`}
            inputId={`signup-phone-cert`}
            inputType={`text`}
            additionalClasses={``}
            placeHolder={`인증 코드를 입력하세요.`}
            validMessage={phoneCertValidMessage}
            isValid={phoneCertValid}
            inputChange={phoneCertChangeHandler}
            inputBlur={() => {}}
            maxLength={50}
          >
            <div
              className={`bg-blue-400 basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s]`}
            >
              인증
            </div>
          </InputInSignup>
        </div>
      </div>
    </div>
  )
}

export default SignupFirstForm
