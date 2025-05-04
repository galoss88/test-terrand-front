import { Avatar, Container, Paper, styled, TextField } from "@mui/material";

export const StyledContainer = styled(Container)(({ theme }) => ({
  height: "100vh",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: `linear-gradient(135deg, ${theme.palette.primary.main} 0%, ${theme.palette.primary.light} 100%)`,
}));

export const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: "transparent",
}));

export const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: theme.palette.primary.contrastText, //Estilos del borde
    },
    "&:hover fieldset": {
      borderColor: theme.palette.primary.contrastText, //Estilos del borde al pasar el mouse
    },
    "&.Mui-focused fieldset": {
      borderColor: theme.palette.primary.contrastText, //Estilos del borde al hacer foco
    },
  },
  "& .MuiInputLabel-root": {
    color: theme.palette.primary.contrastText, //Estilos de la etiqueta
  },
  "& .MuiInputBase-input": {
    color: theme.palette.primary.contrastText, //Estilos del texto
  },
}));

export const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.contrastText,
  color: "#e17055",
  width: 56,
  height: 56,
}));
