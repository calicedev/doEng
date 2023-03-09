import { useState, useRef, useEffect } from "react"
import SignupFirstForm from "./SignupFirstForm"
import SignupFox from "../../assets/images/signupFox.png"
import LetsDoEng from "../../assets/images/LetsDoEng.png"
import { useInput } from "../../hooks/useInput"
import {
  idValidation,
  passwordValidation,
  emailValidation,
  nicknameValidation,
  nameValidation,
  phoneValidation,
} from "../../utils/validation"
import useApi from "../../hooks/useApi"
import axios from "axios"

function Signup() {
  const [step, setStep] = useState<boolean>(true)
  function toggleStep(): void {
    setStep((val) => !val)
  }
  const [
    nameRef,
    emailRef,
    phoneRef,
    nickRef,
    IDRef,
    pw1Ref,
    pw2Ref,
    emailCertRef,
    phoneCertRef,
  ] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]
  const {
    inputData: nameInput,
    isValid: nameValid,
    validMessage: nameValidMessage,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
  } = useInput(nameRef, nameValidation, 8)
  const {
    inputData: emailInput,
    isValid: emailValid,
    validMessage: emailValidMessage,
    onChangeHandler: emailChangeHandler,
    onBlurHandler: emailBlurHandler,
  } = useInput(emailRef, emailValidation, 50)
  console.log(emailValid)
  const {
    inputData: phoneInput,
    isValid: phoneValid,
    validMessage: phoneValidMessage,
    onChangeHandler: phoneChangeHandler,
    onBlurHandler: phoneBlurHandler,
  } = useInput(phoneRef, phoneValidation, 13)
  const {
    inputData: nickInput,
    isValid: nickValid,
    validMessage: nickValidMessage,
    onChangeHandler: nickChangeHandler,
    onBlurHandler: nickBlurHandler,
  } = useInput(nickRef, nicknameValidation, 8)
  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idChangeHandler,
    onBlurHandler: idBlurHandler,
  } = useInput(IDRef, idValidation, 16)
  const {
    inputData: pw1Input,
    isValid: pw1Valid,
    validMessage: pw1ValidMessage,
    onChangeHandler: pw1ChangeHandler,
    onBlurHandler: pw1BlurHandler,
  } = useInput(pw1Ref, passwordValidation, 16)

  /////////////////////////////////////////////////////////////////////////
  // PW2 로직 모음
  /////////////////////////////////////////////////////////////////////////

  // pw2 로직 변수들
  const [pw2Input, setpw2Input] = useState<string>("")
  const [pw2Valid, setPw2Valid] = useState<boolean | null>(null)
  const [pw2ValidMessage, setPw2ValidMessage] = useState<string>("")
  const [pw2Touched, setPw2Touched] = useState<boolean>(false)
  // const password2Validation = function () {}  validation 함수는 useEffect로 째려보세 해서 해결.
  const pw2ChangeHandler = function () {
    if (pw2Ref.current && pw2Ref.current.value.length > 16) {
      return
    } else {
      setpw2Input(() => (pw2Ref.current ? pw2Ref.current.value : ""))
      if (pw2Touched === true) {
        setPw2Valid(() => pw1Input === pw2Input)
      }
    }
  }
  const pw2BlurHandler = function () {
    setPw2Touched(() => true)
  }

  // pw2 valid & validMessage useEffect
  useEffect(
    function () {
      if (pw2Input.trim().length === 0 && !pw2Touched) {
        const validMessage = "2차 비밀번호는 필수 입력 값입니다."
        setPw2ValidMessage(() => validMessage)
        return
      }
      if (pw2Input.trim().length === 0 && pw2Touched) {
        const validMessage = "2차 비밀번호는 필수 입력 값입니다."
        setPw2ValidMessage(() => validMessage)
        return
      }
      if (!pw1Valid) {
        setPw2ValidMessage(() => "1차 비밀번호가 유효하지 않습니다.")
        return
      }
      setPw2Valid(() => pw1Input === pw2Input)
      if (pw2Valid) {
        setPw2ValidMessage(() => "2차 비밀번호가 유효합니다.")
        return
      } else if (!pw2Touched) {
      } else if (pw2Touched) {
        const validMessage = "2차 비밀번호가 일치하지 않습니다."
        setPw2ValidMessage(() => validMessage)
      }
    },
    [pw2Valid, pw1Input, pw1Valid, pw2Input, pw2Touched]
  )

  //////////////////////////////////////////////////////////////
  // Email Certification 관련 코드
  //////////////////////////////////////////////////////////////
  const [emailcert, setEmailcert] = useState<string>("")
  const [emailCertValid, setEmailCertValid] = useState<boolean | null>(null)
  const [emailCertValidMessage, setEmailCertValidMessage] = useState<string>("")
  const emailCertValidation = function () {
    return { status: null, message: "" }
  }
  const emailCertChangeHandler = function () {
    setEmailcert(() => (emailCertRef.current ? emailCertRef.current.value : ""))
  }
  const {
    isLoading: emailCertLoading,
    isError: emailCertError,
    axiosRequest: AxiosEmailCertRequest,
  } = useApi()
  const emailCertClickHandler = async function () {
    // await AxiosEmailCertRequest({}, function () {
    //   setEmailCertValid(() => true)
    //   setEmailCertValidMessage(() => "인증에 성공하셨습니다!")
    // })
    // if (emailCertError) {
    //   setEmailCertValid(() => false)
    //   setEmailCertValidMessage(() => "인증에 실패하셨습니다!")
    // }
  }

  //////////////////////////////////////////////////////////////
  // Phone Certification 관련 코드
  //////////////////////////////////////////////////////////////
  const [phoneCert, setPhoneCert] = useState<string>("")
  const [phoneCertValid, setPhoneCertValid] = useState<boolean | null>(null)
  const [phoneCertValidMessage, setPhoneCertValidMessage] = useState<string>("")
  const phoneCertValidation = function () {
    return { status: null, message: "" }
  }
  const phoneCertChangeHandler = function () {
    setPhoneCert(() => (phoneCertRef.current ? phoneCertRef.current.value : ""))
  }
  const {
    isLoading: phoneCertLoading,
    isError: phoneCertError,
    axiosRequest: AxiosPhoneCertRequest,
  } = useApi()
  const phoneCertClickHandler = async function () {
    // await AxiosPhoneCertRequest({}, function () {
    //   setPhoneCertValid(() => true)
    //   setPhoneCertValidMessage(() => "인증에 성공하셨습니다!")
    // })
    // if (phoneCertError) {
    //   setPhoneCertValid(() => false)
    //   setPhoneCertValidMessage(() => "인증에 실패하셨습니다!")
    // }
  }

  return (
    <div
      className={`flex flex-col items-center justify-center rounded-[2pc] bg-white bg-opacity-75 w-full h-full px-[2vw] py-[2vh]`}
    >
      <div className={`basis-[28%] w-full flex items-center justify-center`}>
        <img alt={`로고`} src={LetsDoEng} className={`w-[66vw]`} />
      </div>
      <div
        className={`basis-[72%] flex mobile:flex-row flex-col w-full items-center justify-center`}
      >
        <div
          className={`basis-[34%] h-full mobile:w-full w-[70vw] flex flex-col items-center justify-center`}
        >
          <img alt={`fox`} src={SignupFox} />
          <div>로그인</div>
          <div>비밀번호 찾기</div>
        </div>
        <div
          className={`basis-[64%] h-full w-[64vw] flex flex-col items-center justify-center overflow-hidden`}
        >
          <div
            className={`flex flex-row w-full h-[61vh] items-center justify-center`}
          >
            <SignupFirstForm
              toggleStep={toggleStep}
              nameRef={nameRef}
              nameValid={nameValid}
              nameValidMessage={nameValidMessage}
              nameChangeHandler={nameChangeHandler}
              nameBlurHandler={nameBlurHandler}
              emailRef={emailRef}
              emailValid={emailValid}
              emailValidMessage={emailValidMessage}
              emailChangeHandler={emailChangeHandler}
              emailBlurHandler={emailBlurHandler}
              emailCertRef={emailCertRef}
              emailCertValidMessage={emailCertValidMessage}
              emailCertValid={emailCertValid}
              emailCertChangeHandler={emailCertChangeHandler}
              emailCertClickHandler={emailCertClickHandler}
              phoneRef={phoneRef}
              phoneValid={phoneValid}
              phoneValidMessage={phoneValidMessage}
              phoneChangeHandler={phoneChangeHandler}
              phoneBlurHandler={phoneBlurHandler}
              phoneCertRef={phoneCertRef}
              phoneCertValidMessage={phoneCertValidMessage}
              phoneCertValid={phoneCertValid}
              phoneCertChangeHandler={phoneCertChangeHandler}
              phoneCertClickHandler={phoneCertClickHandler}
            />
            {/* <div className={`bg-orange-400 w-[100vw] h-[64vh]`}>폼2</div> */}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
