import React, { FC, PropsWithChildren } from "react"
import { useEffect, useState, useCallback } from "react"

interface animationHook {
  (isOpened: boolean, appearClassName?: string, disappearClassName?: string): {
    isRender: boolean
    animationClasses: string
    animationEndHandler: () => void
  }
}

export const useAnimate: animationHook = function (
  opened,
  appearClassName = "animate-appear-from-bottom-fast",
  disappearClassName = "animate-disappear-to-bottom-fast",
) {
  const [isAnimate, setIsAnimate] = useState<boolean>(opened)
  const [isRender, setIsRender] = useState<boolean>(opened || isAnimate)
  const [animationClasses, setAnimationClasses] = useState<string>("")

  useEffect(
    function () {
      if (opened) {
        setIsAnimate(() => true)
        setAnimationClasses(() => appearClassName + ` `)
      } else {
        setAnimationClasses(() => disappearClassName + ` absolute`)
      }
    },
    [opened, appearClassName, disappearClassName],
  )

  useEffect(
    function () {
      setIsRender(() => opened || isAnimate)
    },
    [opened, isAnimate],
  )

  useEffect(
    function () {
      if (!isRender) {
        setAnimationClasses(() => "")
      }
    },
    [isRender],
  )

  // 열지 않기 원하는데 animation이 끝났을 때만 false로 바꿔준다.
  const animationEndHandler: () => void = useCallback(
    function () {
      if (opened === false) {
        setIsAnimate(() => false)
      }
    },
    [opened],
  )

  return {
    isRender,
    animationClasses,
    animationEndHandler,
  }
}
