import { useAuth } from "@/hooks/useAuth";
import { StyledText } from "@/pages/auth/styles";
import { Home } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import LogoutIcon from "@mui/icons-material/Logout";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Divider, Stack, useMediaQuery, useTheme } from "@mui/material";
import { useNavigate } from "react-router";

const menuNavButtons = [
  {
    title: "Inicio",
    icon: <Home sx={{ fontSize: 42 }} />,
    to: "/",
  },
  {
    title: "Mis recetas",
    icon: <MenuBookIcon sx={{ fontSize: 42 }} />,
    to: "/myRecipes",
  },
  {
    title: "Crear receta",
    icon: <AddBoxIcon sx={{ fontSize: 42 }} />,
    to: "/myRecipes/create",
  },
];

const Header = () => {
  const navigate = useNavigate();
  const { logout } = useAuth();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down("sm"));

  const handleLogout = () => {
    logout();
    navigate("/auth/login");
  };

  return (
    <Box
      sx={{
        width: "100%",
        backdropFilter: "blur(8px)",
        backgroundColor: theme.palette.primary.light,
        boxShadow: "0 2px 8px rgba(0, 0, 0, 0.15)",
        position: "sticky",
        top: 0,
        zIndex: 1000,
        padding: { xs: "8px 12px", sm: "10px 20px" },
        borderRadius: { xs: "0 0 12px 12px", sm: "0 0 16px 16px" },
      }}
    >
      <Stack
        direction="row"
        divider={
          <Divider
            orientation="vertical"
            flexItem
            sx={{ bgcolor: "rgba(255, 255, 255, 0.2)" }}
          />
        }
        spacing={isMobile ? 1 : 3}
        justifyContent="center"
        alignItems="center"
      >
        {menuNavButtons.map((menu) => (
          <Box
            key={menu.title}
            onClick={() => navigate(menu.to)}
            sx={{
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
              padding: { xs: "6px", sm: "8px" },
              borderRadius: "8px",
              transition: "all 0.2s ease",
              "&:hover": {
                backgroundColor: "rgba(255, 255, 255, 0.1)",
                transform: "translateY(-2px)",
              },
            }}
          >
            <Box
              sx={{
                color: theme.palette.primary.main,
                fontSize: { xs: 20, sm: 24 },
              }}
            >
              {menu.icon}
            </Box>
            <StyledText
              sx={{
                margin: 0,
                marginTop: "4px",
                fontSize: { xs: "0.7rem", sm: "0.8rem" },
                fontWeight: 500,
              }}
            >
              {menu.title}
            </StyledText>
          </Box>
        ))}
        <Box
          onClick={handleLogout}
          sx={{
            cursor: "pointer",
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            padding: { xs: "6px", sm: "8px" },
            borderRadius: "8px",
            transition: "all 0.2s ease",
            "&:hover": {
              backgroundColor: "rgba(224, 122, 95, 0.2)",
              transform: "translateY(-2px)",
            },
          }}
        >
          <Box
            sx={{
              color: theme.palette.primary.dark,
              fontSize: { xs: 20, sm: 24 },
            }}
          >
            <LogoutIcon sx={{ fontSize: 42 }}/>
          </Box>
          <StyledText
            sx={{
              margin: 0,
              marginTop: "4px",
              fontSize: { xs: "0.7rem", sm: "0.8rem" },
              fontWeight: 500,
            }}
          >
            Cerrar Sesión
          </StyledText>
        </Box>
      </Stack>
    </Box>
  );
};

export default Header;
