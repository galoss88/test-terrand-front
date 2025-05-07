import { Box, Container, Grid } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Componentes
import {
  LinkButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { StyledPaper, StyledText } from "@/pages/auth/styles";

// Hooks
import { useFetch } from "@/hooks/useFetch";
import { useForm } from "@/hooks/useForm";
import { useImageSelection } from "@/hooks/useImageSelection";

// Services
import {
  recipeService,
  recipeServiceParams,
} from "@/services/recipes/recipesService";

// Types
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { fetchApi } from "@/utils/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import ImageUploadSection from "../components/ImageUploadSection";
import RecipeFieldsSection from "../components/RecipeFieldsSection";
import RecipeListSection from "../components/RecipeListSection";
import { IRecipe } from "../myRecipes/types";

// Valores predeterminados y tipos
export interface RecipeFormValues {
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
  const fetchWithAuth = useFetchWithAuth(fetchApi);

  // Estado
  const [loadingSubmit, setLoadingSubmit] = useState(false);

  // Custom hooks
  const {
    data: dataDetail,
    loading,
    error,
    refetch,
  } = useFetch<IRecipe>(recipeServiceParams.detail(recipeId!));

  const form = useForm<RecipeFormValues>({
    initialValues: defaultValues,
    validate: validateRecipeForm,
  });

  const imageSelectionProps = useImageSelection();
  const {
    selectedFile,
    localPreview,
    imgError,
    loadingImage,
    setLoadingImage,
    clearSelection,
    setLocalPreview,
    cleanup,
  } = imageSelectionProps;

  // Efectos
  useEffect(() => {
    return () => {
      cleanup();
    };
  }, [cleanup]);

  useEffect(() => {
    if (!recipeId || !dataDetail) return;

    form.setValues({
      title: dataDetail.title,
      image: dataDetail?.image ?? "",
      description: dataDetail.description,
      instructions: dataDetail.instructions.length
        ? dataDetail.instructions
        : [""],
      ingredients: dataDetail.ingredients.length
        ? dataDetail.ingredients
        : [""],
    });

    if (dataDetail.image) {
      setLocalPreview(dataDetail.image);
    }
  }, [recipeId, dataDetail, form.setValues, setLocalPreview]);

  // Manejadores de eventos
  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
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
  };

  const onSubmit = async (values: RecipeFormValues) => {
    setLoadingSubmit(true);
    try {
      let imageUrl = values.image;

      if (selectedFile) {
        setLoadingImage(true);
        imageUrl = await recipeService.uploadImage(selectedFile);
        setLoadingImage(false);
      }

      const payload: IRecipe = {
        title: values.title,
        description: values.description,
        instructions: values.instructions.filter((i) => i.trim() !== ""),
        ingredients: values.ingredients.filter((i) => i.trim() !== ""),
        image: imageUrl,
        id: recipeId!,
      };

      if (!recipeId) return;

      fetchWithAuth({ ...recipeServiceParams.update(), body: payload });

      clearSelection();
      navigate("/myRecipes");
    } catch (err) {
      console.error("Error al actualizar receta:", err);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 3, height: "100%" }}>
        <StyledPaper
          elevation={3}
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <StyledText>Cargando receta...</StyledText>
        </StyledPaper>
      </Container>
    );
  }

  if (error) {
    return (
      <Container sx={{ py: 3, height: "100%" }}>
        <StyledPaper
          elevation={3}
          sx={{
            p: 3,
            height: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 2,
            alignItems: "center",
          }}
        >
          <StyledText>Ocurrió un error al traer la receta a editar</StyledText>
          <MaterialButton onClick={() => refetch()}>
            Recargar datos
          </MaterialButton>
        </StyledPaper>
      </Container>
    );
  }

  const placeholder = "";
  const imageToShow = imgError ? placeholder : localPreview || placeholder;

  return (
    <Box sx={{ py: 3, height: "100%" }}>
      <StyledPaper
        elevation={3}
        sx={{ p: 3, height: "100%", overflowY: "auto" }}
      >
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            width: "100%",
            mb: 4,
            position: "relative",
            mt: 2,
          }}
        >
          <Box sx={{ position: "absolute", left: 0, zIndex: 2 }}>
            <LinkButton
              href="/myRecipes"
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1,
                px: 2,
                py: 1,
                backgroundColor: "rgba(35, 35, 50, 0.05)",
                borderRadius: "8px",
                transition: "all 0.2s",
                "&:hover": {
                  backgroundColor: "rgba(35, 35, 50, 0.1)",
                  transform: "translateX(-5px)",
                },
              }}
            >
              <ArrowBackIcon fontSize="small" />
              Volver a mis recetas
            </LinkButton>
          </Box>

          <StyledText
            variant="h5"
            sx={{
              width: "100%",
              textAlign: "center",
              mx: "auto",
            }}
          >
            Editar receta
          </StyledText>
        </Box>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4, md: 6 }}>
              <ImageUploadSection
                form={form}
                handleImageUrlChange={handleImageUrlChange}
                imageSelectionProps={imageSelectionProps}
                imageToShow={imageToShow}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 8, md: 5 }}>
              <RecipeFieldsSection form={form} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <RecipeListSection
                title="Ingredientes"
                name="ingredients"
                items={form.values.ingredients}
                errors={form.errors.ingredients}
                onChange={form.handleChange}
                onAdd={() => form.addItem("ingredients")}
                onDelete={(idx) => form.deleteData("ingredients", idx)}
                buttonText="+ Ingrediente"
                fieldLabel="Ingrediente"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RecipeListSection
                title="Instrucciones"
                name="instructions"
                items={form.values.instructions}
                errors={form.errors.instructions}
                onChange={form.handleChange}
                onAdd={() => form.addItem("instructions")}
                onDelete={(idx) => form.deleteData("instructions", idx)}
                buttonText="+ Instrucción"
                fieldLabel="Paso"
                multiline
                rows={2}
              />
            </Grid>
          </Grid>

          <Box sx={{ mt: 4, display: "flex", justifyContent: "center" }}>
            <LoadingButton
              type="submit"
              variant="contained"
              isLoading={loadingSubmit || loadingImage}
              disabled={loadingSubmit || loadingImage}
              textWhenNotLoading="Guardar cambios"
              loadingText="Actualizando..."
              sx={{
                width: { xs: "100%", sm: "75%", md: "50%" },
                py: 1.5,
              }}
            />
          </Box>
        </form>
      </StyledPaper>
    </Box>
  );
};

function validateRecipeForm(values: RecipeFormValues) {
  const errors: Partial<Record<keyof RecipeFormValues, string>> = {};

  if (!values.title) errors.title = "El título es obligatorio";
  if (!values.description) errors.description = "La descripción es obligatoria";

  if (values.ingredients.some((i) => !i))
    errors.ingredients = "Todos los ingredientes deben tener texto";

  if (values.instructions.some((i) => !i))
    errors.instructions = "Todas las instrucciones deben tener texto";

  return errors;
}

export default EditRecipe;
