import React from "react"
import { useEffect, useState, useCallback } from "react"

interface animationHook {
  (
    isOpened: boolean,
    compo: JSX.Element,
    appearClassName?: string,
    disappearClassName?: string
  ): {
    isRender: boolean
    animationComp: () => JSX.Element
  }
}

export const useAnimation: animationHook = function (
  opened,
  compo,
  appearClassName = "animate-appear-from-bottom",
  disappearClassName = "animate-disappear-to-bottom"
) {
  const [isAnimate, setIsAnimate] = useState<boolean>(opened)
  const [isRender, setIsRender] = useState<boolean>(opened || isAnimate)
  const [animationClasses, setAnimationClasses] = useState<string>("")

  useEffect(
    function () {
      if (opened) {
        setIsAnimate(() => true)
        setAnimationClasses(() => appearClassName)
      } else {
        setAnimationClasses(() => disappearClassName)
      }
    },
    [opened, appearClassName, disappearClassName]
  )

  useEffect(
    function () {
      setIsRender(() => opened || isAnimate)
    },
    [opened, isAnimate]
  )

  useEffect(
    function () {
      if (!isRender) {
        setAnimationClasses(() => "")
      }
    },
    [isRender]
  )

  // 열지 않기 원하는데 animation이 끝났을 때만 false로 바꿔준다.
  const animationEndHandler: () => void = useCallback(
    function () {
      if (opened === false) {
        setIsAnimate(() => false)
      }
    },
    [opened]
  )
  // JSX Element 외에도 ReactNode[] 등 여러가지 확인해봐야 할 듯.
  const animationComp: () => JSX.Element = useCallback(
    function () {
      return React.createElement(
        "div",
        {
          className: `empty-box ${animationClasses}`,
          onAnimationEnd: animationEndHandler,
        },
        compo
      )
    },
    [animationClasses, animationEndHandler, compo]
  )

  // const animationCompo = function():JSX.Element {
  //   return (
  //       <div className=`empty-box ${animationClasses}` onAnimationEnd={animationEndHandler}>{compo}</div>
  //     )
  // }

  return {
    isRender,
    animationComp,
  }
}
