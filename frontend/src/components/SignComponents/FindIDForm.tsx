import { useInput } from "hooks/useInput"
import { useRef, useState, useEffect } from "react"
import InputInFind from "components/UI/InputInFind"
import useApi from "hooks/useApi"
import { SpinnerDots } from "components/UI/Spinner"

const FindIDForm = function () {
  const [nameRef, emailRef] = [useRef(null), useRef(null)]
  const { inputData: nameInput, onChangeHandler: nameChangeHandler } =
    useInput(nameRef)
  const { inputData: emailInput, onChangeHandler: emailChangeHandler } =
    useInput(emailRef)
  const { isLoading, isError, axiosRequest } = useApi()
  const [btnClasses, setBtnClasses] = useState<string>(
    "bg-lime-400 text-black border-lime-600",
  )
  const [isSuccess, setSuccess] = useState<boolean>(false)
  const [userId, setUserId] = useState<string>("아이디")
  useEffect(
    function () {
      if (isError) {
        setBtnClasses(() => "bg-red-400 text-black border-red-600")
        setSuccess(() => false)
      } else {
        setBtnClasses(() => "bg-lime-400 text-black border-lime-600")
      }
    },
    [isError],
  )
  const findIDHandler = function () {
    axiosRequest(
      {
        method: `post`,
        url: `/api/member/id`,
        data: {
          name: nameInput,
          email: emailInput,
        },
      },
      function (res) {
        setSuccess(() => true)
        setUserId(() => res.data)
      },
      "올바른 값을 입력해주세요!",
    )
  }
  return (
    <>
      <InputInFind
        inputRef={nameRef}
        labelText={`Name`}
        inputId={`find-name`}
        inputType={`text`}
        placeHolder={`이름을 입력해주세요.`}
        inputChange={nameChangeHandler}
        maxLength={16}
      />
      <InputInFind
        inputRef={emailRef}
        labelText={`Email`}
        inputId={`find-email`}
        inputType={`email`}
        placeHolder={`이메일을 입력해주세요.`}
        inputChange={emailChangeHandler}
        maxLength={50}
      />
      {isSuccess && (
        <div className={`font-dolbom-regular text-[1.3rem]`}>
          {`${nameInput} 님의 아이디는  `}
          <span className="blur-sm hover:blur-none duration-[0.3s] w-full inline font-[600] text-[1.7rem]">
            {`${userId}`}
          </span>
          {`  입니다.`}
        </div>
      )}
      <br />
      <div
        className={`box-border flex items-center justify-center bg-opacity-80 rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 font-hopang-black text-3xl border-[4px] shadow-xl duration-[0.66s] hover:scale-105 hover:skew-x-[-1deg] hover:skew-y-[-1deg] cursor-pointer ${btnClasses}`}
        onClick={findIDHandler}
      >
        {isError ? "에러!" : isLoading ? <SpinnerDots /> : "아이디 찾기"}
      </div>
    </>
  )
}

export default FindIDForm
