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
import ProfiliePage from "pages/ProfiliePage"
import Find from "./components/SignComponents/Find"
import axios from "axios"
import TaleDetailPage from "pages/TaleDetailPage"
import NotFoundPage from "pages/NotFoundPage"
import Toast from "components/UI/Toast"
import ProfileEditPage from "pages/ProfileEditPage"
import ProfilePwdEditPage from "pages/ProfilePwdEditPage"
import ProtectedRoute from "components/UI/ProtectedRoute"
import PlayTalePage from "pages/PlayTalePage"
import PlayTaleList from "components/PlayTaleComponents/PlayTaleList"

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
        </Route>
        <Route path={`/mypage`} element={<MyPage />}>
          <Route path={``} element={<ProgressListPage />} />
          <Route path={`progress`} element={<ProgressListPage />} />
          <Route path={`progress/:taleId`} element={<ProgressDetailPage />} />
          <Route path={`talestore`} element={<TaleStorePage />} />
          <Route path={`talestore/:taleId`} element={<TaleDetailPage />} />
          <Route path={`profile`} element={<ProfiliePage />} />
          <Route path={`profile/edit`} element={<ProfileEditPage />} />
          <Route path={`profile/password`} element={<ProfilePwdEditPage />} />
        </Route>
        {/* <Route element={<ProtectedRoute />}> */}
        <Route path={`playtale`} element={<PlayTalePage />}>
          <Route path={``} element={<PlayTaleList />} />
        </Route>
        {/* </Route> */}
        <Route path={`*`} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
