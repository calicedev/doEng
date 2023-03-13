import InputWithValidation from "components/UI/InputWithValidation"
import { useInput } from "hooks/useInput"
import { useState, useEffect, PropsWithChildren, useRef } from "react"
import { idValidation, emailValidation } from "utils/validation"
import useINEP from "../../hooks/useINEP"

interface PropsFindPWEmailForm {
  certHandler: (isSuccess: boolean) => void
}

const FindPWEmailForm = function ({
  certHandler,
}: PropsWithChildren<PropsFindPWEmailForm>) {
  const idRef = useRef<HTMLInputElement>(null)
  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idChangeHandler,
    onBlurHandler: idBlurHandler,
  } = useInput(idRef, idValidation, 16)

  return (
    <>
      <InputWithValidation
        inputRef={idRef}
        labelText={`ID`}
        inputId={`find-id-input`}
        inputType={`text`}
        additionalClasses={``}
        placeHolder={`ID를 입력 해주세요.`}
        validMessage={idValidMessage}
        isValid={idValid}
        inputChange={idChangeHandler}
        inputBlur={idBlurHandler}
        maxLength={50}
      />
      <div>이메일 인증</div>
      <div>이메일 인증</div>
      <div>이메일 인증</div>
    </>
  )
}

export default FindPWEmailForm
