import { FC, PropsWithChildren, MouseEvent } from "react"

interface Props {
  buttonName: string
  className: string
  onClick: (e: MouseEvent<HTMLButtonElement>) => void
}

const Button: FC<PropsWithChildren<Props>> = function ({
  buttonName,
  className,
  onClick,
}) {
  return (
    <button onClick={onClick} className={`${className}`}>
      {buttonName}
    </button>
  )
}

export default Button
