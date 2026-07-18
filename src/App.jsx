import { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import "../src/index.css";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./Layout/AuthLayout";

import SignUpPage from "./pages/SignUpPage";
import UpdatePage from "./pages/UpdatePage";
import RecoverPage from "./pages/RecoverPage";
import ProtectedRoute from "./Layout/ProtectedRoute";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/login" element={<LogInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/recover" element={<RecoverPage />} />
          <Route path="/update-password" element={<UpdatePage />} />
        </Route>
        <Route element={<ProtectedRoute />}>
          <Route path="/" element={<HomePage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
