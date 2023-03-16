import ProfileEditForm from "components/MyPageComponents/ProfileEdit/ProfileEditForm"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"

function ProfileEditPage() {
  return (
    <div className="p-10">
      <ProfileHeader path="edit" />
      <ProfileEditForm />
    </div>
  )
}

export default ProfileEditPage
