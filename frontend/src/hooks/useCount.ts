import { useEffect, useState } from "react"

const useCount = function (wannaCount: number) {
  const [cnt, setCnt] = useState<number>(wannaCount)
  const [isStart, setIsStart] = useState<boolean>(false)
  const [isEnd, setIsEnd] = useState<boolean>(false)

  const cntStartHandler = function () {
    setIsEnd(() => false)
    setIsStart(() => true)
  }
  const cntResetHandler = function () {
    setCnt(() => wannaCount)
    setIsEnd(() => false)
    setIsStart(() => false)
  }

  useEffect(
    function () {
      if (isStart) {
        const id = setTimeout(function () {
          setCnt((val) => val - 1)
        })
        return function () {
          clearTimeout(id)
        }
      }
    },
    [cnt, isStart],
  )

  useEffect(
    function () {
      if (!cnt) {
        setIsStart(() => false)
        setIsEnd(() => true)
      }
    },
    [cnt],
  )

  return {
    cntStartHandler,
    cntResetHandler,
    isEnd,
  }
}

export default useCount
