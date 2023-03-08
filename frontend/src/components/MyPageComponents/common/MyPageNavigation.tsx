import React from 'react'
import Logo from 'components/UI/Logo'
import IconButton from 'components/UI/IconButton'
import { BsArrowLeftCircle } from 'react-icons/bs'
import { BiUser } from 'react-icons/bi'
import { useNavigate } from 'react-router-dom'

export default function MyPageNavigation() {
  const navigate = useNavigate()

  return (
    <div className="flex justify-between items-center">
      <Logo />
      <div className="flex gap-10">
        <IconButton
          icon={<BsArrowLeftCircle />}
          label="메인으로"
          onClick={(e) => navigate('/')}
        />
        <IconButton
          icon={<BiUser />}
          label="로그아웃"
          onClick={(e) => navigate('/join/login')}
        />
      </div>
    </div>
  )
}
