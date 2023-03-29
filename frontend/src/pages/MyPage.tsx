import React, { useEffect } from "react"
import { Outlet, useNavigate } from "react-router-dom"
import BackgroundImg from "assets/images/MyPageBackground.png"
import MyPageNavigation from "components/MyPageComponents/common/MyPageNavigation"
import MyPageTab from "components/MyPageComponents/common/MyPageTab"
import { useStoreDispatch, useStoreSelector } from "hooks/useStoreSelector"
import { passwordActions } from "store/passwordSlice"

function MyPage() {
  const { isCert } = useStoreSelector((state) => state.password)
  const navigate = useNavigate()
  const dispatch = useStoreDispatch()

  return (
    <div
      className="flex flex-col gap-2 w-full h-full p-5 bg-cover bg-center bg-no-repeat "
      style={{
        backgroundImage: `url(${BackgroundImg})`,
      }}
    >
      <MyPageNavigation />
      <div
        id={`mypage-container`}
        className={`flex flex-col overflow-hidden relative w-full h-full border-2 border-orange-400 bg-yellow-50 rounded-lg bg-opacity-[0.85]`}
      >
        <MyPageTab />
        <Outlet />
      </div>
    </div>
  )
}

export default MyPage
