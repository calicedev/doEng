import { useRef } from "react"
import { useInput } from "../../../hooks/useInput"
import { idValidation } from "../../../utils/validation"

function Login() {
  const idInputRef = useRef<HTMLInputElement>(null)
  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idInputChangeHandler,
    onBlurHandler: idInputBlurHandler,
  } = useInput(idInputRef, idValidation)

  return (
    <div>
      <form>
        <input
          ref={idInputRef}
          type={`text`}
          onChange={idInputChangeHandler}
          onBlur={idInputBlurHandler}
        />
      </form>
      <div>로그인</div>
    </div>
  )
}

export default Login
