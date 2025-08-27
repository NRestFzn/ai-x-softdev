import React, { useState } from "react";
import { Routes, Route } from "react-router-dom";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import MainLayout from "./layouts/MainLayout";
import Chatbot from "./components/Chatbot";
import Dashboard from "./pages/Dashboard";
import Settings from "./pages/Settings";
import { getDesignTokens } from "./utils/theme";

function App() {
  const [darkMode, setDarkMode] = useState(false);

  const muiTheme = createTheme(getDesignTokens(darkMode ? "dark" : "light"));

  return (
    <ThemeProvider theme={muiTheme}>
      <Routes>
        <Route element={<MainLayout darkMode={darkMode} setDarkMode={setDarkMode} />}>
          <Route path="/" element={<Chatbot />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/settings" element={<Settings />} />
        </Route>
      </Routes>
    </ThemeProvider>
  );
}

export default App;