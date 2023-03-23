import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"
import { useUserQuery } from "hooks/queries/user"
import { useUserMutation } from "hooks/queries/user"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch } from "hooks/useStoreSelector"

function ProfilePwdEditForm() {
  const { mutate: ProfilePwdEditMutate } = useUserMutation()
  const [oldPasswordRef, newPassword1Ref, newPassword2Ref] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const {
    inputData: oldPasswordInput,
    isValid: oldPasswordValid,
    validMessage: oldPasswordValidMessage,
    onChangeHandler: oldPasswordChangeHandler,
    onBlurHandler: oldPasswordBlurHandler,
  } = useInput(oldPasswordRef, passwordValidation)

  const {
    inputData: newPassword1Input,
    isValid: newPassword1Valid,
    validMessage: newPassword1ValidMessage,
    onChangeHandler: newPassword1ChangeHandler,
    onBlurHandler: newPassword1BlurHandler,
  } = useInput(newPassword1Ref, passwordValidation)

  const {
    inputData: newPassword2Input,
    isValid: newPassword2Valid,
    validMessage: newPassword2ValidMessage,
    onChangeHandler: newPassword2ChangeHandler,
    onBlurHandler: newPassword2BlurHandler,
  } = useInput(newPassword2Ref, passwordValidation)

  const ProfilePwdEditHandler = function () {
    ProfilePwdEditMutate({
      method: `patch`,
      url: `/api/member/password`,
      data: {
        oldPassword: oldPasswordInput,
        newPassword: newPassword2Input,
      },
    })
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      {/* <MyPageInput type="originalPwd" value={""} />
      <MyPageInput type="newPwd" value={""} />
      <MyPageInput type="confirmPwd" value={""} /> */}
      <input
        ref={oldPasswordRef}
        type="password"
        onChange={oldPasswordChangeHandler}
      />
      <input
        ref={newPassword2Ref}
        type="password"
        onChange={newPassword2ChangeHandler}
      />
      <div onClick={ProfilePwdEditHandler}>바꿔바꿔</div>
    </div>
  )
}

export default ProfilePwdEditForm
