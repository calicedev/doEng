import React from 'react'
import { Route } from 'react-router'
import { Routes } from 'react-router-dom'
import './App.css'
import Login from './components/SignComponents/Login'
import Signup from './components/SignComponents/Signup'
import HomePage from './pages/HomePage'
import SignPage from './pages/SignPage'
import MyPage from './pages/MyPage'
import TaleStorePage from './pages/TaleStorePage'
import TaleDetailPage from './pages/TaleDetailPage'
import ProgressListPage from './pages/ProgressListPage'
import ProgressDetailPage from 'pages/ProgressDetailPage'
import ProfiliePage from 'pages/ProfiliePage'
import Find from './components/SignComponents/Find'
import axios from 'axios'

function App() {
  // axios.defaults.baseURL(``)
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/member`} element={<SignPage />}>
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<Signup />} />
          <Route path={`find/:type`} element={<Find />} />
        </Route>
        <Route path={`/mypage`} element={<MyPage />}>
          <Route path={`progress`} element={<ProgressListPage />} />
          <Route path={`progress/:taleId`} element={<ProgressDetailPage />} />
          <Route path={`talestore`} element={<TaleStorePage />} />
          <Route path={`talestore/:taleId`} element={<TaleDetailPage />} />
          <Route path={`profile`} element={<ProfiliePage />} />
        </Route>
      </Routes>
    </div>
  )
}

export default App
