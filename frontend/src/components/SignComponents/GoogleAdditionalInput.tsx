import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"
import InputWithValidation from "components/UI/InputWithValidation"
import { useUserData } from "hooks/queries/queries"
import { queryKeys } from "hooks/queries/queryKeys"
import { useInput } from "hooks/useInput"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { useWidthHeight } from "hooks/useWidthHwight"
import ErrorPage from "pages/ErrorPage"
import { FormEvent, useRef, useState } from "react"
import { useNavigate } from "react-router-dom"
import { DispatchToast } from "store"
import { googleActions } from "store/googleSlice"
import { tokenActions } from "store/tokenSlice"
import apiRequest from "utils/axios"
import {
  emailValidation,
  idValidation,
  nameValidation,
  nicknameValidation,
  phoneValidation,
} from "utils/validation"

const GoogleAdditionalInput = function () {
  const navigate = useNavigate()
  const queryClient = useQueryClient()
  const { gId, gmail, gname, code } = useStoreSelector((state) => state.google)
  const { mutateAsync } = useMutation({
    mutationFn: async function () {
      return await apiRequest({
        method: `post`,
        baseURL: `https://j8a601.p.ssafy.io`,
        url: `/api/auth/google`,
        data: {
          memberId: gId,
          password: "",
          nickname: nickInput,
          name: gname,
          email: gmail,
          phone: phoneInput,
        },
      })
    },
    onSuccess: function () {
      queryClient.invalidateQueries(queryKeys.user())
    },
  })
  const [idInputRef, emailInputRef, nickInputRef, nameRef, phoneRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  // const {
  //   onBlurHandler: idBlur,
  //   onChangeHandler: idChange,
  //   inputData: idInput,
  //   validMessage: idValidMessage,
  //   isValid: idValid,
  // } = useInput(idInputRef, idValidation)
  // const {
  //   onBlurHandler: emailBlur,
  //   onChangeHandler: emailChange,
  //   inputData: emailInput,
  //   validMessage: emailValidMessage,
  //   isValid: emailValid,
  // } = useInput(emailInputRef, emailValidation)
  const {
    onBlurHandler: nickBlur,
    onChangeHandler: nickChange,
    inputData: nickInput,
    validMessage: nickValidMessage,
    isValid: nickValid,
  } = useInput(nickInputRef, nicknameValidation)
  // const {
  //   onBlurHandler: nameBlur,
  //   onChangeHandler: nameChange,
  //   inputData: nameInput,
  //   validMessage: nameValidMessage,
  //   isValid: nameValid,
  // } = useInput(nameRef, nameValidation)
  const {
    onBlurHandler: phoneBlur,
    onChangeHandler: phoneChange,
    inputData: phoneInput,
    validMessage: phoneValidMessage,
    isValid: phoneValid,
  } = useInput(phoneRef, phoneValidation)

  const dispatch = useStoreDispatch()
  const loginHandler = function (e: FormEvent) {
    e.preventDefault()
    mutateAsync()
      .then(async () => {
        await apiRequest({
          method: `get`,
          url: `/api/auth/login/GOOGLE`,
        }).then((res) => {
          window.location.href = res.data
        })
        dispatch(googleActions.resetGoogleSlice({}))
      })
      .catch((err) => {
        dispatch(googleActions.resetGoogleSlice({}))
        dispatch(DispatchToast("실패! 재시도 바랍니다.", false))
      })
  }

  const [loginBtnClasses, setLoginBtnClasses] = useState<string>(
    "bg-lime-400 text-green-900 border-lime-600",
  )

  return (
    <form
      className="h-[100%] w-[50%] basis-1/2 flex items-center justify-center flex-col"
      onSubmit={loginHandler}
    >
      <div className="mb-[5%] font-hopang-black text-[36px]">
        추가 정보를 입력 해주세요!
      </div>
      {/* <InputWithValidation
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
        /> */}
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
      {/* <InputWithValidation
          inputRef={nameRef}
          labelText={`Name`}
          inputId={`google-name`}
          inputType={`text`}
          placeHolder={`이름을 입력해주세요.`}
          validMessage={nameValidMessage}
          isValid={nameValid}
          inputChange={nameChange}
          inputBlur={nameBlur}
          maxLength={16}
        /> */}
      <InputWithValidation
        inputRef={phoneRef}
        labelText={`Phone`}
        inputId={`google-phone`}
        inputType={`phone`}
        placeHolder={`휴대폰 번호를 입력해주세요.`}
        validMessage={phoneValidMessage}
        isValid={phoneValid}
        inputChange={phoneChange}
        inputBlur={phoneBlur}
        maxLength={16}
      />
      <button
        className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] ${loginBtnClasses}`}
      >
        완료
      </button>
    </form>
  )
}

export default GoogleAdditionalInput
