import {
  LinkButton,
  LoadingButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import { apiUrl } from "@/services/baseUrl";
import { setLocalStorage } from "@/utils/setLocalStorage";
import { Box, Typography } from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  StyledAvatar,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from "./styles";

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
  const navigate = useNavigate();
  const onSubmitLogin = async (values: InitialValues) => {
    setLoadingSubmit(true);
    try {
      const url = `${apiUrl}/public/auth/login`;
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      const dataLogin = await response.json();
      
      setLocalStorage({
        name: "userLogin",
        value: dataLogin,
      });

      if (dataLogin.token) {
        setLocalStorage({
          name: "authToken",
          value: dataLogin.token,
        });
      }
      navigate("/");
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };

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
