import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import { ProtectedRoute } from "./context/ProtectedRoute";

import Landing from "./pages/Landing";
import MainScreen from "./pages/MainScreen";
import ResetPassword from "./pages/ResetPassword";

function App() {
  return (
    <Routes>
        <Route index element={<Landing />} />
        <Route path="resetpassword" element={<ResetPassword />} />
        <Route
            path="dashboard/*"
            element={
            <ProtectedRoute>
                <MainScreen />
            </ProtectedRoute>
            }
        />
        <Route path="*" element={<Landing />} />
    </Routes>
  );
}

export default App;
