import {
  LinkButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { MaterialModal } from "@/components/Material/MaterialModal";
import { useForm } from "@/hooks";
import { Typography } from "@mui/material";
import { useState } from "react";
import {
  StyledAvatar,
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from "./styles";

const initialValues = {
  email: "",
  password: "",
  repeatPassword: "",
  name: "",
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
  } else if (values.password.trim() !== values.repeatPassword.trim()) {
    errors.repeatPassword = "Las contraseñas no coinciden";
    errors.password = "Las contraseñas no coinciden";
  }
  if (values.password.length < limitLengthPassword) {
    errors.password = `La contraseña debe tener al menos ${limitLengthPassword} caracteres`;
  }

  return errors;
};
const limitLengthPassword = 8;

const Register = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [registerSuccess, setRegisterSuccess] = useState(false);
  const formLogin = useForm({ initialValues, validate });

  const onSubmitLogin = async (values: InitialValues) => {
    setLoadingSubmit(true);
    try {
      const url = "http://localhost:3000/users";
      //Quitamos espacios en blanco al inicio y al final
      values.email = values.email.trim();
      values.password = values.password.trim();
      values.name = values.name.trim();

      const response = await fetch(url, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });
      const data = await response.json();

      if (data) {
        return setRegisterSuccess(true);
      }
      console.log("Success:", data);
      return data;
    } catch (error) {
      console.error("Error:", error);
    } finally {
      setLoadingSubmit(false);
    }
  };
  const onCloseModal = () => {
    formLogin.resetForm();
    setRegisterSuccess(false);
  };

  return (
    <StyledContainer maxWidth={"sm"}>
      <MaterialModal open={registerSuccess}>
        <MaterialModal.Container>
          <MaterialModal.Header>
            <Typography variant="h6" component="h2" color="#e17055">
              Usuario creado con éxito
            </Typography>
          </MaterialModal.Header>
          <MaterialModal.Content>
            <LinkButton href={"/auth/login"}>Iniciar Sesión</LinkButton>
            <MaterialButton onClick={onCloseModal}>
              Crear otro usuario
            </MaterialButton>
          </MaterialModal.Content>
        </MaterialModal.Container>
      </MaterialModal>
      <StyledPaper elevation={3}>
        <StyledAvatar>T</StyledAvatar>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(255, 255, 255, 0.9)"
          mb={2}
        >
          Registrar usuario
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
            name="name"
            label="Nombre y Apellido"
            type="text"
            id="name"
            autoComplete="name"
            autoFocus
            onChange={formLogin.handleChange}
            value={formLogin.values.name}
            error={!!formLogin.errors.name}
            helperText={formLogin.errors.name}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email"
            name="email"
            autoComplete="email"
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
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="repeatPassword"
            label="Repetir Contraseña"
            type="password"
            id="repeatPassword"
            autoComplete="current-password"
            onChange={formLogin.handleChange}
            value={formLogin.values.repeatPassword}
            error={!!formLogin.errors.repeatPassword}
            helperText={formLogin.errors.repeatPassword}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Registrarse"
            loadingText="Registrando..."
          ></LoadingButton>

          <LinkButton href={"/auth/login"}>Iniciar Sesión</LinkButton>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Register;
