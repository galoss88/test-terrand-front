// src/pages/recipes/Edit.tsx
import {
  DeleteButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import {
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from "@/pages/auth/styles";
import { recipeService } from "@/services/recipes/recipesService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../myRecipes/types";

interface RecipeFormValues {
  title: string;
  image: string; // URL or base64
  description: string;
  instructions: string[];
  ingredients: string[];
}

const defaultValues: RecipeFormValues = {
  title: "",
  image: "",
  description: "",
  instructions: [""],
  ingredients: [""],
};

export const EditRecipe = () => {
  const { id } = useParams<{ id: string }>();
  const recipeId = Number(id);
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Hook de formulario (handles values, errors, add/delete items, submit)
  const form = useForm<RecipeFormValues>({
    initialValues: defaultValues,
    validate: (values) => {
      const errors: Partial<Record<keyof RecipeFormValues, string>> = {};
      if (!values.title) errors.title = "El título es obligatorio";
      if (!values.description)
        errors.description = "La descripción es obligatoria";
      // validaciones para arrays
      if (values.ingredients.some((i) => !i))
        errors.ingredients = "Todos los ingredientes deben tener texto";
      if (values.instructions.some((i) => !i))
        errors.instructions = "Todas las instrucciones deben tener texto";
      return errors;
    },
  });

  useEffect(() => {
    if (!recipeId) return;
    recipeService
      .getById(recipeId)
      .then((recipe: IRecipe) => {
        form.setValues({
          title: recipe.title,
          image: recipe.image,
          description: recipe.description,
          instructions: recipe.instructions.length ? recipe.instructions : [""],
          ingredients: recipe.ingredients.length ? recipe.ingredients : [""],
        });
      })
      .catch(() => {
        console.error("Error al cargar receta:");
        // podrías mostrar un mensaje de error al usuario
      })
      .finally(() => setLoadingData(false));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recipeId]);

  // 2) Manejar el envío de datos
  const onSubmit = async (values: RecipeFormValues) => {
    setLoadingSubmit(true);
    try {
      await recipeService.update(recipeId, {
        title: values.title,
        image: values.image,
        description: values.description,
        instructions: values.instructions,
        ingredients: values.ingredients,
      });
      navigate("/recipes"); // redirigir tras actualizar
    } catch (err) {
      console.error("Error al actualizar receta:", err);
      // mostrar notificación de error
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingData) {
    return (
      <Box
        sx={{
          height: "100vh",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <StyledContainer maxWidth={false} sx={{ height: "100%" }}>
      <StyledPaper elevation={3} sx={{ height: "100%", overflowY: "auto" }}>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(255, 255, 255, 0.9)"
          mb={2}
        >
          Editar receta
        </Typography>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          {/* Imagen y título/descripción */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 0.5 }}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="image"
                type="text"
                label="URL de imagen"
                onChange={form.handleChange}
                value={form.values.image}
                error={!!form.errors.image}
                helperText={form.errors.image}
              />
            </Box>
            <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="title"
                label="Título"
                name="title"
                onChange={form.handleChange}
                value={form.values.title}
                error={!!form.errors.title}
                helperText={form.errors.title}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                id="description"
                label="Descripción"
                name="description"
                onChange={form.handleChange}
                value={form.values.description}
                error={!!form.errors.description}
                helperText={form.errors.description}
              />
            </Box>
          </Box>

          {/* Ingredientes e instrucciones */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 0.5, display: "flex", flexDirection: "column" }}>
              {form.values.ingredients.map((ing, idx) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <StyledTextField
                    fullWidth
                    name="ingredients"
                    label={`Ingrediente ${idx + 1}`}
                    onChange={(e) => form.handleChange(e, idx)}
                    value={ing}
                    error={!!form.errors.ingredients}
                    helperText={form.errors.ingredients}
                  />
                  <DeleteButton
                    onClick={() => form.deleteData("ingredients", idx)}
                  >
                    X
                  </DeleteButton>
                </Box>
              ))}
              <MaterialButton onClick={() => form.addItem("ingredients")}>
                + Ingrediente
              </MaterialButton>
            </Box>

            <Box sx={{ flex: 0.5, display: "flex", flexDirection: "column" }}>
              {form.values.instructions.map((inst, idx) => (
                <Box
                  key={idx}
                  sx={{ display: "flex", alignItems: "center", gap: 1 }}
                >
                  <StyledTextField
                    fullWidth
                    name="instructions"
                    label={`Paso ${idx + 1}`}
                    onChange={(e) => form.handleChange(e, idx)}
                    value={inst}
                    error={!!form.errors.instructions}
                    helperText={form.errors.instructions}
                  />
                  <DeleteButton
                    onClick={() => form.deleteData("instructions", idx)}
                  >
                    X
                  </DeleteButton>
                </Box>
              ))}
              <MaterialButton onClick={() => form.addItem("instructions")}>
                + Instrucción
              </MaterialButton>
            </Box>
          </Box>

          {/* Botón de envío */}
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Guardar cambios"
            loadingText="Actualizando..."
          />
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default EditRecipe;
