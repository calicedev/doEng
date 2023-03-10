import React, { FC, PropsWithChildren } from "react"
import LogoImg from "assets/images/doEngLogo.png"
import { useNavigate } from "react-router-dom"

interface Props {
  width?: string // 로고의 너비
  height?: string // 로고의 높이
  disabled?: boolean // 로고 클릭 시 메인화면으로 이동 여부
}

const Logo: FC<PropsWithChildren<Props>> = function ({
  width = "200px",
  height = "100px",
  disabled = false,
}) {
  const navigate = useNavigate()

  // disabled 옵션에 따라 로고 클릭 가능 여부 결정
  const toMain = () => {
    if (disabled) return
    navigate("/")
  }

  return (
    <div
      className={`bg-contain bg-center bg-no-repeat cursor-pointer`}
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
