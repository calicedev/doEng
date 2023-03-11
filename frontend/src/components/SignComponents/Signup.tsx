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
import AnimationBox from "components/UI/AnimationBox"
import SignupSecondForm from "./SignupSecondForm"
import { FaArrowLeft, FaArrowRight } from "react-icons/fa"
import { useNavigate } from "react-router-dom"

function Signup() {
  const navigate = useNavigate()
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
    if (!pw2Ref.current) {
      return
    }
    if (pw2Ref.current.value.length > 16) {
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
      if (!pw2Touched) {
        return
      }
      if (pw2Input.trim().length === 0) {
        const validMessage = "2차 비밀번호는 필수 입력 값입니다."
        setPw2Valid(() => false)
        setPw2ValidMessage(() => validMessage)
        return
      }
      if (!pw1Valid) {
        setPw2ValidMessage(() => "1차 비밀번호가 유효하지 않습니다.")
        setPw2Valid(() => false)
        return
      }
      // 여기가 validation 한 값. true라면 유효, false라면 틀린 것.
      setPw2Valid(() => pw1Input === pw2Input)
      if (pw2Valid) {
        setPw2ValidMessage(() => "2차 비밀번호가 유효합니다.")
        return
      } else {
        setPw2ValidMessage(() => "2차 비밀번호가 일치하지 않습니다.")
      }
    },
    [pw2Valid, pw1Input, pw1Valid, pw2Input, pw2Touched],
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

  const signupHandler = function () {}

  const pushLoginHandler = function () {
    navigate("/member/login")
  }
  const pushFindHandler = function () {
    navigate("/member/find")
  }

  return (
    <div
      className={`flex flex-col items-start justify-start rounded-[2pc] bg-white bg-opacity-75 w-auto h-full px-[2vw] py-[2vh] min-h-[700px]`}
    >
      {/* <div
        className={`basis-[25%] w-full h-[25%] flex items-center justify-center object-contain `}
      ></div> */}
      <img
        alt={`로고`}
        src={LetsDoEng}
        className={`lg:basis-[24%] basis-[20%] w-full h-[25%] flex items-center justify-center object-contain`}
      />
      <div
        className={`lg:basis-[75%] basis-[80%] flex lg:flex-row flex-col w-full h-[72vh] items-center justify-start object-contain`}
      >
        <div
          className={`basis-[34%] h-full lg:w-full w-[50vw] flex flex-col items-center justify-center gap-3 pb-[3%]`}
        >
          <img
            alt={`fox`}
            src={SignupFox}
            className={`basis-[70%] h-[70%] lg:w-auto w-[50vw] lg:h-[70%] flex flex-col items-center justify-center hover:animate-[shake_0.7s_ease-in-out_1]`}
          />
          <div
            className={`basis-[10%] h-[10%] w-[70%] flex flex-col items-center justify-center font-dolbom-bold text-[1.7rem] py-0.5 bg-yellow-300 rounded-full cursor-pointer hover:scale-[105%] duration-[0.33s] drop-shadow-xl`}
            onClick={pushLoginHandler}
          >
            로그인
          </div>
          <div
            className={`basis-[10%] h-[10%] w-[70%] flex flex-col items-center justify-center font-dolbom-bold text-[1.7rem] py-0.5 bg-yellow-300 rounded-full cursor-pointer hover:scale-[105%] duration-[0.33s] drop-shadow-xl`}
            onClick={pushFindHandler}
          >
            회원정보 찾기
          </div>
        </div>
        <div
          className={`basis-[64%] h-full lg:w-[64vw] w-full flex flex-col items-center justify-center object-contain`}
        >
          <div
            className={`${
              step
                ? `animate-appear-from-left-fast`
                : `animate-disappear-to-left-fast absolute -z-[31]`
            }`}
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
          </div>
          <div
            className={`${
              step
                ? `animate-disappear-to-left-fast absolute -z-[31]`
                : `animate-appear-from-left-fast`
            }`}
          >
            <SignupSecondForm
              toggleStep={toggleStep}
              nickRef={nickRef}
              nickValid={nickValid}
              nickValidMessage={nickValidMessage}
              nickChangeHandler={nickChangeHandler}
              nickBlurHandler={nickBlurHandler}
              idRef={IDRef}
              idValid={idValid}
              idValidMessage={idValidMessage}
              idChangeHandler={idChangeHandler}
              idBlurHandler={idBlurHandler}
              pw1Ref={pw1Ref}
              pw1Valid={pw1Valid}
              pw1ValidMessage={pw1ValidMessage}
              pw1ChangeHandler={pw1ChangeHandler}
              pw1BlurHandler={pw1BlurHandler}
              pw2Ref={pw2Ref}
              pw2Valid={pw2Valid}
              pw2ValidMessage={pw2ValidMessage}
              pw2ChangeHandler={pw2ChangeHandler}
              pw2BlurHandler={pw2BlurHandler}
              signupHandler={signupHandler}
            />
          </div>
          <div
            className={`sticky lg:absolute top-[80vh] left-[46vw] lg:top-[59vh] lg:left-[87.5vw] cursor-pointer min-w-[30px] min-h-[30px] max-w-[100px] max-h-[150px] h-[7%] w-[7%] flex flex-col items-center justify-center hover:scale-[110%] duration-[0.3s]`}
            onClick={toggleStep}
          >
            {step ? (
              <>
                <FaArrowRight
                  className={`min-w-[30px] min-h-[30px] max-w-[50px] max-h-[80px] h-[5%] w-[5%]`}
                />
                <div className={`font-jalnan text-xl`}>다음</div>
              </>
            ) : (
              <>
                <FaArrowLeft
                  className={`min-w-[30px] min-h-[30px] max-w-[50px] max-h-[80px] h-[5%] w-[5%]`}
                />
                <div className={`font-jalnan text-xl`}>이전</div>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}

export default Signup
