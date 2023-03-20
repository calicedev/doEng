import InputInFind from "components/UI/InputInFind"
import LogoImg from "../../assets/images/doEngLogo.png"
import { useState } from "react"
import FindIDForm from "./FindIDForm"
import FindPWForm from "./FindPWForm"
import { useNavigate } from "react-router-dom"

function Find() {
  const navigate = useNavigate()
  const [IDorPW, setIDorPW] = useState<boolean>(true)
  const toggleIDPW = function () {
    setIDorPW((val) => !val)
  }
  const goLogin = function () {
    navigate("/member")
  }

  return (
    <>
      <div
        className={`box-border flex flex-col gap-1 items-center justify-center`}
      >
        <img
          alt={`logo-img`}
          src={LogoImg}
          className={`max-w-[80vw] min-w-[350px] w-[30vw] p-5`}
        />
        {IDorPW ? <FindIDForm /> : <FindPWForm />}
        <div
          className={`box-border flex flex-row items-center justify-center min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] gap-4 mt-4`}
        >
          <div
            className={`box-border flex basis-[50%] items-center justify-center w-full h-full rounded-full font-hopang-white text-sm sm:text-xl mobile:text-lg md:text-2xl lg:text-3xl cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[-6deg] hover:-skew-y-[-6deg]`}
            onClick={goLogin}
          >
            로그인
          </div>
          <div
            className={`box-border flex basis-[50%] items-center justify-center w-full h-full rounded-full font-hopang-white text-sm sm:text-xl mobile:text-lg md:text-2xl lg:text-3xl cursor-pointer shadow-2xl border-[4px] border-yellow-500 bg-gradient-to-br from-yellow-200 to-yellow-400 duration-[0.66s] hover:scale-105 hover:skew-x-[5deg] hover:-skew-y-[5deg]`}
            onClick={toggleIDPW}
          >
            {IDorPW ? `비밀번호 변경` : `아이디 찾기`}
          </div>
        </div>
      </div>
    </>
  )
}

export default Find
