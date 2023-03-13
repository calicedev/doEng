import { useState, useEffect } from "react"
import { idValidation, emailValidation } from "utils/validation"
import useINEP from "../../hooks/useINEP"

interface PropsFindPWEmailForm {
  certHandler: (isSuccess: boolean) => void
}

const FindPWEmailForm = function () {
  return (
    <>
      <div>이메일 인증</div>
      <div>이메일 인증</div>
      <div>이메일 인증</div>
    </>
  )
}

export default FindPWEmailForm
