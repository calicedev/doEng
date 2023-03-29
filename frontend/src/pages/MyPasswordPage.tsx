import ProfilePassword from "components/MyPageComponents/Profile/ProfilePassword"
import { useStoreSelector } from "hooks/useStoreSelector"
import { Navigate } from "react-router-dom"

function MyPasswordPage() {
  const { isCert } = useStoreSelector((state) => state.password)

  if (isCert) {
    return <Navigate to={`progress`} />
  }
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="text-[43px] font-jalnan">비밀번호를 입력바랍니다.</div>
      <ProfilePassword />
    </div>
  )
}

export default MyPasswordPage
