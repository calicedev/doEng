import ProfilePwdEditForm from "components/MyPageComponents/ProfilePassword/ProfilePwdEditForm"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"

function ProfilePwdEditPage() {
  return (
    <div className="overflow-y-auto h-full w-full px-8 pt-8 pb-0 sm:px-16">
      <ProfileHeader path="password" />
      <ProfilePwdEditForm />
    </div>
  )
}

export default ProfilePwdEditPage
