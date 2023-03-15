import { FC, PropsWithChildren, RefObject, useEffect, useState } from "react"

interface Props {
  inputRef: RefObject<HTMLInputElement>
  labelText: string
  inputId: string
  inputType: string
  additionalClasses?: string
  placeHolder?: string
  validMessage?: string
  isValid: boolean | null
  inputChange: () => void
  inputBlur?: () => void
  maxLength?: number
  tabIndex?: number
  dupValid?: boolean | null
}

const InputInSignup = function ({
  inputRef,
  labelText,
  inputId,
  inputType,
  additionalClasses = ``,
  placeHolder = "값을 입력 바랍니다.",
  validMessage,
  isValid,
  inputChange,
  inputBlur = () => {},
  maxLength = 50,
  tabIndex = 0,
  children,
  dupValid = true,
}: PropsWithChildren<Props>) {
  const [bgClasses, setBgClasses] = useState<string>("bg-white")
  const [textClasses, setTextClasses] = useState<string>("text-black")
  const [borderClasses, setBorderClasses] = useState<string>(
    "border-black-500 border-[4px]",
  )
  useEffect(
    function () {
      if (isValid === null) {
        setBgClasses(() => `bg-white`)
        setTextClasses(() => `text-black`)
        setBorderClasses(() => `border-black-500 border-[4px]`)
      } else if (isValid === true && dupValid === true) {
        setBgClasses(() => `bg-blue-200`)
        setTextClasses(() => `text-blue-900`)
        setBorderClasses(() => `border-blue-500 border-[4px]`)
      } else if (isValid === false || dupValid === false) {
        setBgClasses(() => `bg-red-200`)
        setTextClasses(() => `text-red-900`)
        setBorderClasses(() => `border-red-500 border-[4px]`)
      } else {
        setBgClasses(() => `bg-white`)
        setTextClasses(() => `text-black`)
        setBorderClasses(() => `border-black-500 border-[4px]`)
      }
    },
    [isValid],
  )
  return (
    <div>
      <div
        className={`box-border flex rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[7.1vh] max-w-[700px] w-[47vw] px-5 py-[5px] items-center shadow-xl duration-[0.44s] ${bgClasses} ${borderClasses} hover:scale-[102%] duration-[0.33s]`}
      >
        <label
          htmlFor={`${inputId}`}
          className={`box-border h-full w-full flex items-center justify-center basis-[17%] font-semibold text-xl sm:text-3xl mobile:text-2xl font-hopang-white`}
        >
          {labelText}
        </label>
        <input
          ref={inputRef}
          id={`${inputId}`}
          type={`${inputType}`}
          onChange={inputChange}
          onBlur={inputBlur}
          placeholder={placeHolder}
          className={`box-border w-full h-full flex items-center basis-[66%] text-sm sm:text-xl mobile:text-lg px-3 py-1 rounded-[8px] font-jalnan duration-[0.44s] mr-2 ${bgClasses} ${textClasses}`}
          maxLength={maxLength}
          tabIndex={tabIndex}
        />
        {children}
      </div>
      <div
        className={`box-border min-h-[20px] max-h-[40px] min-w-[288px] h-[5vh] max-w-[700px] w-[47vw] px-4 pt-2 items-center text-lg sm:text-[1rem] mobile:text-sm duration-[0.44s] font-dolbom-regular ${textClasses}`}
      >
        {validMessage}
      </div>
    </div>
  )
}

export default InputInSignup
