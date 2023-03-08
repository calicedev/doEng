import React from "react";
import { Route } from "react-router";
import { Routes } from "react-router-dom";
import "./App.css";
import Login from "./components/SignComponents/Login/Login";
import Signup from "./components/SignComponents/Signup/Signup";
import HomePage from "./pages/HomePage";
import ProgressListPage from "./pages/ProgressListPage";
import SignPage from "./pages/SignPage";

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={`/`} element={<HomePage />} />
        <Route path={`/join`} element={<SignPage />}>
          <Route path={`login`} element={<Login />} />
          <Route path={`signup`} element={<Signup />} />
        </Route>
        <Route path={"/progress"} element={<ProgressListPage />} />
      </Routes>
    </div>
  );
}

export default App;
