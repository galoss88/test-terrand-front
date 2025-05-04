import {
  LinkButton,
  LoadingButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import {
  Avatar,
  Box,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { styled } from "@mui/material/styles";
import { useState } from "react";

const StyledContainer = styled(Container)(() => ({
  height: "100vh",
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

const StyledAvatar = styled(Avatar)(({ theme }) => ({
  margin: theme.spacing(1),
  backgroundColor: theme.palette.primary.contrastText,
  color: "#e17055",
  width: 56,
  height: 56,
}));

const initialValues = {
  email: "",
  password: "",
};

type InitialValues = typeof initialValues;

const validate = (
  values: typeof initialValues
): Partial<Record<keyof typeof initialValues, string>> => {
  const errors: Partial<Record<keyof typeof initialValues, string>> = {};
  if (!values.email) {
    errors.email = "El email es requerido";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Por favor ingresa un email válido";
  }
  if (!values.password) {
    errors.password = "La contraseña es requerida";
  }
  if (values.password.length < limitLengthPassword) {
    errors.password = `La contraseña debe tener al menos ${limitLengthPassword} caracteres`;
  }

  return errors;
};
const limitLengthPassword = 8;
const Login = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formLogin = useForm({ initialValues, validate });

  const onSubmitLogin = async (values: InitialValues) => {
    setLoadingSubmit(true);
    try {
      const response = await fetch("http://localhost:3000/api/auth/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();
      console.log("Success:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

  console.log("formLogin", formLogin.values, loadingSubmit);

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

        <form
          style={{ width: "100%" }}
          onSubmit={formLogin.handleSubmit(onSubmitLogin)}
        >
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
            onChange={formLogin.handleChange}
            value={formLogin.values.email}
            error={!!formLogin.errors.email}
            helperText={formLogin.errors.email}
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
            onChange={formLogin.handleChange}
            value={formLogin.values.password}
            error={!!formLogin.errors.password}
            helperText={formLogin.errors.password}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Iniciar sesión"
            loadingText="Iniciando sesión..."
          ></LoadingButton>

          <Box
            display="flex"
            justifyContent="space-between"
            width="100%"
            mt={1}
          >
            <LinkButton href={"/auth/register"}>Registrarse</LinkButton>
            <LinkButton href={"#"}> ¿Olvidaste tu contraseña?</LinkButton>
          </Box>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
