import ProfileEditForm from "components/MyPageComponents/ProfileEdit/ProfileEditForm"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"

function ProfileEditPage() {
  return (
    <div className="overflow-y-auto h-full w-full px-8 pt-8 pb-0 sm:px-16">
      <ProfileHeader path="edit" />
      <ProfileEditForm />
    </div>
  )
}

export default ProfileEditPage
