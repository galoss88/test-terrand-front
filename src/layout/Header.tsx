import { StyledContainer, StyledText } from "@/pages/auth/styles";
import { Home } from "@mui/icons-material";
import AddBoxIcon from "@mui/icons-material/AddBox";
import MenuBookIcon from "@mui/icons-material/MenuBook";
import { Box, Divider, Stack } from "@mui/material";
import { useNavigate } from "react-router";
const menuButtons = [
  {
    title: "Inicio",
    icon: <Home></Home>,
    to: "/home",
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
        {menuButtons.map((menu) => {
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
      </Stack>
    </StyledContainer>
  );
};

export default Header;
