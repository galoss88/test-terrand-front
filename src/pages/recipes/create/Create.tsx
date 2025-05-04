import { LoadingButton } from "@/components/Material/MaterialButton";
import { useForm } from "@/hooks";
import {
  StyledContainer,
  StyledPaper,
  StyledTextField,
} from "@/pages/auth/styles";
import { Typography } from "@mui/material";
import { useState } from "react";
const initialValues = {
  title: "",
  image: "",
  instructions: [""],
  ingredients: [""],
};
const Create = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formRecipe = useForm({ initialValues });
  const onSubmitRecipe = () => {};
  return (
    <StyledContainer maxWidth={false}>
      <StyledPaper elevation={3}>
        <Typography
          component="h1"
          variant="h5"
          color="rgba(255, 255, 255, 0.9)"
          mb={2}
        >
          Crear receta
        </Typography>

        <form
          style={{ width: "100%" }}
          onSubmit={formRecipe.handleSubmit(onSubmitRecipe)}
        >
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="title"
            label="title"
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
            name="image"
            type="file"
            id="image"
            autoComplete="current-image"
            onChange={formRecipe.handleChange}
            value={formRecipe.values.image}
            error={!!formRecipe.errors.image}
            helperText={formRecipe.errors.image}
          />
          <StyledTextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            name="image"
            label="Ingrediente"
            type="text"
            id="image"
            autoComplete="current-image"
            onChange={formRecipe.handleChange}
            value={formRecipe.values.image}
            error={!!formRecipe.errors.image}
            helperText={formRecipe.errors.image}
          />
          <LoadingButton
            type="submit"
            fullWidth
            variant="contained"
            isLoading={loadingSubmit}
            disabled={loadingSubmit}
            textWhenNotLoading="Iniciar sesión"
            loadingText="Iniciando sesión..."
          ></LoadingButton>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Create;
