import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import "../src/index.css";
import LogInPage from "./pages/LogInPage";
import HomePage from "./pages/HomePage";
import AuthLayout from "./Layout/AuthLayout";

function App() {
  return (
    <>
      <Routes>
        <Route element={<AuthLayout />}>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={<LogInPage />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
