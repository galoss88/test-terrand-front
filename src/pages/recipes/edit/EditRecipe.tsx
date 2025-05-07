import {
  DeleteButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks/useForm";
import { useImageSelection } from "@/hooks/useImageSelection";
import {
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from "@/pages/auth/styles";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IRecipe } from "../myRecipes/types";

interface RecipeFormValues {
  title: string;
  image: string;
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
  const recipeId = id;
  const navigate = useNavigate();

  const [loadingData, setLoadingData] = useState(true);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [originalImage, setOriginalImage] = useState<string>("");

  const form = useForm<RecipeFormValues>({
    initialValues: defaultValues,
    validate: (values) => {
      const errors: Partial<Record<keyof RecipeFormValues, string>> = {};
      if (!values.title) errors.title = "El título es obligatorio";
      if (!values.description)
        errors.description = "La descripción es obligatoria";

      // No validamos la imagen si hay un archivo seleccionado
      if (
        values.image &&
        !values.image.startsWith("data:image/") &&
        !values.image.startsWith("http") &&
        !selectedFile
      ) {
        try {
          new URL(values.image);
        } catch {
          errors.image = "La URL de imagen no es válida";
        }
      }

      if (values.ingredients.some((i) => !i))
        errors.ingredients = "Todos los ingredientes deben tener texto";
      if (values.instructions.some((i) => !i))
        errors.instructions = "Todas las instrucciones deben tener texto";
      return errors;
    },
  });

  const {
    selectedFile,
    localPreview,
    imgError,
    loadingImage,
    setLoadingImage,
    handleFileSelection,
    clearSelection,
    setImgError,
    setLocalPreview,
    cleanup,
  } = useImageSelection();

  useEffect(() => {
    return () => {
      cleanup();
    };
  }, []);

  const handleImageUrlChange = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const url = e.target.value;
      form.handleChange(e);

      if (url) {
        if (selectedFile) {
          clearSelection();
        }
        setLocalPreview(url);
      } else {
        setLocalPreview("");
      }
    },
    [form, selectedFile, clearSelection, setLocalPreview]
  );

  useEffect(() => {
    if (!recipeId) return;
    recipeServiceParams
      .getById(recipeId)
      .then((recipe: IRecipe) => {
        form.setValues({
          title: recipe.title,
          image: recipe?.image ?? "",
          description: recipe.description,
          instructions: recipe.instructions.length ? recipe.instructions : [""],
          ingredients: recipe.ingredients.length ? recipe.ingredients : [""],
        });
        if (recipe.image) {
          setLocalPreview(recipe.image);
          setOriginalImage(recipe.image);
        }
      })
      .catch(() => {
        console.error("Error al cargar receta:");
      })
      .finally(() => setLoadingData(false));
  }, [recipeId]);

  const onSubmit = async (values: RecipeFormValues) => {
    setLoadingSubmit(true);
    try {
      let imageUrl = values.image;

      if (selectedFile) {
        setLoadingImage(true);
        imageUrl = await recipeServiceParams.uploadImage(selectedFile);
        setLoadingImage(false);
      }

      const payload: Omit<IRecipe, "id"> = {
        title: values.title,
        description: values.description,
        instructions: values.instructions.filter((i) => i.trim() !== ""),
        ingredients: values.ingredients.filter((i) => i.trim() !== ""),
        image: imageUrl,
      };

      if (!recipeId) return;
      await recipeServiceParams.update(recipeId, payload);

      if (originalImage && originalImage !== imageUrl) {
        // await recipeService.deleteUnusedImage(originalImage);
      }

      clearSelection();

      navigate("/myRecipes");
    } catch (err) {
      console.error("Error al actualizar receta:", err);
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

  const placeholder =
    "https://via.placeholder.com/150?text=Sin+previsualizaci%C3%B3n";

  const imageToShow = imgError ? placeholder : localPreview || placeholder;

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
          {/* Imagen: URL o archivo + preview */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box sx={{ flex: 0.5, display: "flex", flexDirection: "column" }}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                fullWidth
                name="image"
                type="text"
                label="URL de imagen"
                onChange={handleImageUrlChange}
                value={form.values.image}
                error={!!form.errors.image}
                helperText={form.errors.image}
              />
              <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleFileSelection}
                  style={{ marginTop: 8 }}
                  id="image-upload"
                />
                {selectedFile && (
                  <Typography variant="caption" sx={{ color: "success.main" }}>
                    Archivo seleccionado: {selectedFile.name}
                  </Typography>
                )}
              </Box>

              <Box
                component="img"
                src={imageToShow}
                alt="Preview"
                onError={() => setImgError(true)}
                sx={{
                  width: "100%",
                  maxHeight: 200,
                  objectFit: "cover",
                  mt: 1,
                  borderRadius: 2,
                }}
              />

              {selectedFile && (
                <Typography
                  variant="caption"
                  sx={{ mt: 1, color: "info.main" }}
                >
                  La imagen se subirá cuando guardes los cambios
                </Typography>
              )}
            </Box>

            {/* Título y descripción */}
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
                multiline
                rows={4}
              />
            </Box>
          </Box>

          {/* Ingredientes e instrucciones */}
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            <Box
              sx={{
                flex: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.9)">
                Ingredientes
              </Typography>
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
                    helperText={idx === 0 ? form.errors.ingredients : ""}
                  />
                  {form.values.ingredients.length > 1 && (
                    <DeleteButton
                      onClick={() => form.deleteData("ingredients", idx)}
                    >
                      X
                    </DeleteButton>
                  )}
                </Box>
              ))}
              <MaterialButton onClick={() => form.addItem("ingredients")}>
                + Ingrediente
              </MaterialButton>
            </Box>

            <Box
              sx={{
                flex: 0.5,
                display: "flex",
                flexDirection: "column",
                gap: 1,
              }}
            >
              <Typography variant="subtitle1" color="rgba(255, 255, 255, 0.9)">
                Instrucciones
              </Typography>
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
                    helperText={idx === 0 ? form.errors.instructions : ""}
                    multiline
                    rows={2}
                    type="text"
                  />
                  {form.values.instructions.length > 1 && (
                    <DeleteButton
                      onClick={() => form.deleteData("instructions", idx)}
                    >
                      X
                    </DeleteButton>
                  )}
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
            isLoading={loadingSubmit || loadingImage}
            disabled={loadingSubmit || loadingImage}
            textWhenNotLoading="Guardar cambios"
            loadingText="Actualizando..."
          />
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default EditRecipe;
