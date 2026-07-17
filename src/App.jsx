import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/index.css";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./Layout/AuthLayout";
import Recover from "./components/Recover";
import SignUpPage from "./pages/SignUpPage";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recover" element={<Recover />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
