import React from "react"
import { Route } from "react-router"
import { Routes } from "react-router-dom"
import "./App.css"
import HomePage from "./pages/HomePage"

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
      </Routes>
    </div>
  )
}

export default App
