import { MaterialButton } from "@/components/Material/MaterialButton";
import { useFetch } from "@/hooks/useFetch";
import { StyledContainer } from "@/pages/auth/styles";
import { apiUrl } from "@/services/baseUrl";
import { Box } from "@mui/material";
import { ListRecipes } from "./components";
import { IRecipe } from "./types";

const url = `${apiUrl}/private/recipes`;
const params = {
  url,
  method: "GET",
};
const MyRecipes = () => {
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<IRecipe[]>(params);

  if (loading) {
    return <Box>Cargando recetas...</Box>;
  }

  if (error) {
    return (
      <Box>
        Ocurrio un error al traer las recetas
        <MaterialButton onClick={() => refetch()}>
          Recargar datos
        </MaterialButton>
      </Box>
    );
  }

  if (!recipes?.length) {
    return <Box>No se encontraron recetas creadas.</Box>;
  }
  return (
    <StyledContainer maxWidth={false} sx={{ backgroundColor: "tranparent" }}>
      Mis recetas
      <ListRecipes recipes={recipes} />
    </StyledContainer>
  );
};

export default MyRecipes;
