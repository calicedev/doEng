import React from "react"
import { Outlet } from "react-router-dom"
import BackgroundImg from "assets/MyPageBackground.png"
import MyPageNavigation from "components/MyPageComponents/common/MyPageNavigation"
import MyPageTab from "components/MyPageComponents/common/MyPageTab"

function MyPage() {
  return (
    <div
      className="flex flex-col w-full h-full p-5 bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <MyPageNavigation />
      <div className="flex flex-col overflow-y-auto relative w-full h-full px-5 pt-14 pb-5 border-2 border-orange-400 bg-yellow-100 rounded-lg">
        <MyPageTab />
        <Outlet />
      </div>
    </div>
  )
}

export default MyPage
