import ProfilePwdEditForm from "components/MyPageComponents/ProfilePassword/ProfilePwdEditForm"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"

function ProfilePwdEditPage() {
  return (
    <div className="p-10 h-full">
      <ProfileHeader path="password" />
      <ProfilePwdEditForm />
    </div>
  )
}

export default ProfilePwdEditPage
