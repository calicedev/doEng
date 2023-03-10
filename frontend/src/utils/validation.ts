/* eslint-disable */
const engCheck = /[a-z]/
const upperCheck = /[A-Z]/
const numCheck = /[0-9]/
const speCheck = /[,~!@#/$%^&.*()_\`\=+|<>?:\{\}\[\]\\'"-]/

export interface validationFunctionInterface {
  (val: string): { status: boolean; message: string }
}
// 아이디 유효성 검사
// 길이는 4이상 16이하, 영어 + 숫자로만 가능.
const idValidation: validationFunctionInterface = function idValidation(val) {
  const idRegExp = /[A-Za-z0-9]{4,16}/
  if (val.trim().length === 0) {
    return { status: false, message: "ID는 필수 입력란입니다." }
  }
  if (val.trim().length < 4 || val.trim().length > 16) {
    return {
      status: false,
      message: "4자 이상 16자 이하의 ID를 입력해주세요.",
    }
  } else if (val.search(/\s/) !== -1) {
    return {
      status: false,
      message: "ID에 공백은 허용되지 않습니다. 공백을 제거 해주세요.",
    }
  } else if (speCheck.test(val)) {
    return {
      status: false,
      message:
        "ID에 특수문자는 허용되지 않습니다. 특수문자를 제외하고 입력 해주세요.",
    }
  } else if (idRegExp.test(val)) {
    return { status: true, message: "유효한 ID 입니다." }
  }
  return { status: false, message: "유효한 ID 형태를 입력해주세요." }
}

// 이메일 유효성 검사
// 형태 검사만 하므로, 인증까지 받아줘야 함.
const emailValidation: validationFunctionInterface = function (email) {
  const regex =
    /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*\.[a-zA-Z]{2,3}$/i
  if (email.trim().length === 0) {
    return { status: false, message: "이메일은 필수 입력 값입니다." }
  }
  if (email.trim().length !== 0 && regex.test(email)) {
    return { status: true, message: "유효한 이메일 형식입니다." }
  }
  return { status: false, message: "유효하지 않은 이메일 형식입니다." }
}

// 비번 유효성 검사
// 특문과 숫자 필수, 길이는 8~16자
const passwordValidation: validationFunctionInterface = function (val) {
  if (val.trim().length === 0) {
    return { status: false, message: "비밀번호는 필수 입력란입니다." }
  } else if (val.trim().length < 8) {
    return {
      status: false,
      message: "비밀번호는 8자 이상 16자 이하여야 합니다.",
    }
  }
  if (!speCheck.test(val)) {
    return { status: false, message: "특수문자를 포함해야 합니다." }
  } else if (!numCheck.test(val)) {
    return { status: false, message: "숫자를 포함해야 합니다." }
  }
  const passwordRules =
    /^(?=.*[a-zA-Z])(?=.*[,~!@#/$%^&.*()_\`\=+|<>?:\{\}\[\]\\'"-])(?=.*[0-9]).{8,16}$/
  if (passwordRules.test(val)) {
    return { status: true, message: "유효한 비밀번호입니다." }
  }
  return { status: false, message: "유효하지 않은 비밀번호입니다." }
}

// 닉네임 유효성 검사
// 현재 2~8글자, 특문x 조건만 들어감.
const nicknameValidation: validationFunctionInterface = function (val) {
  if (val.trim().length === 0) {
    return { status: false, message: "닉네임은 필수 입력란입니다." }
  }
  const nicknameRegExp = /[a-zA-Z0-9가-힣]{2,8}$/
  if (nicknameRegExp.test(val)) {
    return { status: true, message: "유효한 닉네임 입니다." }
  }
  return { status: false, message: "특수문자를 제외한 2~8자로 입력 바랍니다." }
}

// 이름 유효성 검사
// 특문, 숫자, 공백 불가, 한글만 가능.
const nameValidation: validationFunctionInterface = function (val) {
  const nameReg = /^[가-힣]{2,8}$/
  if (val.trim().length === 0) {
    return { status: false, message: "이름은 필수 입력란입니다." }
  } else if (speCheck.test(val)) {
    return { status: false, message: "특수 문자는 허용되지 않습니다." }
  } else if (numCheck.test(val)) {
    return { status: false, message: "이름에 숫자는 허용되지 않습니다." }
  } else if (val.search(/\s/) !== -1) {
    return { status: false, message: "이름에 공백은 허용되지 않습니다." }
  }
  if (nameReg.test(val)) {
    return { status: true, message: "유효한 이름 입니다." }
  }
  return { status: false, message: "유효한 이름을 입력 바랍니다." }
}

const phoneValidation: validationFunctionInterface = function (val) {
  const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{3,4}-?([0-9]{4}))$/
  if (phoneRegExp.test(val)) {
    return { status: true, message: "유효한 핸드폰 번호입니다." }
  }
  return { status: false, message: "01X-XXXX-XXXX 형태로 입력 바랍니다." }
}

export {
  idValidation,
  passwordValidation,
  emailValidation,
  nicknameValidation,
  nameValidation,
  phoneValidation,
}
