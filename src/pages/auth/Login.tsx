import {
  Avatar,
  Box,
  Button,
  Container,
  Link,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";

// Estilos personalizados
const StyledContainer = styled(Container)(() => ({
  height: "100vh",
  width: "100vw",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  background: "linear-gradient(135deg, #e69b7b 0%, #e17055 100%)",
}));

const StyledPaper = styled(Paper)(({ theme }) => ({
  padding: theme.spacing(4),
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  borderRadius: 16,
  backgroundColor: "rgba(255, 255, 255, 0.1)",
}));

const StyledTextField = styled(TextField)(({ theme }) => ({
  marginBottom: theme.spacing(2),
  "& .MuiOutlinedInput-root": {
    "& fieldset": {
      borderColor: "rgba(255, 255, 255, 0.3)", //Estilos del borde
    },
    "&:hover fieldset": {
      borderColor: "rgba(255, 255, 255, 0.5)", //Estilos del borde al pasar el mouse
    },
    "&.Mui-focused fieldset": {
      borderColor: "rgba(255, 255, 255, 0.7)", //Estilos del borde al hacer foco
    },
  },
  "& .MuiInputLabel-root": {  
    color: "rgba(255, 255, 255, 0.7)", //Estilos de la etiqueta
  },
  "& .MuiInputBase-input": {
    color: "rgba(255, 255, 255, 0.9)", //Estilos del texto
  },
}));

const StyledButton = styled(Button)(({ theme }) => ({
  margin: theme.spacing(2, 0),
  padding: theme.spacing(1.2),
  borderRadius: 50,
  backgroundColor: "rgba(255, 247, 237, 0.9)",
  color: "#e17055",
  "&:hover": {
    backgroundColor: "rgba(255, 247, 237, 1)",
  },
}));

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  color: "#e17055",
  width: 56,
  height: 56,
}));

const Login = () => {
  return (
    <StyledContainer maxWidth={"sm"}>
      <StyledPaper elevation={3}>
        <StyledAvatar>T</StyledAvatar>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(255, 255, 255, 0.9)"
          mb={2}
        >
          Iniciar sesión
        </Typography>

        <form>
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
            autoFocus
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Contraseña"
            type="password"
            id="password"
            autoComplete="current-password"
          />
          <StyledButton type="submit" fullWidth variant="contained">
            Iniciar sesión
          </StyledButton>
          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={1}
          >
            <Link href="#" variant="body2" color="rgba(255, 255, 255, 0.7)">
              Registrarse
            </Link>
            <Link href="#" variant="body2" color="rgba(255, 255, 255, 0.7)">
              ¿Olvidaste tu contraseña?
            </Link>
          </Box>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
