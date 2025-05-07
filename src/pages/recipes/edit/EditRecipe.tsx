import { Box } from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

// Componentes
import {
  LinkButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { StyledContainer, StyledPaper, StyledText } from "@/pages/auth/styles";

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
    // setImgError,
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
    return <Box>Cargando receta...</Box>;
  }

  if (error) {
    return (
      <Box>
        Ocurrió un error al traer la receta a editar
        <MaterialButton onClick={() => refetch()}>
          Recargar datos
        </MaterialButton>
      </Box>
    );
  }

  const placeholder =
    "https://via.placeholder.com/150?text=Sin+previsualizaci%C3%B3n";
  const imageToShow = imgError ? placeholder : localPreview || placeholder;

  return (
    <StyledContainer maxWidth={false} sx={{ height: "100%" }}>
      <StyledPaper elevation={3} sx={{ height: "100%", overflowY: "auto" }}>
        <StyledText variant="h5" color="rgba(255, 255, 255, 0.9)" mb={2}>
          Editar receta
        </StyledText>
        <LinkButton href="/myRecipes">Volver mis recetas</LinkButton>

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: 16,
          }}
          onSubmit={form.handleSubmit(onSubmit)}
        >
          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {/* Sección de imagen */}
            <ImageUploadSection
              form={form}
              handleImageUrlChange={handleImageUrlChange}
              imageSelectionProps={imageSelectionProps}
              imageToShow={imageToShow}
            />

            {/* Sección de campos básicos */}
            <RecipeFieldsSection form={form} />
          </Box>

          <Box sx={{ display: "flex", gap: 2, width: "100%" }}>
            {/* Ingredientes */}
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

            {/* Instrucciones */}
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
