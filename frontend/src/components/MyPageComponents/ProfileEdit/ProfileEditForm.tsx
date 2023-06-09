import { useState, useRef, useEffect } from "react"
import MyPageButton from "components/MyPageComponents/common/MyPageButton"
import { useInput } from "hooks/useInput"
import { useNavigate } from "react-router-dom"
import MyPageInput from "../common/MyPageInput"
import { useUserMutation, useUserData } from "hooks/queries/queries"
import { nicknameValidation, nameValidation } from "utils/validation"
import useINEP from "hooks/useINEP"

import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { DispatchToast } from "store"
import useINEP2 from "hooks/useINEP2"
import AnimationBox from "components/UI/AnimationBox"
import CommonLoading from "components/UI/CommonLoading"

function ProfileEditForm() {
  // const user = useSelector((state) => state.user)
  const { isLoading: userLoading, error: userError, data: user } = useUserData()

  const dispatch = useStoreDispatch()
  const navigate = useNavigate()

  const { mutateAsync: ProfileEditMutate } = useUserMutation()
  const [profileName, setProfileName] = useState(user?.name || "")
  const [profileNickname, setProfileNickname] = useState(user?.nickname || "")
  const [nameRef, nickRef, idRef, emailRef, phoneRef] = [
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
    useRef<HTMLInputElement>(null),
  ]

  const {
    inputData: nameInput,
    isValid: nameValid,
    setFirstData: nameFirstData,
    onChangeHandler: nameChangeHandler,
  } = useInput(nameRef, nameValidation, 8)
  const {
    inputData: nickInput,
    isValid: nickValid,
    setFirstData: nickFirstData,
    onChangeHandler: nickChangeHandler,
  } = useInput(nickRef, nicknameValidation, 8)
  const { setFirstData: idFirstData } = useInput(idRef)
  const { setFirstData: emailFirstData } = useInput(emailRef)
  const { setFirstData: phoneFirstData } = useInput(phoneRef)
  const { isGoogle } = useStoreSelector((state) => state.password)

  useEffect(
    function () {
      idFirstData(user?.memberId || "")
      nameFirstData(user?.name || "")
      nickFirstData(user?.nickname || "")
      emailFirstData(user?.email || "")
      phoneFirstData(user?.phone || "")
    },
    [user],
  )

  const { dupValid: nickDupValid } = useINEP(nickInput, "nick", nickValid)

  const profileEditHandler = function () {
    if (!nameValid) {
      dispatch(DispatchToast("이름이 유효하지 않습니다!", false))
      return
    } else if (!nickValid) {
      dispatch(DispatchToast("닉네임이 유효하지 않습니다!", false))
      return
    } else if (nickDupValid === null) {
      dispatch(
        DispatchToast(
          "닉네임 중복 검사 중입니다. 잠시 후에 시도해주세요!",
          false,
        ),
      )
    } else if (nickDupValid === false) {
      dispatch(DispatchToast("닉네임이 중복되었습니다!", false))
    }
    ProfileEditMutate({
      method: `patch`,
      url: `/api/member`,
      data: {
        name: nameInput,
        nickname: nickInput,
      },
    }).then((res) => {
      dispatch(DispatchToast("개인정보 변경 성공!", true))
      navigate(`/mypage/profile`)
    })
  }

  return (
    <>
      {userLoading ? (
        <CommonLoading />
      ) : (
        <AnimationBox appearClassName="animate-appear-from-bottom-fast">
          <div className="flex flex-col px-6 sm:px-14 py-5 gap-5">
            <div className="flex flex-col lg:flex-row gap-5 lg:gap-10">
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
            </div>
            {isGoogle ? null : (
              <MyPageInput type="id" inputRef={idRef} disabled={true} />
            )}
            <MyPageInput type="email" inputRef={emailRef} disabled={true} />
            <MyPageInput type="phone" inputRef={phoneRef} disabled={true} />
            <div
              onClick={profileEditHandler}
              className="self-end flex items-center justify-center px-5 py-2 font-hopang-black text-lime-700 text-2xl border-[4px] rounded-full border-lime-500 bg-opacity-80 bg-gradient-to-tl from-lime-400 to-lime-200 shadow-xl duration-200 hover:scale-105 cursor-pointer"
            >
              수정하기
            </div>
          </div>
        </AnimationBox>
      )}
    </>
  )
}

export default ProfileEditForm
