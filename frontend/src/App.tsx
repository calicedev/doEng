import { Routes, Route } from "react-router-dom"
import "./App.css"
import Login from "./components/SignComponents/Login"
import Signup from "./components/SignComponents/Signup"
import HomePage from "./pages/HomePage"
import SignPage from "./pages/SignPage"
import MyPage from "./pages/MyPage"
import TaleStorePage from "./pages/TaleStorePage"
import ProgressListPage from "./pages/ProgressListPage"
import ProgressDetailPage from "pages/ProgressDetailPage"
import ProfilePage from "pages/ProfilePage"
import Find from "./components/SignComponents/Find"
import axios from "axios"
import TaleDetailPage from "pages/TaleDetailPage"
import NotFoundPage from "pages/NotFoundPage"
import Toast from "components/UI/Toast"
import ProfileInfo from "components/MyPageComponents/Profile/ProfileInfo"
import ProfileEditPage from "pages/ProfileEditPage"
import ProfilePwdEditPage from "pages/ProfilePwdEditPage"
import ProtectedRoute from "components/UI/ProtectedRoute"
import PlayTalePage from "pages/PlayTalePage"
import PlayTaleList from "components/PlayTaleComponents/PlayTaleList"
import InteractionComp from "components/PlayTaleComponents/InteractionComp"
import SceneParent from "components/PlayTaleComponents/SceneParent"

import { useEffect } from "react"
import { useStoreDispatch } from "hooks/useStoreSelector"
import { toastActions } from "store/toastSlice"
import PayBridgePage from "pages/PayBridgePage"

// // ProtectedRoute 사용법
// const TestApp = function () {
//   return (
//     <div>
//       <Route element={<ProtectedRoute />}> // 보호 할 라우트 정의
//         <Route path={``} element={<SignPage />} /> // 네스티드
//       </Route>
//     </div>
//   )
// }

function App() {
  // axios.defaults.baseURL(``)
  const dispatch = useStoreDispatch()
  useEffect(function () {
    dispatch(toastActions.toastOff({}))
  }, [])
  return (
    <div className="App">
      <Toast />
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/member`} element={<SignPage />}>
          <Route path={``} element={<Login />} />
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<Signup />} />
          <Route path={`find`} element={<Find />} />
          <Route path={`google`} element={<Find />} />
        </Route>
        <Route path={`/mypage`} element={<MyPage />}>
          <Route path={``} element={<ProgressListPage />} />
          <Route path={`progress`} element={<ProgressListPage />} />
          <Route path={`progress/:taleId`} element={<ProgressDetailPage />} />
          <Route path={`talestore`} element={<TaleStorePage />} />
          <Route path={`talestore/:taleId`} element={<TaleDetailPage />} />
          <Route path={`profile`} element={<ProfilePage />} />
          <Route path={`profile/info`} element={<ProfileInfo />} />
          <Route path={`profile/edit`} element={<ProfileEditPage />} />
          <Route path={`profile/password`} element={<ProfilePwdEditPage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path={`playtale`} element={<PlayTalePage />}>
            <Route path={``} element={<PlayTaleList />} />
            <Route
              path={`:taleId/:sceneOrder`}
              element={<SceneParent />}
            ></Route>
          </Route>
        </Route>
        <Route path={`pay`} element={<ProtectedRoute />}>
          <Route path=":isSuccess" element={<PayBridgePage />} />
          {/* <Route
            path={`success/:taleId`}
            element={
              <div>
                결제 되셨구요 엘리턴트는 바꾸셔야 합니다. pg_token? 옵니다.
              </div>
            }
          />
          <Route
            path={`fail/:taleId`}
            element={<div>결제 안되셨구요 엘리턴트는 바꾸셔야 합니다.</div>}
          /> */}
        </Route>
        <Route path={`*`} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
