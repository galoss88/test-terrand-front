import { MaterialButton } from "@/components/Material/MaterialButton";
import { MuiCard } from "@/components/Material/MuiCard";
import { useFetch } from "@/hooks/useFetch";
import { StyledContainer, StyledText } from "@/pages/auth/styles";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { Box } from "@mui/material";
import { useParams } from "react-router";
import { IRecipe } from "../myRecipes/types";

const DetailRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const {
    data: dataDetail,
    loading,
    error,
    refetch,
  } = useFetch<IRecipe>(recipeServiceParams.detail(id!));

  if (!dataDetail) return <>No hay datos para esta receta.</>;
  if (loading) {
    return <StyledText>Cargando detalle de receta</StyledText>;
  }
  if (error) {
    return (
      <Box>
        Ocurrio un error al trae detalle de la receta
        <MaterialButton onClick={() => refetch()}>
          Recargar datos
        </MaterialButton>
      </Box>
    );
  }
  return (
    <StyledContainer
      maxWidth={false}
      sx={{ gap: { xs: 1, md: 3 }, backgroundColor: "tranparent" }}
    >
      {/* Seccion imagen con titulo y descripcion */}
      <Box
        sx={{
          display: "flex",
          gap: { xs: 1 },
          mt: { xs: 1 },
          flexDirection: { xs: "column", md: "row" },
        }}
        component={"section"}
      >
        <Box sx={{ display: "flex" }} component={"section"}>
          <MuiCard>
            <MuiCard.Media image={dataDetail.image}></MuiCard.Media>
          </MuiCard>
        </Box>
        <Box
          sx={{ display: "flex", flexDirection: "column" }}
          component={"section"}
        >
          <StyledText variant="h1">{dataDetail?.title}</StyledText>
          <StyledText variant="h6">{dataDetail?.description}</StyledText>
        </Box>
      </Box>

      {/* Seccion de ingredientes y instrucciones */}
      <Box
        sx={{
          display: "flex",
          flexDirection: { xs: "column", sm: "row" },
          gap: { xs: 1, md: 10 },
        }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0, md: 0 },
          }}
        >
          <StyledText>Ingredientes</StyledText>
          <ul>
            {dataDetail.ingredients.map((ingredient) => {
              return <li key={ingredient}>{ingredient}</li>;
            })}
          </ul>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: 0, md: 0 },
          }}
        >
          <StyledText>Instrucciones</StyledText>

          <ul>
            {dataDetail.instructions.map((ingredient, index) => {
              return <li key={ingredient}>{`${index}) ${ingredient}`}</li>;
            })}
          </ul>
        </Box>
      </Box>
    </StyledContainer>
  );
};

export default DetailRecipe;
