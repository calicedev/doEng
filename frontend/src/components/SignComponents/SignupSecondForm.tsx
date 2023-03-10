import { PropsWithChildren } from "react"
import InputInSignup from "../UI/InputInSignup"
import InputWithValidation from "../UI/InputWithValidation"

interface PropsSignupSecondForm {
  toggleStep: () => void
}

const SignupSecondForm = function ({
  toggleStep,
}: PropsWithChildren<PropsSignupSecondForm>) {
  return (
    <form>
      <div>
        <label>이메일</label>
        <input />
      </div>
      <div>
        <div>
          <div>
            <label>이메일</label>
            <input />
          </div>
          <button>요청 버튼</button>
        </div>
        <div>
          <div>
            <label>이메일 인증</label>
            <input />
          </div>
          <button>인증 버튼</button>
        </div>
      </div>
      <div>
        <div>
          <div>
            <label>폰</label>
            <input />
          </div>
          <button>요청 버튼</button>
        </div>
        <div>
          <div>
            <label>폰</label>
            <input />
          </div>
          <button>인증 버튼</button>
        </div>
      </div>
      <div>다음</div>
      {/* <InputWithValidation
        inputRef={}
        labelText={}
        inputId={}
        inputType={``}
        placeHolder={`값을 입력 바랍니다.`}
        validMessage={}
        isValid={}
        inputChange={}
        inputBlur={}
        maxLength={16}
      /> */}
    </form>
  )
}

export default SignupSecondForm
