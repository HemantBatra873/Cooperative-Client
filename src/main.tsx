import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import "./index.css";
import { createTheme, ThemeProvider } from "@mui/material";
import { BrowserRouter } from "react-router-dom";
import { Toaster } from "react-hot-toast";
import axios from "axios";
import { AuthProvider } from "./contexts/AuthContext.tsx";
import { ThemeProvider as AppThemeProvider } from "./context/ThemeContext.tsx";

axios.defaults.baseURL = import.meta.env.VITE_API_URL;
axios.defaults.withCredentials = true;
const theme = createTheme({
  typography: {
    fontFamily: "PT Sans , Roboto Slab , serif",
    allVariants: { color: "var(--text-primary)" },
  },
});
ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <AuthProvider>
      <AppThemeProvider>
        <BrowserRouter>
          <ThemeProvider theme={theme}>
            <Toaster position="top-right" />
            <App />
          </ThemeProvider>
        </BrowserRouter>
      </AppThemeProvider>
    </AuthProvider>
  </React.StrictMode>
);
