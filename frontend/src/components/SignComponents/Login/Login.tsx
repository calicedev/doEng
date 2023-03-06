import { useRef } from "react"
import { useInput } from "../../../hooks/useInput"
import { idValidation, passwordValidation } from "../../../utils/validation"
import InputWithValidation from "../../UI/InputWithValidation"
import LogoImg from "../../../assets/doEngLogo.png"
import Button from "../../UI/Button"

function Login() {
  const idInputRef = useRef<HTMLInputElement>(null)
  const passwordRef = useRef<HTMLInputElement>(null)
  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idInputChangeHandler,
    onBlurHandler: idInputBlurHandler,
  } = useInput(idInputRef, idValidation, 16)
  const {
    inputData: passwordInput,
    isValid: passwordValid,
    validMessage: passwordValidMessage,
    onChangeHandler: passwordInputChangeHandler,
    onBlurHandler: passwordInputBlurHandler,
  } = useInput(passwordRef, passwordValidation, 16)

  const loginHandler = function () {}
  const goSignupHandler = function () {}
  const findIdHandler = function () {}

  return (
    <>
      <form
        className={`box-border flex flex-col gap-4 items-center justify-center`}
      >
        <img
          alt={`logo-img`}
          src={LogoImg}
          className={`max-w-[80vw] min-w-[350px] w-[30vw] p-5`}
        />
        <InputWithValidation
          inputRef={idInputRef}
          labelText="ID"
          inputId="id-input"
          inputType="text"
          placeHolder={`ID를 입력 바랍니다.`}
          validMessage={idValidMessage}
          isValid={idValid}
          inputChange={idInputChangeHandler}
          inputBlur={idInputBlurHandler}
          maxLength={16}
        />
        <InputWithValidation
          inputRef={passwordRef}
          labelText="PW"
          inputId="pw-input"
          inputType="password"
          placeHolder={`PW를 입력 바랍니다.`}
          validMessage={passwordValidMessage}
          isValid={passwordValid}
          inputChange={passwordInputChangeHandler}
          inputBlur={passwordInputBlurHandler}
          maxLength={16}
        />
      </form>
    </>
  )
}

export default Login
