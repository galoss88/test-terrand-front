// src/theme/index.ts
import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const rawTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#FFB703",
      main: "#F77F00",
      dark: "#D65A00",
      contrastText: "#fff",
    },
    secondary: {
      light: "#52B69A",
      main: "#2A9D8F",
      dark: "#207F6B",
      contrastText: "#fff",
    },
    background: {
      default: "#F4F1DE",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#264653",
      secondary: "#6C6C6C",
    },
    error: { main: "#D62828" },
    success: { main: "#81B29A" },
  },
  typography: {
    fontFamily: [
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 500 },
    h2: { fontSize: "2rem", fontWeight: 500 },
    button: { textTransform: "none" },
  },
  shape: {
    borderRadius: 8,
  },
});

export const theme = responsiveFontSizes(rawTheme);
