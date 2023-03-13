import { PropsWithChildren, RefObject } from "react"

interface PropsInputInFind {
  inputRef: RefObject<HTMLInputElement>
  labelText: string
  inputId: string
  inputType: string
  placeHolder: string
  inputChange: () => void
  maxLength?: number
}

const InputInFind = function ({
  inputRef,
  labelText,
  inputId,
  inputType,
  placeHolder,
  inputChange,
  maxLength = 50,
}: PropsWithChildren<PropsInputInFind>) {
  return (
    <>
      <div
        className={`box-border flex rounded-full min-h-[45px] max-h-[80px] min-w-[288px] h-[8vh] max-w-[480px] w-[40vw] px-6 py-4 items-center shadow-xl duration-[0.44s] bg-white border-black-500 border-[4px]`}
      >
        <label
          className={`box-border h-full w-full flex items-center justify-center basis-1/5 font-semibold text-xl sm:text-3xl mobile:text-2xl font-hopang-white bg-white`}
          htmlFor={inputId}
        >
          {labelText}
        </label>
        <input
          ref={inputRef}
          id={inputId}
          type={inputType}
          className={`box-border w-full h-full flex items-center basis-4/5 text-sm sm:text-xl mobile:text-lg px-3 py-1 rounded-[8px] font-jalnan duration-[0.44s] bg-white`}
          placeholder={placeHolder}
          onChange={inputChange}
          maxLength={maxLength}
        />
      </div>
      <br />
    </>
  )
}

export default InputInFind
