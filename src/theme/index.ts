import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const hoverColor = "rgba(255, 255, 255, 0.5)";

const rawTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#E07A5F",
      main: "#D05F40",
      dark: "#B24C32",
      contrastText: "#fff",
    },
    secondary: {
      light: "#81B29A",
      main: "#3D5A80",
      dark: "#2C4B6E",
      contrastText: "#fff",
    },
    background: {
      default: "#F8F4E8",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#2A3D45",
      secondary: "#5C6B73",
    },
    error: { main: "#994636" },
    success: { main: "#6B9080" },
  },
  typography: {
    fontFamily: [
      "Lora",
      "Merriweather",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 500 },
    h2: { fontSize: "2rem", fontWeight: 500 },
    h3: { fontSize: "1.75rem", fontWeight: 500 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    button: { textTransform: "none" },
    body1: { fontSize: "1rem", lineHeight: 1.5 },
    body2: { fontSize: "0.875rem", lineHeight: 1.43 },
  },
  shape: {
    borderRadius: 8,
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.05)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          // boxShadow: "0px 2px 4px rgba(0, 0, 0, 0.1)",
          "&:hover": {
            boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.08)",
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(rawTheme);
