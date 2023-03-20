import { PropsWithChildren } from "react"
import { IoIosMail, IoMdPhonePortrait } from "react-icons/io"

interface PropsSelectEmailOrPhone {
  setEmailOrPhone: (emailOrPhone: boolean) => void
}

const SelectEmailOrPhone = function ({
  setEmailOrPhone,
}: PropsWithChildren<PropsSelectEmailOrPhone>) {
  const setEmail = function () {
    setEmailOrPhone(true)
  }
  const setPhone = function () {
    setEmailOrPhone(false)
  }
  return (
    <>
      <div className="flex items-center justify-center font-[600] font-dolbom-bold text-3xl">
        회원 인증 방법
      </div>
      <div className="flex flex-row items-center justify-center min-w-[288px] w-[40vw] max-w-[480px] gap-3">
        <div
          className="basis-[44%] flex flex-col items-center justify-center min-h-[150px] max-h-[480px] h-[18.8vh] rounded-[23px] bg-yellow-100 cursor-pointer duration-[0.33s] hover:scale-[105%] my-5"
          onClick={setEmail}
        >
          <IoIosMail className="basis-[70%] w-full h-full" />
          <div className="basis-[20%] font-hopang-black text-[1.35rem]">
            이메일 인증
          </div>
        </div>
        {/* <div
          className="basis-[44%] flex flex-col items-center justify-center min-h-[150px] max-h-[480px] h-[18.8vh] rounded-[23px] bg-yellow-100 cursor-pointer duration-[0.33s] hover:scale-[105%] my-5"
          onClick={setPhone}
        >
          <IoMdPhonePortrait className="basis-[70%]" />
          <div className="basis-[20%] font-hopang-black text-[1.35rem]">
            휴대폰 인증
          </div>
        </div> */}
      </div>
    </>
  )
}

export default SelectEmailOrPhone
