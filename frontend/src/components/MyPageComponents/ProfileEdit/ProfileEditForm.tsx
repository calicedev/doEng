import { useState, useRef, useEffect } from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"
import { useUserMutation, useUserData } from "hooks/queries/queries"
import { nicknameValidation, nameValidation } from "utils/validation"
import useINEP from "hooks/useINEP"

import { useStoreDispatch } from "hooks/useStoreSelector"
import { DispatchToast } from "store"

function ProfileEditForm() {
  // const user = useSelector((state) => state.user)
  const {
    isLoading: queryLoading,
    error: queryError,
    data: user,
  } = useUserData()

  const dispatch = useStoreDispatch()

  const { mutate: ProfileEditMutate } = useUserMutation()
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileNickname, setProfileNickname] = useState(user?.nickname || "")
  const [nameRef, nickRef, idRef, emailRef, phoneRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const { setFirstData: idFirstData } = useInput(idRef)
  const { setFirstData: emailFirstData } = useInput(emailRef)
  const { setFirstData: phoneFirstData } = useInput(phoneRef)

  const {
    inputData: nameInput,
    setFirstData: nameFirstData,
    onChangeHandler: nameChangeHandler,
  } = useInput(nameRef, nameValidation, 8)

  const {
    inputData: nickInput,
    isValid: nickValid,
    setFirstData: nickFirstData,
    onChangeHandler: nickChangeHandler,
  } = useInput(nickRef, nicknameValidation, 8)

  useEffect(
    function () {
      idFirstData(user?.memberId || "")
      nameFirstData(user?.name || "")
      nickFirstData(user?.nickname || "")
      emailFirstData(user?.email || "")
      phoneFirstData(user?.phone || "")
    },
    [user?.name, user?.nickname, user?.memberId, user?.email, user?.phone],
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
        name: nameInput,
        nickname: nickInput,
      },
    })
  }

  return (
    <div className="flex flex-col gap-10 p-10">
      <div className="flex gap-10"></div>
      <MyPageInput
        inputRef={nameRef}
        type="name"
        onChange={nameChangeHandler}
      />
      <MyPageInput
        inputRef={nickRef}
        type="nickname"
        onChange={nickChangeHandler}
      />
      <div onClick={profileEditHandler}>바꿔바꿔</div>
      <MyPageInput type="id" inputRef={idRef} disabled={true} />
      <MyPageInput type="email" inputRef={emailRef} disabled={true} />
      <MyPageInput type="phone" inputRef={phoneRef} disabled={true} />
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
