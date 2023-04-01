import { Outlet } from "react-router-dom"
import BackgroundImg from "assets/images/MyPageBackground.png"
import { useStoreSelector } from "hooks/useStoreSelector"
import MyPasswordPage from "pages/MyPasswordPage"
import MyPageTab from "components/MyPageComponents/common/MyPageTab"
import MyPageNavigation from "components/MyPageComponents/common/MyPageNavigation"

function MyPage() {
  const { isCert, isGoogle } = useStoreSelector((state) => state.password)

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
        {isCert || isGoogle ? (
          <>
            <MyPageTab />
            <Outlet />
          </>
        ) : (
          <MyPasswordPage />
        )}
      </div>
    </div>
  )
}

export default MyPage
