import {
  LinkButton,
  LoadingButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import { apiUrl } from "@/services/baseUrl";
import { setLocalStorage } from "@/utils/setLocalStorage";
import EmailIcon from "@mui/icons-material/Email";
import LockIcon from "@mui/icons-material/Lock";
import RestaurantMenuIcon from "@mui/icons-material/RestaurantMenu";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import {
  Box,
  IconButton,
  InputAdornment,
  Typography,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import { useState } from "react";
import { useNavigate } from "react-router";
import {
  StyledAvatar,
  StyledContainer,
  StyledPaper,
  StyledText,
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
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const formLogin = useForm({ initialValues, validate });
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleTogglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onSubmitLogin = async (values: InitialValues) => {
    setLoadingSubmit(true);
    setError(null);

    try {
      const url = `${apiUrl}/public/auth/login`;
      const response = await fetch(`${url}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(values),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Error al iniciar sesión");
      }

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
      setError(
        error instanceof Error ? error.message : "Error al iniciar sesión"
      );
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <StyledContainer maxWidth={"sm"}>
      <StyledPaper
        elevation={3}
        sx={{
          padding: { xs: 3, sm: 4 },
          width: { xs: "100%", sm: "90%" },
          maxWidth: "450px",
          transition: "all 0.3s ease",
        }}
      >
        <Box display="flex" flexDirection="column" alignItems="center" mb={3}>
          <StyledAvatar
            sx={{
              width: { xs: 60, sm: 70 },
              height: { xs: 60, sm: 70 },
              backgroundColor: theme.palette.primary.main,
              marginBottom: 2,
            }}
          >
            <RestaurantMenuIcon fontSize={isMobile ? "medium" : "large"} />
          </StyledAvatar>

          <StyledText
            variant={isMobile ? "h5" : "h4"}
            color="rgba(255, 255, 255, 0.95)"
            fontWeight="500"
          >
            Iniciar sesión
          </StyledText>

          <StyledText
            variant="body2"
            color="rgba(255, 255, 255, 0.7)"
            textAlign="center"
          >
            Accede a tu cuenta para gestionar tus recetas
          </StyledText>
        </Box>

        {error && (
          <Box
            sx={{
              backgroundColor: "rgba(153, 70, 54, 0.1)",
              color: theme.palette.error.main,
              padding: 2,
              borderRadius: 1,
              marginBottom: 2,
              textAlign: "center",
            }}
          >
            <Typography variant="body2">{error}</Typography>
          </Box>
        )}

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
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <EmailIcon
                      sx={{ color: theme.palette.primary.contrastText }}
                    />
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 2 }}
          />

          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="password"
            label="Clave"
            type={showPassword ? "text" : "password"}
            id="password"
            autoComplete="current-password"
            onChange={formLogin.handleChange}
            value={formLogin.values.password}
            error={!!formLogin.errors.password}
            helperText={formLogin.errors.password}
            slotProps={{
              input: {
                startAdornment: (
                  <InputAdornment position="start">
                    <LockIcon
                      sx={{ color: theme.palette.primary.contrastText }}
                    />
                  </InputAdornment>
                ),
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleTogglePasswordVisibility}
                      edge="end"
                      sx={{ color: theme.palette.primary.contrastText }}
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              },
            }}
            sx={{ mb: 3 }}
          />

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Iniciar sesión"
            loadingText="Iniciando sesión..."
            sx={{
              py: 1.5,
              fontSize: "1rem",
              fontWeight: 500,
              mt: 1,
              mb: 2,
              transition: "all 0.3s",
              "&:hover": {
                transform: "translateY(-2px)",
              },
            }}
          />

          <Box
            display="flex"
            flexDirection={{ xs: "column", sm: "row" }}
            justifyContent="space-between"
            alignItems={{ xs: "center", sm: "flex-start" }}
            width="100%"
            mt={2}
            gap={1}
          >
            <LinkButton
              href={"/auth/register"}
              sx={{
                fontSize: "0.9rem",
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                  color: "none",
                },
              }}
            >
              ¿No tienes cuenta? Regístrate
            </LinkButton>
          </Box>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Login;
