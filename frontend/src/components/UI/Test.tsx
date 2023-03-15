import { useInput } from "hooks/useInput"
import { useRef, useEffect } from "react"
import AnimationBox from "./AnimationBox"

const Test = function () {
  const inputRef = useRef<HTMLInputElement>(null)
  const { onChangeHandler, inputData, setFirstData } = useInput(inputRef)
  useEffect(function () {
    setFirstData("asdf")
  }, [])
  return (
    <>
      <AnimationBox isOpened={true}></AnimationBox>
      <input ref={inputRef} onChange={onChangeHandler} />
    </>
  )
}

export default Test
