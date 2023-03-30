import { useEffect, useRef, useState } from "react"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { useInput } from "hooks/useInput"
import InputWithValidation from "components/UI/InputWithValidation"
import { passwordValidation } from "utils/validation"
import useApi from "hooks/useApi"
import { DispatchToast } from "store"
import { useNavigate } from "react-router-dom"
import { SpinnerDots } from "components/UI/Spinner"

const FindPWResetForm = function () {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { id, email, isCert } = useStoreSelector((state) => state.find)
  // useEffect(function () {
  //   console.log(`id : ${id}, email: ${email}, isCert: ${isCert}`)
  // }, [])
  const pw1Ref = useRef<HTMLInputElement>(null)
  const pw2Ref = useRef<HTMLInputElement>(null)
  const {
    inputData: pw1Input,
    isValid: pw1Valid,
    validMessage: pw1ValidMessage,
    onChangeHandler: pw1ChangeHandler,
    onBlurHandler: pw1BlurHandler,
  } = useInput(pw1Ref, passwordValidation, 16)
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
      setpw2Input(() => (pw2Ref.current?.value ? pw2Ref.current.value : ""))
      if (!pw1Valid) {
        return
      }
      if (
        !pw2Touched &&
        pw2Input.trim().length > 7 &&
        pw1Input === pw2Ref.current.value
      ) {
        setPw2Touched(() => true)
        setPw2Valid(() => pw1Input === pw2Ref.current?.value)
      }
      if (pw2Touched === true) {
        setPw2Valid(() => pw1Input === pw2Ref.current?.value)
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
  const [btnClasses, setBtnClasses] = useState<string>(
    "bg-lime-400 text-black border-lime-600",
  )
  const { isLoading, isError, axiosRequest } = useApi()
  useEffect(
    function () {
      if (isError) {
        setBtnClasses(() => `bg-red-400 text-red-900 border-red-600`)
      } else {
        setBtnClasses(() => `bg-lime-400 text-black border-lime-600`)
      }
    },
    [isError],
  )
  const changePWHandler = function () {
    if (!pw1Valid) {
      dispatch(DispatchToast("비밀번호가 유효하지 않습니다!", false))
    } else if (!pw2Valid) {
      dispatch(DispatchToast("2차 비밀번호가 유효하지 않습니다!", false))
    } else {
      axiosRequest(
        {
          method: `put`,
          url: `/api/auth/password`,
          data: {
            memberId: `${id}`,
            password: `${pw1Input}`,
          },
        },
        function () {
          dispatch(
            DispatchToast("비밀번호 변경 성공! 다시 로그인 해주세요.", true),
          )
          navigate("/member/login")
        },
        "네트워크 에러!",
      )
    }
  }

  return (
    <>
      <div>비번 바꾸기</div>
      <InputWithValidation
        inputRef={pw1Ref}
        labelText={`PW1`}
        inputId={`rebase-input-pw`}
        inputType={`password`}
        placeHolder={`새 비밀번호를 입력 해주세요.`}
        validMessage={pw1ValidMessage}
        isValid={pw1Valid}
        inputChange={pw1ChangeHandler}
        inputBlur={pw1BlurHandler}
        maxLength={16}
      />
      <InputWithValidation
        inputRef={pw2Ref}
        labelText={`PW2`}
        inputId={`rebase-input-pw2`}
        inputType={`password`}
        placeHolder={`새 비밀번호를 재입력 해주세요.`}
        validMessage={pw2ValidMessage}
        isValid={pw2Valid}
        inputChange={pw2ChangeHandler}
        inputBlur={pw2BlurHandler}
        maxLength={16}
      />
      <button
        className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] cursor-pointer ${btnClasses}`}
        onClick={changePWHandler}
      >
        {isLoading ? (
          <SpinnerDots />
        ) : isError ? (
          `재설정 실패!`
        ) : (
          `비밀번호 재설정`
        )}
      </button>
    </>
  )
}

export default FindPWResetForm
