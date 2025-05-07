import { useAuth } from "@/hooks/useAuth";
import { StyledContainer, StyledText } from "@/pages/auth/styles";
import { Home } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";

const menuNavButtons = [
  {
    title: "Inicio",
    icon: <Home></Home>,
    to: "/",
  },
  {
    title: "Mis recetas",
    icon: <MenuBookIcon></MenuBookIcon>,
    to: "/myRecipes",
  },
  {
    title: "Crear receta",
    icon: <AddBoxIcon></AddBoxIcon>,
    to: "/myRecipes/create",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <StyledContainer
      fixed
      maxWidth={"xs"}
      sx={{ maxHeight: { xs: 60, sm: 60 }, mt: 0.5 }}
    >
      <Stack
        direction="row"
        divider={<Divider orientation="vertical" flexItem />}
        spacing={2}
      >
        {menuNavButtons.map((menu) => {
          return (
            <Box
              key={menu.title}
              onClick={() => navigate(menu.to)} // ← pasa una función, no el resultado
              sx={{
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                flexDirection: "column",
              }}
            >
              {menu.icon}
              <StyledText>{menu.title}</StyledText>
            </Box>
          );
        })}
        <Box
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
          }}
        >
          <LogoutIcon />
          <StyledText>Cerrar Sesión</StyledText>
        </Box>
      </Stack>
    </StyledContainer>
  );
};

export default Header;
