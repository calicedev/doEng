import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { useState, useEffect } from "react"
import { DispatchToast } from "store"
import { findActions } from "store/findSlice"
import FindPWEmailForm from "./FindPWEmailForm"
import FindPWPhoneForm from "./FindPWPhoneForm"
import FindPWResetForm from "./FindPWResetForm"
import SelectEmailOrPhone from "./SelectEmailOrPhone"

const FindPWForm = function () {
  const dispatch = useStoreDispatch()
  const [findByEmailOrPhone, setFindByEmailOrPhone] = useState<boolean | null>(
    null,
  )
  const { id, email, isCert } = useStoreSelector((state) => state.find)
  const [resetOrAuth, setResetOrAuth] = useState<boolean>(false)

  useEffect(
    function () {
      if (resetOrAuth === false) {
        dispatch(findActions.resetState({}))
      }
    },
    [resetOrAuth, dispatch],
  )

  const setEmailOrPhone = function (emailOrPhone: boolean) {
    setFindByEmailOrPhone(emailOrPhone)
  }

  const [btnClasses, setBtnClasses] = useState<string>(
    "bg-lime-400 text-black border-lime-600",
  )

  const goToResetPW = function () {
    if (!isCert) {
      dispatch(DispatchToast("인증을 진행 해주세요!", false))
      return
    }
    setResetOrAuth(() => true)
    setResetOrAuth((val) => !val)
  }

  return (
    <div className="flex flex-col gap-1 items-center justify-center">
      {resetOrAuth ? (
        <FindPWResetForm />
      ) : findByEmailOrPhone === null ? (
        <SelectEmailOrPhone setEmailOrPhone={setEmailOrPhone} />
      ) : findByEmailOrPhone === true ? (
        <FindPWEmailForm />
      ) : (
        <FindPWPhoneForm />
      )}

      {resetOrAuth ? null : (
        <button
          className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] cursor-pointer ${btnClasses}`}
          onClick={goToResetPW}
        >
          비밀번호 재설정
        </button>
      )}
    </div>
  )
}

export default FindPWForm
