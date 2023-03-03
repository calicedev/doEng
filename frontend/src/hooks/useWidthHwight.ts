import { RefObject, useEffect, useState } from "react" //

interface useWidthHeightHook {
  (ref: RefObject<HTMLElement>): { width: number; height: number }
}

export const useWidthHeight: useWidthHeightHook = function (ref) {
  const [width, setWidth] = useState<number>(0)
  const [height, setHeight] = useState<number>(0)

  useEffect(function () {
    const setCustomWidthHeight: () => void = function () {
      if (ref.current) {
        setWidth(() => ref.current?.offsetWidth || 0)
        setHeight(() => ref.current?.offsetHeight || 0)
      }
    }
    setCustomWidthHeight()
    window.addEventListener("resize", setCustomWidthHeight)
    return function () {
      window.removeEventListener("resize", setCustomWidthHeight)
    }
  }, [])

  return { width, height }
}
