import React, { useState, useEffect } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainLayout from "./layouts/MainLayout";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import Login from "./pages/Login";
import { getDesignTokens } from "./utils/theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const muiTheme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  useEffect(() => {
    // Cek status login dari localStorage
    const loggedIn = localStorage.getItem("isLoggedIn") === "true";
    setIsLoggedIn(loggedIn);
    setIsLoading(false);
  }, []);

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
        {/* Route untuk login - hanya bisa diakses jika belum login */}
        <Route 
          path="/login" 
          element={
            isLoggedIn ? <Navigate to="/dashboard" replace /> : <Login />
          } 
        />
        
        {/* Route yang dilindungi - hanya bisa diakses jika sudah login */}
        <Route 
          path="/" 
          element={
            isLoggedIn ? (
              <MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />
            ) : (
              <Navigate to="/login" replace />
            )
          }
        >
          <Route index element={<Navigate to="/dashboard" replace />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="settings" element={<Settings />} />
          <Route path="chatbot" element={<Chatbot />} />
        </Route>
        
        {/* Redirect untuk path yang tidak dikenal */}
        <Route path="*" element={<Navigate to={isLoggedIn ? "/dashboard" : "/login"} replace />} />
      </Routes>
    </ThemeProvider>
  );
}

export default App;