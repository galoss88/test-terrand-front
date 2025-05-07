import { MaterialButton } from "@/components/Material/MaterialButton";
import { MuiLoading } from "@/components/Material/MuiLoading";
import { useFetch } from "@/hooks/useFetch";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { Box, Typography } from "@mui/material";
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
    return <MuiLoading>Cargando Receta</MuiLoading>;
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: "rgba(35, 35, 50, 0.9)",
            fontWeight: 500,
          }}
        >
          No pudimos cargar tus recetas
        </Typography>
        <Typography
          sx={{
            mb: 3,
            color: "rgba(35, 35, 50, 0.7)",
            maxWidth: 600,
          }}
        >
          Ocurrió un error al intentar obtener tus recetas. Por favor, intenta
          nuevamente.
        </Typography>
        <MaterialButton
          onClick={() => refetch()}
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "12px",
          }}
        >
          Recargar datos
        </MaterialButton>
      </Box>
    );
  }

  if (!recipes?.length) {
    return (
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "60vh",
          padding: 3,
          textAlign: "center",
        }}
      >
        <Typography
          variant="h5"
          sx={{
            mb: 2,
            color: "rgba(35, 35, 50, 0.9)",
            fontWeight: 500,
          }}
        >
          Aún no tienes recetas creadas
        </Typography>
        <Typography
          sx={{
            mb: 3,
            color: "rgba(35, 35, 50, 0.7)",
            maxWidth: 600,
          }}
        >
          ¡Empieza a crear tus recetas favoritas para guardarlas en tu
          colección!
        </Typography>
        <MaterialButton
          onClick={() => (window.location.href = "/myRecipes/create")}
          variant="contained"
          sx={{
            px: 4,
            py: 1.2,
            borderRadius: "12px",
          }}
        >
          Crear primera receta
        </MaterialButton>
      </Box>
    );
  }

  return (
    <Box
      sx={{
        width: "100%",
        margin: "0 auto",
        padding: { xs: 1, sm: 2, md: 3 },
        borderRadius: "16px",
      }}
    >
      <ListRecipes recipes={recipes} />
    </Box>
  );
};

export default MyRecipes;
