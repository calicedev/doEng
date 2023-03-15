import Profile from "components/MyPageComponents/Profile/Profile"
import React from "react"
import { Outlet } from "react-router-dom"

export default function ProfiliePage() {
  return (
    <div>
      <Profile />
      <Outlet />
    </div>
  )
}
