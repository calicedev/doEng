import React from 'react'
import { NavLink } from 'react-router-dom'

export default function MyPageTab() {
  const defaultClass =
    'flex-1 flex justify-center items-center text-lg font-bold '
  const activeClass = 'bg-orange-500 text-white'
  const inactiveClass =
    'bg-yellow-50 text-orange-500 border-orange-400 border-b-2'

  return (
    <div className={`flex absolute left-0 top-0 w-full h-10`}>
      <NavLink
        to="/mypage/progress"
        className={({ isActive }) =>
          defaultClass + (isActive ? activeClass : inactiveClass)
        }
      >
        학습 진행도
      </NavLink>
      <NavLink
        to="/mypage/talestore"
        className={({ isActive }) =>
          defaultClass + (isActive ? activeClass : inactiveClass)
        }
      >
        책 구매
      </NavLink>
      <NavLink
        to="/mypage/profile"
        className={({ isActive }) =>
          defaultClass + (isActive ? activeClass : inactiveClass)
        }
      >
        회원 정보
      </NavLink>
    </div>
  )
}
