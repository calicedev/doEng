import { useState, useRef, useEffect } from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"
import { useUserQuery } from "hooks/queries/user"
import { useUserMutation } from "hooks/queries/user"
import {
  idValidation,
  passwordValidation,
  emailValidation,
  nicknameValidation,
  nameValidation,
  phoneValidation,
} from "utils/validation"
import useINEP from "hooks/useINEP"

import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"

function ProfileEditForm() {
  // const user = useSelector((state) => state.user)
  const {
    isLoading: queryLoading,
    error: queryError,
    data: user,
  } = useUserQuery()
  const dispatch = useStoreDispatch()

  const { mutate: ProfileEditMutate } = useUserMutation()
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileNickname, setProfileNickname] = useState(user?.nickname || "")
  const [nameRef, nickRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const {
    inputData: nameInput,
    isValid: nameValid,
    validMessage: nameValidMessage,
    setFirstData: nameFirstData,
    onChangeHandler: nameChangeHandler,
    onBlurHandler: nameBlurHandler,
  } = useInput(nameRef, nameValidation, 8)

  const {
    inputData: nickInput,
    isValid: nickValid,
    setFirstData: nickFirstData,
    validMessage: nickValidMessage,
    onChangeHandler: nickChangeHandler,
    onBlurHandler: nickBlurHandler,
  } = useInput(nickRef, nicknameValidation, 8)

  useEffect(
    function () {
      nameFirstData(user?.name || "")
      nickFirstData(user?.nickname || "")
    },
    [user],
  )

  const { dupValid: nickDupValid } = useINEP(nickInput, "nick", nickValid)

  const profileEditHandler = function () {
    // if (!nameValid) {
    //   dispatch(DispatchToast("이름이 유효하지 않습니다!", false))
    //   return
    // } else if (!nickValid) {
    //   dispatch(DispatchToast("닉네임이 유효하지 않습니다!", false))
    //   return
    // } else if (nickDupValid === null) {
    //   dispatch(
    //     DispatchToast(
    //       "닉네임 중복 검사 중입니다. 잠시 후에 시도해주세요!",
    //       false,
    //     ),
    //   )
    // } else if (nickDupValid === false) {
    //   dispatch(DispatchToast("닉네임이 중복되었습니다!", false))
    // }
    ProfileEditMutate({
      method: `patch`,
      url: `/api/member`,
      data: {
        nickname: nickInput,
        name: nameInput,
      },
    })
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10">
        <input ref={nameRef} type="text" onChange={nameChangeHandler} />
        <div onClick={profileEditHandler}>바꿔바꿔</div>
        <input ref={nickRef} type="text" onChange={nickChangeHandler} />
      </div>
      <MyPageInput type="id" value={user?.memberId || ""} disabled={true} />
      <MyPageInput type="email" value={user?.email || ""} disabled={true} />
      <MyPageInput type="phone" value={user?.phone || ""} disabled={true} />
    </div>
  )
}

export default ProfileEditForm

const exData = {
  id: 1,
  memberId: "doeng1",
  email: "abcd@gmail.com",
  nickname: "두잉",
  name: "홍길동",
  phone: "010-8832-2029",
  createdAt: "2017-09-11",
}
