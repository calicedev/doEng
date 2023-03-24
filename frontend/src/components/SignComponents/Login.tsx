import { FormEvent, useRef, useState, useEffect, useCallback } from "react"
import { useInput } from "../../hooks/useInput"
import { idValidation, passwordValidation } from "../../utils/validation"
import InputWithValidation from "../UI/InputWithValidation"
import LogoImg from "../../assets/images/doEngLogo.png"
import { useNavigate } from "react-router-dom"
import useApi from "../../hooks/useApi"
import axios, { AxiosError, AxiosRequestConfig, AxiosResponse } from "axios"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { DispatchToast } from "store"
import { SpinnerDots } from "components/UI/Spinner"
import Toast from "components/UI/Toast"
import { findActions } from "store/findSlice"
import apiRequest from "utils/axios"
import { useUserMutation } from "hooks/queries/user"
import { useMutation, useQueryClient } from "react-query"

function Login() {
  const queryClient = useQueryClient()
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { mutate: LoginMutate, mutateAsync: LoginMutateAsync } =
    useUserMutation()

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
    if (!idValid) {
      dispatch(DispatchToast("아이디가 유효하지 않습니다.", false))
      return
    } else if (!passwordValid) {
      dispatch(DispatchToast("비밀번호가 유효하지 않습니다.", false))
      return
    }

    axios({
      method: `post`,
      baseURL: `https://j8a601.p.ssafy.io`,
      url: `/api/auth/login`,
      data: { memberId: `${idInput}`, password: `${passwordInput}` },
    })
      .then((res) => {
        console.log(res)
        queryClient.invalidateQueries(["user"])
        navigate(`/`)

        // dispatch(DispatchToast("성공", true))
      })
      .catch((err) => {
        console.log(err, "여깁니다")
        dispatch(DispatchToast("로그인 실패", false))
      })

    // LoginMutateAsync({
    //   method: "post",
    //   url: `/api/auth/login`,
    //   data: {
    //     memberId: `${idInput}`,
    //     password: `${passwordInput}`,
    //   },
    // })
    //   .then((res) => {
    //     navigate(`/playtale`)
    //     // if (res.data) {로그인 시켜주고 Home으로 push}
    //     // else { dispatch(DispatchToast("아이디 비밀번호를 확인 해주세요!", false)) }
    //   })
    //   .catch((err) => {
    //     // dispatch(DispatchToast("아이디 비밀번호를 확인 해주세요!", false))
    //     console.log(err, "여기가 에러에요!!!!!!!")
    //   })

    // LoginMutate({
    //   method: "post",
    //   url: `/api/auth/login`,
    //   data: {
    //     memberId: `${idInput}`,
    //     password: `${passwordInput}`,
    //   },
    // })
    // loginRequest(
    //   {
    //     method: "post",
    //     url: `/api/member/login`,
    //     data: {
    // memberId: `${idInput}`,
    // password: `${passwordInput}`,
    //     },
    //   },
    //   function () {
    //     dispatch(DispatchToast("로그인 성공!", true))
    //     navigate("/")
    //   },
    //   "로그인 실패!",
    // )
  }
  const goSignupHandler = function () {
    navigate("/member/signup")
  }
  const findIdHandler = function () {
    navigate("/member/find")
  }
  const [loginBtnClasses, setLoginBtnClasses] = useState<string>(
    "bg-lime-400 text-green-900 border-lime-600",
  )

  useEffect(
    function () {
      if (loginError) {
        // dispatch(DispatchToast("로그인 실패!", false))
        setLoginBtnClasses(() => "bg-red-400 text-red-900 border-red-600")
      } else {
        setLoginBtnClasses(() => "bg-lime-400 text-green-900 border-lime-600")
      }
    },
    [loginError],
  )

  useEffect(function () {
    dispatch(findActions.resetState({}))
  }, [])

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
          className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] ${loginBtnClasses}`}
        >
          {loginLoading ? (
            <SpinnerDots />
          ) : loginError ? (
            "로그인 실패"
          ) : (
            "로그인"
          )}
        </button>
        <div
          className={`box-border flex flex-row items-center justify-center min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] gap-4 mt-4`}
        >
          <div
            className={`box-border flex basis-[50%] items-center justify-center w-full h-full rounded-full font-hopang-white cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[-6deg] hover:-skew-y-[-6deg] text-sm sm:text-xl mobile:text-lg md:text-2xl lg:text-3xl text-black`}
            onClick={findIdHandler}
          >
            회원 정보 찾기
          </div>
          <div
            className={`box-border flex basis-[50%] items-center justify-center w-full h-full rounded-full font-hopang-white cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[5deg] hover:-skew-y-[5deg] text-sm sm:text-xl mobile:text-lg md:text-2xl lg:text-3xl text-black`}
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
