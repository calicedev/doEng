import { useState, useRef, useEffect, FormEvent } from "react"
import { useInput } from "hooks/useInput"
import { Navigate, useNavigate } from "react-router-dom"
import { useUserMutation } from "hooks/queries/queries"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import MyPageInput from "../common/MyPageInput"
import { passwordActions } from "store/passwordSlice"
import apiRequest from "utils/axios"
import { DispatchToast } from "store"

function ProfilePassword() {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const [passwordRef] = [useRef<HTMLInputElement>(null)]
  const { isCert } = useStoreSelector((state) => state.password)

  const {
    inputData: passwordInput,
    isValid: passwordValid,
    validMessage: passwordValidMessage,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput(passwordRef, passwordValidation)

  const profileAsyncHandler = function (e: FormEvent) {
    e.preventDefault()
    apiRequest({
      method: `post`,
      url: `/api/member/check/password`,
      data: {
        password: passwordInput,
      },
    })
      .then((res) => {
        console.log(res)
        if (res.data === `fail`) {
          dispatch(
            DispatchToast("비밀번호가 다릅니다! 다시 입력 바랍니다.", false),
          )
        } else if (res.data === "success") {
          dispatch(passwordActions.rightPassword({}))
          dispatch(DispatchToast("인증 완료!", true))
          navigate(`progress`)
        }
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <form
      className="flex flex-col gap-10 p-10 items-center justify-center h-[33%]"
      onSubmit={profileAsyncHandler}
    >
      <input
        ref={passwordRef}
        type="password"
        onChange={passwordChangeHandler}
        placeholder="비밀번호를 입력해주세요"
        className="box-border flex rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 items-center shadow-xl duration-[0.44s] bg-white border-black-500 border-[4px]"
      />
      <button className="box-border flex basis-[36%] items-center justify-center w-full h-full rounded-full font-hopang-white text-sm sm:text-xl mobile:text-lg md:text-2xl lg:text-3xl cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[5deg] hover:-skew-y-[5deg]">
        입력완료
      </button>
    </form>
  )
}

export default ProfilePassword
