import { useInput } from "hooks/useInput"
import { useRef, useEffect } from "react"

const TestInput = function () {
  // input Element에 붙일 RefObject
  const inputRef = useRef<HTMLInputElement>(null)
  // useinput Hook으로 받아온 값과 함수
  const { inputData, onChangeHandler, setFirstData } = useInput(inputRef)

  // 렌더링 시 첫 값 설정
  useEffect(function () {
    setFirstData("하이요")
  }, [])

  // 입력마다 저장된 값 출력
  useEffect(
    function () {
      console.log(inputData)
    },
    [inputData],
  )

  return (
    <>
      <input ref={inputRef} onChange={onChangeHandler} />
    </>
  )
}

export default TestInput
