import ProfilePassword from "components/MyPageComponents/Profile/ProfilePassword"
import AnimationBox from "components/UI/AnimationBox"
import CommonLoading from "components/UI/CommonLoading"
import { useUserData } from "hooks/queries/queries"
import { useStoreSelector } from "hooks/useStoreSelector"
import { Navigate } from "react-router-dom"

function MyPasswordPage() {
  const { data: userData } = useUserData()
  const { isCert, isGoogle } = useStoreSelector((state) => state.password)

  if (!userData) {
    return (
      <CommonLoading>
        <AnimationBox boxClasses="h-full w-full flex items-center justify-center text-[44px]">
          로그인 바랍니다!
        </AnimationBox>
      </CommonLoading>
    )
  }
  if (isCert || isGoogle) {
    return <Navigate to={`progress`} />
  }
  return (
    <div className="h-full w-full flex flex-col items-center justify-center">
      <div className="text-[43px] font-jalnan">비밀번호를 입력바랍니다</div>
      <ProfilePassword />
    </div>
  )
}

export default MyPasswordPage
