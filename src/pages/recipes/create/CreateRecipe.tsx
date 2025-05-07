import {
  DeleteButton,
  LoadingButton,
  MaterialButton,
} from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import { useFetchWithAuth } from "@/hooks/useFetchWithAuth";
import {
  StyledContainer,
  StyledPaper,
  StyledText,
  StyledTextField,
} from "@/pages/auth/styles";
import { imageUploadService } from "@/services/images/imageUploadService";
import { recipeServiceParams } from "@/services/recipes/recipesService";
import { fetchApi } from "@/utils/api";
import { Box, Typography } from "@mui/material";
import { useState } from "react";

const initialValues = {
  title: "",
  image: "", // aquí guardaremos SOLO la URL, no el File
  description: "",
  instructions: [""],
  ingredients: [""],
};

type InitialValues = typeof initialValues;

const CreateRecipe = () => {
  const fetchWithAuth = useFetchWithAuth(fetchApi);
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [error, setError] = useState<string>();
  // nuevo estado para almacenar el File que selecciona el usuario
  const [file, setFile] = useState<File | null>(null);

  const formRecipe = useForm({ initialValues });

  const onSubmitRecipe = async (values: InitialValues) => {
    setLoadingSubmit(true);
    setError(undefined);

    try {
      let imageUrl = values.image;
      if (file) {
        const uploadResult = await imageUploadService.uploadImage(file);
        if (!uploadResult.success) {
          throw new Error(uploadResult.error || "Error al subir la imagen");
        }
        imageUrl = uploadResult.url;
      }

      const body = {
        ...values,
        image: imageUrl,
      };
      await fetchWithAuth({
        ...recipeServiceParams.create(),
        body,
      });
    } catch (err: any) {
      console.error(err);
      setError(err.message || "Falló la creación de la receta.");
    } finally {
      setLoadingSubmit(false);
    }
  };

  return (
    <StyledContainer maxWidth={false} sx={{ height: "100%" }}>
      <StyledPaper elevation={3} sx={{ height: "100%" }}>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(255, 255, 255, 0.9)"
          mb={2}
        >
          Crear receta
        </Typography>

        {error && <StyledText color="error">{error}</StyledText>}

        <form
          style={{
            width: "100%",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
          }}
          onSubmit={formRecipe.handleSubmit(onSubmitRecipe)}
        >
          <Box
            sx={{
              display: "flex",
              gap: { xs: 5 },
              justifyContent: "flex-start",
              width: "100%",
            }}
          >
            {/* Input de fichero */}
            <Box sx={{ flex: 0.5 }}>
              <input
                type="file"
                accept="image/*"
                onChange={(e) => {
                  if (e.target.files?.[0]) {
                    setFile(e.target.files[0]);
                  }
                }}
              />
            </Box>

            {/* Título y descripción */}
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Título"
                name="title"
                autoComplete="title"
                autoFocus
                onChange={formRecipe.handleChange}
                value={formRecipe.values.title}
                error={!!formRecipe.errors.title}
                helperText={formRecipe.errors.title}
              />
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="description"
                label="Descripción"
                name="description"
                onChange={formRecipe.handleChange}
                value={formRecipe.values.description}
                error={!!formRecipe.errors.description}
                helperText={formRecipe.errors.description}
              />
            </Box>
          </Box>

          {/* Ingredientes e instrucciones (igual que antes) */}
          <Box sx={{ display: "flex", flex: 1, width: "100%", gap: 2 }}>
            <Box sx={{ flex: 0.5, flexDirection: "column" }}>
              {formRecipe.values.ingredients.map((ing, i) => (
                <Box key={i} sx={{ display: "flex" }}>
                  <StyledTextField
                    name="ingredients"
                    label="Ingrediente"
                    onChange={(e) => formRecipe.handleChange(e, i)}
                    value={ing}
                    error={!!formRecipe.errors.ingredients}
                    helperText={formRecipe.errors.ingredients}
                    fullWidth
                  />
                  <DeleteButton
                    onClick={() => formRecipe.deleteData("ingredients", i)}
                    sx={styles.buttonDelete}
                  >
                    X
                  </DeleteButton>
                </Box>
              ))}
              <MaterialButton onClick={() => formRecipe.addItem("ingredients")}>
                +
              </MaterialButton>
            </Box>

            <Box sx={{ flex: 0.5, flexDirection: "column" }}>
              {formRecipe.values.instructions.map((ins, i) => (
                <Box key={i} sx={{ display: "flex" }}>
                  <StyledTextField
                    name="instructions"
                    label="Instrucción"
                    onChange={(e) => formRecipe.handleChange(e, i)}
                    value={ins}
                    error={!!formRecipe.errors.instructions}
                    helperText={formRecipe.errors.instructions}
                    fullWidth
                  />
                  <DeleteButton
                    onClick={() => formRecipe.deleteData("instructions", i)}
                    sx={styles.buttonDelete}
                  >
                    X
                  </DeleteButton>
                </Box>
              ))}
              <MaterialButton
                onClick={() => formRecipe.addItem("instructions")}
              >
                +
              </MaterialButton>
            </Box>
          </Box>

          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Crear receta"
            loadingText="Creando receta..."
          />
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default CreateRecipe;

const styles = {
  buttonDelete: {
    color: "red",
    backgroundColor: "transparent",
    "&:hover": { color: "blue" },
  },
};
