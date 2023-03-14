import { AxiosResponse } from "axios"
import { SpinnerDots } from "components/UI/Spinner"
import useApi from "hooks/useApi"
import useINEP from "hooks/useINEP"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { PropsWithChildren, RefObject, useEffect, useState } from "react"
import { DispatchToast } from "store"
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
  emailCertClickHandler: (op: boolean) => void
  phoneRef: RefObject<HTMLInputElement>
  phoneValid: boolean | null
  phoneValidMessage: string
  phoneChangeHandler: () => void
  phoneBlurHandler: () => void
  phoneCertRef: RefObject<HTMLInputElement>
  phoneCertValidMessage: string
  phoneCertValid: boolean | null
  phoneCertChangeHandler: () => void
  phoneCertClickHandler: (op: boolean) => void
  emailDupValid: boolean | null
  phoneDupValid: boolean | null
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
  emailDupValid,
  phoneDupValid,
}: PropsWithChildren<PropsSignupFirstForm>) {
  const dispatch = useStoreDispatch()
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
  useEffect(
    function () {
      if (phoneCertValid) {
        setLockPhoneClasses(() => `lock-down-box`)
        setLockPhoneTabIndex(() => -1)
      }
    },
    [phoneCertValid],
  )

  const {
    isLoading: emailRequestLoaing,
    isError: emailRequestError,
    axiosRequest: EmailRequest,
    btnClasses: emailClasses,
  } = useApi()
  const {
    isLoading: emailCertRequestLoaing,
    isError: emailCertRequestError,
    axiosRequest: EmailCertRequest,
    btnClasses: emailCertClasses,
  } = useApi()
  const {
    isLoading: phoneRequestLoaing,
    isError: phoneRequestError,
    axiosRequest: PhoneRequest,
    btnClasses: phoneClasses,
  } = useApi()
  const {
    isLoading: phoneCertRequestLoaing,
    isError: phoneCertRequestError,
    axiosRequest: PhoneCertRequest,
    btnClasses: phoneCertClasses,
  } = useApi()

  const emailReqHandler = function () {
    if (!emailValid || emailRef.current?.value.trim().length === 0) {
      dispatch(DispatchToast("이메일이 유효하지 않습니다.", false))
      return
    } else if (emailDupValid === null) {
      dispatch(
        DispatchToast(
          "이메일 중복 확인 중입니다. 잠시 후 재시도 바랍니다.",
          false,
        ),
      )
      return
    } else if (emailDupValid === false) {
      dispatch(
        DispatchToast("이메일이 중복 되었습니다. 재시도 바랍니다.", false),
      )
      return
    }
    EmailRequest(
      {
        method: `post`,
        url: ``,
        data: {
          email: emailRef.current?.value,
        },
      },
      function (res: AxiosResponse) {
        dispatch(
          DispatchToast("인증 메일을 보냈습니다! 이메일 확인 바랍니다.", true),
        )
      },
      "요청이 비정상 작동했습니다. 재시도 바랍니다.",
    )
  }
  const emailCertHandler = function () {
    if (!emailValid || emailRef.current?.value.trim().length === 0) {
      dispatch(DispatchToast("이메일이 유효하지 않습니다.", false))
      return
    } else if (emailDupValid === null) {
      dispatch(DispatchToast("이메일 중복 검사 중입니다.", false))
      return
    } else if (emailDupValid === false) {
      dispatch(DispatchToast("이메일이 중복되었습니다.", false))
      return
    }
    EmailCertRequest(
      {
        method: `post`,
        url: ``,
        data: {
          confirmCode: emailCertRef.current?.value,
        },
      },
      function () {
        emailCertClickHandler(true)
        dispatch(DispatchToast("이메일 인증 성공!", true))
        console.log("lock the email")
      },
      "요청이 비정상 작동했습니다. 재시도 바랍니다.",
    )
  }
  const phoneReqHandler = function () {
    if (!phoneValid || phoneRef.current?.value.trim().length === 0) {
      dispatch(DispatchToast("휴대폰 번호가 유효하지 않습니다.", false))
      return
    } else if (phoneDupValid === null) {
      dispatch(
        DispatchToast(
          "휴대폰 번호 중복 확인 중입니다. 잠시 후 재시도 바랍니다.",
          false,
        ),
      )
      return
    } else if (!phoneDupValid) {
      dispatch(
        DispatchToast(
          "휴대폰 번호가 중복되었습니다. 변경 후에 시도해주세요.",
          false,
        ),
      )
      return
    }
    PhoneRequest(
      {
        method: `post`,
        url: ``,
        data: {
          phone: phoneRef.current?.value,
        },
      },
      function (res: AxiosResponse) {
        dispatch(DispatchToast("휴대폰으로 인증 문자가 발송되었습니다.", true))
      },
      "요청이 비정상 작동했습니다. 재시도 바랍니다.",
    )
  }
  const phoneCertHandler = function () {
    if (!phoneValid || phoneRef.current?.value.trim().length === 0) {
      dispatch(DispatchToast("휴대폰 번호가 유효하지 않습니다.", false))
      return
    } else if (phoneDupValid === null) {
      dispatch(
        DispatchToast(
          "휴대폰 번호 중복 확인 중입니다. 잠시 후 재시도 바랍니다.",
          false,
        ),
      )
      return
    } else if (!phoneDupValid) {
      dispatch(
        DispatchToast(
          "휴대폰 번호가 중복되었습니다. 변경 후에 시도해주세요.",
          false,
        ),
      )
      return
    }
    PhoneCertRequest(
      {
        method: `post`,
        url: ``,
        data: {
          confirmCode: phoneCertRef.current?.value,
        },
      },
      function () {
        phoneCertClickHandler(true)
        dispatch(DispatchToast("휴대폰 인증 성공!", true))
        console.log("폰 인증 성공 시 해줄 작업. lock해줘야 한다.")
      },
      "요청이 비정상 작동했습니다. 재시도 바랍니다.",
    )
  }

  useEffect(
    function () {
      if (emailCertRequestError) {
        emailCertClickHandler(false)
      }
    },
    [emailCertRequestError, emailCertClickHandler],
  )
  useEffect(
    function () {
      if (phoneCertRequestError) {
        phoneCertClickHandler(false)
      }
    },
    [phoneCertRequestError, phoneCertClickHandler],
  )

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
      <div className={`${lockEmailClasses}`} tabIndex={lockEmailTabIndex}>
        <div className={`flex flex-row items-center justify-center gap-4`}>
          <InputInSignup
            inputRef={emailRef}
            labelText={`email`}
            inputId={`signup-email`}
            inputType={`email`}
            additionalClasses={`${lockEmailClasses} ${lockEmailTabIndex}`}
            placeHolder={`이메일을 입력하세요.`}
            validMessage={emailValidMessage}
            isValid={emailValid}
            inputChange={emailChangeHandler}
            inputBlur={emailBlurHandler}
            maxLength={50}
            tabIndex={lockEmailTabIndex}
          >
            <div
              className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${emailClasses}`}
              onClick={emailReqHandler}
            >
              {emailCertValid ? (
                `완료`
              ) : emailRequestLoaing ? (
                <SpinnerDots />
              ) : emailRequestError ? (
                "에러"
              ) : (
                "요청"
              )}
            </div>
          </InputInSignup>
        </div>
        <div className={`${lockEmailClasses}`} tabIndex={lockEmailTabIndex}>
          <InputInSignup
            inputRef={emailCertRef}
            labelText={`code`}
            inputId={`signup-email-cert`}
            inputType={`text`}
            additionalClasses={`${lockEmailClasses} ${lockEmailTabIndex}`}
            placeHolder={`인증 코드를 입력하세요.`}
            validMessage={emailCertValidMessage}
            isValid={emailCertValid}
            inputChange={emailCertChangeHandler}
            inputBlur={() => {}}
            maxLength={50}
            tabIndex={lockEmailTabIndex}
          >
            <div
              className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${emailCertClasses}`}
              onClick={emailCertHandler}
            >
              {emailCertValid ? (
                `완료`
              ) : emailCertRequestLoaing ? (
                <SpinnerDots />
              ) : emailCertRequestError ? (
                "에러"
              ) : (
                "인증"
              )}
            </div>
          </InputInSignup>
        </div>
      </div>
      <div>
        <div className={`${lockPhoneClasses}`} tabIndex={lockPhoneTabIndex}>
          <InputInSignup
            inputRef={phoneRef}
            labelText={`phone`}
            inputId={`signup-phone`}
            inputType={`phone`}
            additionalClasses={`${lockPhoneClasses} ${lockPhoneTabIndex}`}
            placeHolder={`휴대폰 번호를 입력하세요.`}
            validMessage={phoneValidMessage}
            isValid={phoneValid}
            inputChange={phoneChangeHandler}
            inputBlur={phoneBlurHandler}
            maxLength={50}
            tabIndex={lockPhoneTabIndex}
          >
            <div
              className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${phoneClasses}`}
              onClick={phoneReqHandler}
            >
              {phoneCertValid ? (
                `완료`
              ) : phoneRequestLoaing ? (
                <SpinnerDots />
              ) : phoneRequestError ? (
                "에러"
              ) : (
                "요청"
              )}
            </div>
          </InputInSignup>
        </div>
        <div className={`${lockPhoneClasses}`} tabIndex={lockPhoneTabIndex}>
          <InputInSignup
            inputRef={phoneCertRef}
            labelText={`code`}
            inputId={`signup-phone-cert`}
            inputType={`text`}
            additionalClasses={`${lockPhoneClasses} ${lockPhoneTabIndex}`}
            placeHolder={`인증 코드를 입력하세요.`}
            validMessage={phoneCertValidMessage}
            isValid={phoneCertValid}
            inputChange={phoneCertChangeHandler}
            inputBlur={() => {}}
            maxLength={50}
            tabIndex={lockPhoneTabIndex}
          >
            <div
              className={`border-[2.8px] basis-[16%] h-full rounded-full lg:p-2 font-hopang-black text-lg lg:text-2xl flex items-center justify-center cursor-pointer shadow-md hover:scale-105 duration-[0.33s] ${phoneCertClasses}`}
              onClick={phoneCertHandler}
            >
              {phoneCertValid ? (
                `완료`
              ) : phoneCertRequestLoaing ? (
                <SpinnerDots />
              ) : phoneCertRequestError ? (
                "에러"
              ) : (
                "인증"
              )}
            </div>
          </InputInSignup>
        </div>
      </div>
    </div>
  )
}

export default SignupFirstForm
