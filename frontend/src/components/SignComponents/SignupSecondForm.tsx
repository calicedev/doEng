import { SpinnerDots } from "components/UI/Spinner"
import { PropsWithChildren, RefObject } from "react"
import InputInSignup from "../UI/InputInSignup"

interface PropsSignupSecondForm {
  toggleStep: () => void
  nickRef: RefObject<HTMLInputElement>
  nickValid: boolean | null
  nickValidMessage: string
  nickChangeHandler: () => void
  nickBlurHandler: () => void
  idRef: RefObject<HTMLInputElement>
  idValid: boolean | null
  idValidMessage: string
  idChangeHandler: () => void
  idBlurHandler: () => void
  pw1Ref: RefObject<HTMLInputElement>
  pw1Valid: boolean | null
  pw1ValidMessage: string
  pw1ChangeHandler: () => void
  pw1BlurHandler: () => void
  pw2Ref: RefObject<HTMLInputElement>
  pw2Valid: boolean | null
  pw2ValidMessage: string
  pw2ChangeHandler: () => void
  pw2BlurHandler: () => void
  signupHandler: () => void
  signupBtnClasses: string
  signupBtnLoading: boolean
  signupBtnError: boolean
  nickDupValid: boolean | null
  idDupValid: boolean | null
}

const SignupSecondForm = function ({
  toggleStep,
  nickRef,
  nickValid,
  nickValidMessage,
  nickChangeHandler,
  nickBlurHandler,
  idRef,
  idValid,
  idValidMessage,
  idChangeHandler,
  idBlurHandler,
  pw1Ref,
  pw1Valid,
  pw1ValidMessage,
  pw1ChangeHandler,
  pw1BlurHandler,
  pw2Ref,
  pw2Valid,
  pw2ValidMessage,
  pw2ChangeHandler,
  pw2BlurHandler,
  signupHandler,
  signupBtnClasses,
  signupBtnLoading,
  signupBtnError,
  nickDupValid,
  idDupValid,
}: PropsWithChildren<PropsSignupSecondForm>) {
  return (
    <div className="flex flex-col items-center justify-center">
      <br />
      <br />
      <InputInSignup
        inputRef={nickRef}
        labelText={`nick`}
        inputId={`signup-nick`}
        inputType={`text`}
        additionalClasses={``}
        placeHolder={`닉네임을 입력하세요.`}
        validMessage={nickValidMessage}
        isValid={nickValid}
        inputChange={nickChangeHandler}
        inputBlur={nickBlurHandler}
        maxLength={16}
      />
      <InputInSignup
        inputRef={idRef}
        labelText={`id`}
        inputId={`signup-id`}
        inputType={`text`}
        additionalClasses={``}
        placeHolder={`아이디를 입력하세요.`}
        validMessage={idValidMessage}
        isValid={idValid}
        inputChange={idChangeHandler}
        inputBlur={idBlurHandler}
        maxLength={16}
      />
      <InputInSignup
        inputRef={pw1Ref}
        labelText={`pw1`}
        inputId={`signup-pw1`}
        inputType={`password`}
        additionalClasses={``}
        placeHolder={`비밀번호를 입력하세요.`}
        validMessage={pw1ValidMessage}
        isValid={pw1Valid}
        inputChange={pw1ChangeHandler}
        inputBlur={pw1BlurHandler}
        maxLength={16}
      />
      <InputInSignup
        inputRef={pw2Ref}
        labelText={`pw2`}
        inputId={`signup-pw2`}
        inputType={`password`}
        additionalClasses={``}
        placeHolder={`비밀번호 확인을 입력하세요.`}
        validMessage={pw2ValidMessage}
        isValid={pw2Valid}
        inputChange={pw2ChangeHandler}
        inputBlur={pw2BlurHandler}
        maxLength={16}
      />
      <div
        className={`box-border flex items-center justify-center rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[7.1vh] max-w-[700px] w-[43vw] px-5 py-[5px] shadow-xl duration-[0.33s] border-[4px] cursor-pointer text-3xl font-hopang-black drop-shadow-lg hover:scale-[102%] ${signupBtnClasses}`}
        onClick={signupHandler}
      >
        {signupBtnError ? (
          `회원가입 에러`
        ) : signupBtnLoading ? (
          <SpinnerDots />
        ) : (
          `회원 가입`
        )}
      </div>
      <div
        className={`box-border min-h-[20px] max-h-[40px] min-w-[288px] h-[5vh] max-w-[700px] w-[52vw] px-4 pt-2 items-center text-lg sm:text-[1rem] mobile:text-sm duration-[0.44s] font-dolbom-regular`}
      ></div>
    </div>
  )
}

export default SignupSecondForm
