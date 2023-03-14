import Profile from "components/MyPageComponents/Profile/Profile"
import React from "react"
import { Outlet } from "react-router-dom"

export default function ProfiliePage() {
  return (
    <div>
      <div>ProfiliePage</div>
      <Profile />
      <Outlet />
    </div>
  )
}
