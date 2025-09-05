import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainLayout from "./layouts/MainLayout";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { getDesignTokens } from "./utils/theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const muiTheme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    if (token) {
      setIsLoggedIn(true);
    }
    setIsLoading(false);
  }, []);

  const handleLoginSuccess = (token) => {
    localStorage.setItem("authToken", token);
    setIsLoggedIn(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    setIsLoggedIn(false);
  };

  if (isLoading) {
    return (
      <ThemeProvider theme={muiTheme}>
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh'
        }}>
          <div>Loading...</div>
        </div>
      </ThemeProvider>
    );
  }

  return (
    <ThemeProvider theme={muiTheme}>
      <Routes>
        <Route
          path="/login"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Login
                onLoginSuccess={handleLoginSuccess}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            )
          }
        />

        <Route
          path="/"
          element={
            isLoggedIn ? (
              <MainLayout
                onLogout={handleLogout}
                darkMode={darkMode}
                setDarkMode={setDarkMode}
              />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Chatbot />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chatbot" element={<Chatbot />} />
        </Route>

        <Route
          path="/register"
          element={
            isLoggedIn ? (
              <Navigate to="/dashboard" replace />
            ) : (
              <Register darkMode={darkMode} setDarkMode={setDarkMode} />
            )
          }
        />

        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;