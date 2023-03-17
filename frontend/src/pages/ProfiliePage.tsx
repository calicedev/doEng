import Profile from "components/MyPageComponents/Profile/Profile"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"
import React from "react"

export default function ProfiliePage() {
  return (
    <div className="p-10">
      <ProfileHeader path="profile" />
      <Profile />
    </div>
  )
}
