import { MaterialButton } from "@/components/Material/MaterialButton";
import { useFetch } from "@/hooks/useFetch";
import { StyledContainer } from "@/pages/auth/styles";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { Box } from "@mui/material";
import { ListRecipes } from "./components";
import { IRecipe } from "./types";

const MyRecipes = () => {
  const {
    data: recipes,
    loading,
    error,
    refetch,
  } = useFetch<IRecipe[]>(recipeServiceParams.getAllById());

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
      <ListRecipes recipes={recipes} />
    </StyledContainer>
  );
};

export default MyRecipes;
