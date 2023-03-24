import { useState, useRef, useEffect } from "react"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import { useUserQuery } from "hooks/queries/user"
import { useUserMutation } from "hooks/queries/user"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch } from "hooks/useStoreSelector"
import MyPageInput from "../common/MyPageInput"

function Profile() {
  const navigate = useNavigate()
  const { mutate: ProfileMutate, mutateAsync: ProfileMutateAsync } =
    useUserMutation()
  const [passwordRef] = [useRef<HTMLInputElement>(null)]

  const {
    inputData: passwordInput,
    isValid: passwordValid,
    validMessage: passwordValidMessage,
    onChangeHandler: passwordChangeHandler,
    onBlurHandler: passwordBlurHandler,
  } = useInput(passwordRef, passwordValidation)

  const profileHandler = function () {
    ProfileMutate({
      method: `post`,
      url: `/api/member/check/password`,
      data: {
        password: `${passwordInput}`,
      },
    })
  }

  const profileAsyncHandler = function () {
    ProfileMutateAsync({
      method: `post`,
      url: `/api/member/check/password`,
      data: {
        password: passwordInput,
      },
    }).then((res) => {
      navigate(`info`)
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

export default Profile
