import React from 'react'
import { Outlet } from 'react-router-dom'
import BackgroundImg from 'assets/MyPageBackground.png'
import MyPageNavigation from 'components/MyPageComponents/common/MyPageNavigation'
import MyPageTab from 'components/MyPageComponents/common/MyPageTab'

function MyPage() {
  return (
    <div
      className="flex flex-col p-5 w-full h-full"
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <MyPageNavigation />
      <Outlet />
    </div>
  )
}

export default MyPage
