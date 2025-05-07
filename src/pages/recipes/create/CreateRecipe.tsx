import {
  LinkButton,
  LoadingButton,
} from "@/components/Material/MaterialButton";

import { useForm } from "@/hooks";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import { useNavigation } from "@/hooks/useNavigation";
import { StyledPaper, StyledText } from "@/pages/auth/styles";
import { imageUploadService } from "@/services/images/imageUploadService";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { fetchApi } from "@/utils/api";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { Box, Grid } from "@mui/material";
import { useState } from "react";
import ImageUploadSection from "../components/ImageUploadSection";
import RecipeFieldsSection from "../components/RecipeFieldsSection";
import RecipeListSection from "../components/RecipeListSection";

const initialValues = {
  title: "",
  image: "",
  description: "",
  instructions: [""],
  ingredients: [""],
};

type InitialValues = typeof initialValues;

const CreateRecipe = () => {
  const fetchWithAuth = useFetchWithAuth(fetchApi);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState<string>();
  const [file, setFile] = useState<File | null>(null);
  const [localPreview, setLocalPreview] = useState("");
  const [imgError, setImgError] = useState(false);
  const [loadingImage, setLoadingImage] = useState(false);
  const { goTo } = useNavigation();
  const formRecipe = useForm({ initialValues });

  const handleImageUrlChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    formRecipe.handleChange(e);
    setLocalPreview("");
    setFile(null);
  };

  const handleFileSelection = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      const selectedFile = e.target.files[0];
      setFile(selectedFile);

      // Crear una vista previa local
      const reader = new FileReader();
      reader.onload = () => {
        if (typeof reader.result === "string") {
          setLocalPreview(reader.result);
        }
      };
      reader.readAsDataURL(selectedFile);
      formRecipe.setPropertyValue("image", "");
      setImgError(false);
    }
  };

  const clearSelection = () => {
    setFile(null);
    setLocalPreview("");
  };

  const cleanup = () => {
    clearSelection();
    setImgError(false);
  };

  const imageToShow = localPreview || formRecipe.values.image || "";

  const onSubmitRecipe = async (values: InitialValues) => {
    setLoadingSubmit(true);
    setError(undefined);

    try {
      let imageUrl = values.image;
      if (file) {
        setLoadingImage(true);
        const uploadResult = await imageUploadService.uploadImage(file);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Error al subir la imagen");
        }
        imageUrl = uploadResult.url;
        setLoadingImage(false);
      }

      const body = {
        ...values,
        image: imageUrl,
      };
      await fetchWithAuth({
        ...recipeServiceParams.create(),
        body,
      });
      formRecipe.resetForm();
      cleanup();
      goTo("/myRecipes");
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Falló la creación de la receta.");
    } finally {
      setLoadingSubmit(false);
      setLoadingImage(false);
    }
  };

  const imageSelectionProps = {
    selectedFile: file,
    localPreview,
    imgError,
    loadingImage,
    setLoadingImage,
    handleFileSelection,
    clearSelection,
    setImgError,
    setLocalPreview,
    cleanup,
  };

  return (
    <Box sx={{ height: "100%" }}>
      <StyledPaper elevation={3} sx={{ p: 3, height: "100%", mt: 0 }}>
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
            Crear receta
          </StyledText>
        </Box>

        {error && (
          <StyledText color="error" sx={{ mb: 2 }}>
            {error}
          </StyledText>
        )}

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            gap: "16px",
          }}
          onSubmit={formRecipe.handleSubmit(onSubmitRecipe)}
        >
          <Grid container spacing={2}>
            <Grid size={{ xs: 12, sm: 4, md: 6 }}>
              <ImageUploadSection
                form={formRecipe}
                handleImageUrlChange={handleImageUrlChange}
                imageSelectionProps={imageSelectionProps}
                imageToShow={imageToShow}
              />
            </Grid>

            <Grid size={{ xs: 12, sm: 8, md: 5 }}>
              <RecipeFieldsSection form={formRecipe} />
            </Grid>
          </Grid>

          <Grid container spacing={2} sx={{ mt: 1 }}>
            <Grid size={{ xs: 12, md: 6 }}>
              <RecipeListSection
                title="Ingredientes"
                name="ingredients"
                items={formRecipe.values.ingredients}
                errors={formRecipe.errors.ingredients}
                onChange={formRecipe.handleChange}
                onAdd={() => formRecipe.addItem("ingredients")}
                onDelete={(index) =>
                  formRecipe.deleteData("ingredients", index)
                }
                buttonText="Añadir ingrediente"
                fieldLabel="Ingrediente"
              />
            </Grid>

            <Grid size={{ xs: 12, md: 6 }}>
              <RecipeListSection
                title="Instrucciones"
                name="instructions"
                items={formRecipe.values.instructions}
                errors={formRecipe.errors.instructions}
                onChange={formRecipe.handleChange}
                onAdd={() => formRecipe.addItem("instructions")}
                onDelete={(index) =>
                  formRecipe.deleteData("instructions", index)
                }
                buttonText="Añadir instrucción"
                fieldLabel="Paso"
                multiline={true}
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
              textWhenNotLoading="Crear receta"
              loadingText="Creando receta..."
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

export default CreateRecipe;
