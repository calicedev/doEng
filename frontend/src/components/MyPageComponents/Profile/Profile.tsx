import { useState, useRef, useEffect } from "react"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import { useUserQuery } from "hooks/queries/user"
import { useUserMutation } from "hooks/queries/user"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch } from "hooks/useStoreSelector"

function Profile() {
  const { mutate: ProfileMutate } = useUserMutation()
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
        password: passwordInput,
      },
    })
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <input ref={passwordRef} type="text" onChange={passwordChangeHandler} />
        <div onClick={profileHandler}>입력완료오오!!!</div>
      </div>
    </div>
  )
}

export default Profile
