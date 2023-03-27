import { useState, useRef, useEffect } from "react"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import { useUserMutation } from "hooks/queries/queries"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import MyPageInput from "../common/MyPageInput"
import { passwordActions } from "store/passwordSlice"

function ProfilePassword() {
  const dispatch = useStoreDispatch()
  const navigate = useNavigate()
  const { mutate: ProfileMutate, mutateAsync: ProfileMutateAsync } =
    useUserMutation()
  const [passwordRef] = [useRef<HTMLInputElement>(null)]
  const { isCert } = useStoreSelector((state) => state.password)

  const {
    inputData: passwordInput,
    isValid: passwordValid,
    validMessage: passwordValidMessage,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput(passwordRef, passwordValidation)

  const profileAsyncHandler = function () {
    ProfileMutateAsync({
      method: `post`,
      url: `/api/member/check/password`,
      data: {
        password: passwordInput,
      },
    }).then((res) => {
      dispatch(passwordActions.rightPassword({}))
      navigate(`progress`)
    })
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <input
          ref={passwordRef}
          type="password"
          onChange={passwordChangeHandler}
          placeholder="비밀번호를 입력해주세요"
        />
        <div onClick={profileAsyncHandler}>입력완료오오!!!</div>
      </div>
    </div>
  )
}

export default ProfilePassword
