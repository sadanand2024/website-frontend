"use client";
import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "rgb(13, 81, 82)",
    },
    secondary: {
      main: "#2ecc71",
    },
    disabled: {
      main: "#666",
    },
    error: {
      main: "#e74c3c", // Error color (red)
    },
    warning: {
      main: "#f39c12", // Warning color (yellow)
    },
    success: {
      main: "#27ae60", // Success color (green)
    },
    info: {
      main: "#8e44ad", // Info color (purple)
    },
  },
});

export default theme;
