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
import ProfilePasswordEditPage from "pages/ProfilePasswordEditPage"

function App() {
  // axios.defaults.baseURL(``)
  return (
    <div className="App">
      <Toast />
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/member/:type`} element={<SignPage />}></Route>
        <Route path={`/mypage`} element={<MyPage />}>
          <Route path={`progress`} element={<ProgressListPage />} />
          <Route path={`progress/:taleId`} element={<ProgressDetailPage />} />
          <Route path={`talestore`} element={<TaleStorePage />} />
          <Route path={`talestore/:taleId`} element={<TaleDetailPage />} />
          <Route path={`profile`} element={<ProfiliePage />} />
          <Route path={`profile/edit`} element={<ProfileEditPage />} />
          <Route
            path={`profile/password`}
            element={<ProfilePasswordEditPage />}
          />
        </Route>
        <Route path={`*`} element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}

export default App
