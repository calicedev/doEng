import { FC, PropsWithChildren, memo } from "react"
import { useAnimate } from "../../hooks/useAnimate"
import { useInput } from "../../hooks/useInput"

type AnimateBoxProps = {
  isOpened: boolean
  appearClassName?: string
  disappearClassName?: string
  boxClasses?: string
}

const AnimationBox: FC<PropsWithChildren<AnimateBoxProps>> = function ({
  isOpened,
  children,
  appearClassName,
  disappearClassName,
  boxClasses,
}) {
  const { isRender, animationClasses, animationEndHandler } = useAnimate(
    isOpened,
    appearClassName,
    disappearClassName
  )
  return (
    <>
      {isRender && (
        <div
          className={`empty-box ${boxClasses} ${animationClasses}`}
          onAnimationEnd={animationEndHandler}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default memo(AnimationBox)
