import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useState, useRef, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"
import { useUserMutation } from "hooks/queries/queries"
import { passwordValidation } from "utils/validation"
import useINEP from "hooks/useINEP"
import { useStoreDispatch } from "hooks/useStoreSelector"
import axios from "axios"
import { DispatchToast } from "store"
import AnimationBox from "components/UI/AnimationBox"

function ProfilePwdEditForm() {
  const dispatch = useStoreDispatch()

  const { mutateAsync: ProfilePwdEditMutate } = useUserMutation()
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
    if (!oldPasswordValid) {
      dispatch(DispatchToast("현재 비밀번호가 유효하지 않습니다", false))
      return
    } else if (!newPassword1Valid) {
      dispatch(DispatchToast("새 비밀번호가 유효하지 않습니다", false))
      return
    } else if (!newPassword2Valid) {
      dispatch(DispatchToast("새 비밀번호를 다시 확인해주세요", false))
      return
    } else if (oldPasswordInput === newPassword1Input) {
      dispatch(
        DispatchToast("새 비밀번호는 현재 비밀번호와 달라야합니다", false),
      )
      return
    } else if (oldPasswordInput === newPassword2Input) {
      dispatch(
        DispatchToast("새 비밀번호는 현재 비밀번호와 달라야합니다", false),
      )
      return
    } else if (newPassword1Input !== newPassword2Input) {
      dispatch(DispatchToast("새 비밀번호가 일치하지 않습니다", false))
      return
    }
    ProfilePwdEditMutate({
      method: `patch`,
      url: `/api/member/password`,
      data: {
        oldPassword: oldPasswordInput,
        newPassword: newPassword2Input,
      },
    })
      .then((res) => {
        console.log(res)
        console.log("성공이당")
      })
      .catch((err) => {
        console.log(err)
      })
  }

  return (
    <AnimationBox appearClassName="animate-appear-from-bottom-fast">
      <div className="flex flex-col px-6 sm:px-14 py-5 gap-10">
        <MyPageInput
          type="originalPwd"
          inputRef={oldPasswordRef}
          onChange={oldPasswordChangeHandler}
        />
        <MyPageInput
          type="newPwd"
          inputRef={newPassword1Ref}
          onChange={newPassword1ChangeHandler}
        />
        <MyPageInput
          type="confirmPwd"
          inputRef={newPassword2Ref}
          onChange={newPassword2ChangeHandler}
        />
        <div
          onClick={ProfilePwdEditHandler}
          className="self-end flex items-center justify-center px-5 py-2 font-hopang-black text-lime-700 text-2xl border-[4px] rounded-full border-lime-500 bg-opacity-80 bg-gradient-to-tl from-lime-400 to-lime-200 shadow-xl duration-200 hover:scale-105 cursor-pointer"
        >
          변경하기
        </div>
      </div>
    </AnimationBox>
  )
}

export default ProfilePwdEditForm
