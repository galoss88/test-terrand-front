import { createTheme, responsiveFontSizes } from "@mui/material/styles";

export const hoverColor = "rgba(255, 255, 255, 0.7)";

const rawTheme = createTheme({
  palette: {
    mode: "light",
    primary: {
      light: "#fef7e1", // Tono crema suave para fondos
      main: "#93C572",
      dark: "#C35A40", // Versión más oscura del naranja principal
      contrastText: "#000000",
    },
    secondary: {
      light: "#81B29A", // Verde salvia claro
      main: "#3D405B", // Azul noche profundo para contraste
      dark: "#2E3248", // Azul noche más oscuro
      contrastText: "#fff",
    },
    background: {
      default: "#F8F8F0", // Blanco roto suave para el fondo principal
      paper: "#FFFDF6", // Blanco cálido para tarjetas y elementos
    },
    text: {
      primary: "#2B2D42", // Gris azulado oscuro para mejor legibilidad
      secondary: "#5C6B73", // Gris medio para texto secundario
    },
    error: { main: "#D62828" }, // Rojo más intenso para errores
    success: { main: "#588157" }, // Verde bosque para éxito
    warning: { main: "#F8B84E" }, // Amarillo mostaza para advertencias
    info: { main: "#457B9D" }, // Azul petróleo para información
  },
  typography: {
    fontFamily: [
      "Montserrat", // Fuente principal más moderna
      "Lora",
      "system-ui",
      "Avenir",
      "Helvetica",
      "Arial",
      "sans-serif",
    ].join(","),
    h1: { fontSize: "2.5rem", fontWeight: 600, letterSpacing: "-0.5px" },
    h2: { fontSize: "2rem", fontWeight: 600, letterSpacing: "-0.25px" },
    h3: { fontSize: "1.75rem", fontWeight: 600 },
    h4: { fontSize: "1.5rem", fontWeight: 500 },
    h5: { fontSize: "1.25rem", fontWeight: 500 },
    button: { textTransform: "none", fontWeight: 500 },
    body1: { fontSize: "1rem", lineHeight: 1.6 },
    body2: { fontSize: "0.875rem", lineHeight: 1.5 },
  },
  shape: {
    borderRadius: 10, // Bordes más redondeados para un aspecto moderno
  },

  components: {
    MuiPaper: {
      styleOverrides: {
        elevation1: {
          boxShadow: "0px 2px 8px rgba(0, 0, 0, 0.08)",
        },
        elevation3: {
          boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.12)",
        },
      },
    },
    MuiButton: {
      styleOverrides: {
        root: {
          fontWeight: 500,
          padding: "8px 16px",
          transition: "all 0.2s ease-in-out",

          "&:hover": {
            boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
            transform: "translateY(-2px)",
          },
        },
        containedPrimary: {
          background: "#a2d3c7",
        },
        containedSecondary: {
          background: "linear-gradient(135deg, #3D405B 0%, #2E3248 100%)",
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          boxShadow: "0px 6px 16px rgba(0, 0, 0, 0.1)",
          transition: "transform 0.3s ease, box-shadow 0.3s ease",
          "&:hover": {
            transform: "translateY(-4px)",
            boxShadow: "0px 8px 20px rgba(0, 0, 0, 0.15)",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          transition: "all 0.2s ease-in-out",
        },
      },
    },
    MuiTypography: {
      styleOverrides: {
        h1: {
          fontFamily: "'Montserrat', sans-serif",
        },
        h2: {
          fontFamily: "'Montserrat', sans-serif",
        },
        h3: {
          fontFamily: "'Montserrat', sans-serif",
        },
      },
    },
  },
});

export const theme = responsiveFontSizes(rawTheme);
