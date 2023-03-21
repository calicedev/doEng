import { FC, PropsWithChildren, memo } from "react"
import { useAnimate } from "../../hooks/useAnimate"

type AnimateBoxProps = {
  isOpened?: boolean
  appearClassName?: string
  disappearClassName?: string
  boxClasses?: string
}

const AnimationBox: FC<PropsWithChildren<AnimateBoxProps>> = function ({
  isOpened = true,
  children,
  appearClassName,
  disappearClassName,
  boxClasses,
}) {
  const { isRender, animationClasses, animationEndHandler } = useAnimate(
    isOpened,
    appearClassName,
    disappearClassName,
  )
  return (
    <>
      {isRender && (
        <div
          className={`${animationClasses} ${boxClasses}`}
          onAnimationEnd={animationEndHandler}
        >
          {children}
        </div>
      )}
    </>
  )
}

export default memo(AnimationBox)
