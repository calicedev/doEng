import InputWithCert from "components/UI/InputWithCert"
import InputWithValidation from "components/UI/InputWithValidation"
import { useInput } from "hooks/useInput"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { useState, useEffect, PropsWithChildren, useRef } from "react"
import { findActions } from "store/findSlice"
import { idValidation, emailValidation } from "utils/validation"
import useINEP from "../../hooks/useINEP"

interface PropsFindPWEmailForm {}

const FindPWEmailForm = function ({}: PropsWithChildren<PropsFindPWEmailForm>) {
  const dispatch = useStoreDispatch()
  const idRef = useRef<HTMLInputElement>(null)

  const {
    inputData: idInput,
    isValid: idValid,
    validMessage: idValidMessage,
    onChangeHandler: idChangeHandler,
    onBlurHandler: idBlurHandler,
  } = useInput(idRef, idValidation, 16)
  const { id, email, isCert } = useStoreSelector((state) => state.find)
  useEffect(
    function () {
      const timeId = setTimeout(function () {
        dispatch(findActions.changeId({ idInput: idInput }))
      }, 200)
      return function () {
        clearTimeout(timeId)
      }
    },
    [idInput],
  )

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
      <InputWithCert htmlId={`email`} hookType={`email`} />
    </>
  )
}

export default FindPWEmailForm
