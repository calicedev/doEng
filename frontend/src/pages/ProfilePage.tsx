import ProfileInfo from "components/MyPageComponents/Profile/ProfileInfo"
import ProfileHeader from "components/MyPageComponents/common/ProfileHeader"
import React from "react"
import Profile from "components/MyPageComponents/Profile/ProfilePassword"

export default function ProfilePage() {
  return (
    <div className="overflow-y-auto h-full w-full px-8 pt-8 pb-0 sm:px-16">
      <ProfileHeader path="profile" />
      <ProfileInfo />
    </div>
  )
}
