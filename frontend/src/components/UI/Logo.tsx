import React, { FC, PropsWithChildren } from 'react'
import LogoImg from 'assets/doEngLogo.png'
import { useNavigate } from 'react-router-dom'

interface Props {
  width?: string
  height?: string
  disabled?: boolean
}

const Logo: FC<PropsWithChildren<Props>> = function ({
  width = '200px',
  height = '100px',
  disabled = false,
}) {
  const navigate = useNavigate()

  const toMain = () => {
    if (disabled) return
    navigate('/')
  }

  return (
    <div
      className={`bg-contain bg-no-repeat cursor-pointer`}
      onClick={toMain}
      style={{
        width: width,
        height: height,
        backgroundImage: `url(${LogoImg})`,
      }}
    />
  )
}

export default Logo

// Logo.defaultProps = {
//   width: '50px',
//   height: '20px',
//   disabled: false,
// }
