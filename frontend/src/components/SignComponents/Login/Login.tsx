import { FormEvent, useRef } from "react"
import { useInput } from "../../../hooks/useInput"
import { idValidation, passwordValidation } from "../../../utils/validation"
import InputWithValidation from "../../UI/InputWithValidation"
import LogoImg from "../../../assets/images/doEngLogo.png"
import { useNavigate } from "react-router-dom"
import useApi from "../../../hooks/useApi"

function Login() {
  const navigate = useNavigate()
  const idInputRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idInputChangeHandler,
    onBlurHandler: idInputBlurHandler,
  } = useInput(idInputRef, idValidation, 16)
  const {
    inputData: passwordInput,
    isValid: passwordValid,
    validMessage: passwordValidMessage,
    onChangeHandler: passwordInputChangeHandler,
    onBlurHandler: passwordInputBlurHandler,
  } = useInput(passwordRef, passwordValidation, 16)

  const {
    isLoading: loginLoading,
    isError: loginError,
    axiosRequest: loginRequest,
  } = useApi()

  const loginHandler = function (e: FormEvent) {
    e.preventDefault()
    console.log("로그인!")
  }
  const goSignupHandler = function () {
    navigate("/member/signup")
  }
  const findIdHandler = function () {
    navigate("/member/find")
  }

  return (
    <>
      <form
        className={`box-border flex flex-col gap-1 items-center justify-center`}
        onSubmit={loginHandler}
      >
        <img
          alt={`logo-img`}
          src={LogoImg}
          className={`max-w-[80vw] min-w-[350px] w-[30vw] p-5`}
        />
        <InputWithValidation
          inputRef={idInputRef}
          labelText="ID"
          inputId="id-input"
          inputType="text"
          placeHolder={`ID를 입력 바랍니다.`}
          validMessage={idValidMessage}
          isValid={idValid}
          inputChange={idInputChangeHandler}
          inputBlur={idInputBlurHandler}
          maxLength={16}
        />
        <InputWithValidation
          inputRef={passwordRef}
          labelText="PW"
          inputId="pw-input"
          inputType="password"
          placeHolder={`PW를 입력 바랍니다.`}
          validMessage={passwordValidMessage}
          isValid={passwordValid}
          inputChange={passwordInputChangeHandler}
          inputBlur={passwordInputBlurHandler}
          maxLength={16}
        />
        <button
          className={`box-border flex items-center justify-center bg-lime-400 bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl text-black border-lime-600 border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg]`}
        >
          {loginLoading ? "로딩" : loginError ? "에러" : "로그인"}
        </button>
        <div
          className={`box-border flex flex-row items-center justify-center min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] gap-4 mt-4`}
        >
          <div
            className={`box-border flex basis-[1/2] items-center justify-center w-full h-full rounded-full font-hopang-white text-3xl cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[-6deg] hover:-skew-y-[-6deg]`}
            onClick={findIdHandler}
          >
            회원 정보 찾기
          </div>
          <div
            className={`box-border flex basis-[1/2] items-center justify-center w-full h-full rounded-full font-hopang-white text-3xl cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[5deg] hover:-skew-y-[5deg]`}
            onClick={goSignupHandler}
          >
            회원 가입
          </div>
        </div>
      </form>
    </>
  )
}

export default Login
