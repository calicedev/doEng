import React, { FC, PropsWithChildren, MouseEvent, ReactNode } from 'react'

interface Props {
  icon: ReactNode
  label: string
  onClick?: (e: MouseEvent<HTMLElement>) => void
  size?: 'small' | 'medium' | 'large'
  colorClass?: string
  disabled?: boolean
  labelPosition?: 'up' | 'down' | 'left' | 'right'
}

const IconButton: FC<PropsWithChildren<Props>> = function ({
  icon,
  label,
  onClick = () => {},
  size = 'medium',
  colorClass = 'text-yellow-100',
  disabled = false,
  labelPosition = 'down',
}) {
  let positionClass = ''
  switch (labelPosition) {
    case 'down':
      positionClass = 'flex-col'
      break
    case 'right':
      positionClass = 'flex-row'
      break
    case 'left':
      positionClass = 'flex-row-reverse'
      break
    case 'up':
      positionClass = 'flex-col-reverse'
      break
  }

  let sizeClass = ''
  switch (size) {
    case 'small':
      sizeClass = 'text-base'
      break
    case 'medium':
      sizeClass = 'text-lg'
      break
    case 'large':
      sizeClass = 'text-xl'
      break
  }

  const handleClick = (e: MouseEvent<HTMLElement>) => {
    if (disabled) return
    onClick(e)
  }

  return (
    <div
      className={`flex ${positionClass} ${colorClass} ${sizeClass} justify-center items-center cursor-pointer`}
      onClick={handleClick}
    >
      {icon}
      {label ? <div>{label}</div> : null}
    </div>
  )
}

export default IconButton
