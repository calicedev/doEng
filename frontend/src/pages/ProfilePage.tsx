import ProfileInfo from "components/MyPageComponents/Profile/ProfileInfo"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"
import React from "react"
import Profile from "components/MyPageComponents/Profile/ProfilePassword"

export default function ProfilePage() {
  return (
    <div className="p-10">
      <ProfileHeader path="profile" />
      {/* <Profile /> */}
      <ProfileInfo />
    </div>
  )
}
