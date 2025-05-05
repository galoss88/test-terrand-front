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
import { Box, Typography } from "@mui/material";
import { useState } from "react";
const initialValues = {
  title: "",
  image: "",
  description: "",
  instructions: [""],
  ingredients: [""],
};
const Create = () => {
  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const formRecipe = useForm({ initialValues });

  const onSubmitRecipe = () => {
    const body = formRecipe.values;
    recipeService.create({ body });
    // const url = "http://localhost:3000/recipes";
    // const idUser = 1;
    // const response = fetch(`${url}?id=${idUser}`, {
    //   method: "POST",
    //   headers: {
    //     "Content-Type": "application/json",
    //   },
    //   body: JSON.stringify(formRecipe.values),
    // });
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
            {/* Primer columna */}

            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                flex: 0.5,
              }}
            >
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
            </Box>
            {/* Segunda columna */}
            <Box sx={{ display: "flex", flex: 1, flexDirection: "column" }}>
              <StyledTextField
                variant="outlined"
                margin="normal"
                required
                fullWidth
                id="title"
                label="Titulo"
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
                autoComplete="title"
                autoFocus
                onChange={formRecipe.handleChange}
                value={formRecipe.values.description}
                error={!!formRecipe.errors.description}
                helperText={formRecipe.errors.description}
              />
            </Box>
          </Box>

          <Box sx={{ display: "flex", flex: 1, width: "100%", gap: { xs: 2 } }}>
            <Box
              sx={{
                flexDirection: "column",
                flex: 0.5,
              }}
            >
              {formRecipe?.values?.ingredients?.map?.((ingredient, index) => {
                return (
                  <Box component="section" sx={{ display: "flex" }} key={index}>
                    <StyledTextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="ingredients"
                      label="Ingrediente"
                      type="text"
                      id="ingredients"
                      onChange={(e) => formRecipe.handleChange(e, index)}
                      value={ingredient}
                      error={!!formRecipe.errors.ingredients}
                      helperText={formRecipe.errors.ingredients}
                    />
                    <DeleteButton
                      onClick={() =>
                        formRecipe.deleteData("ingredients", index)
                      }
                      sx={styles.buttonDelete}
                    >
                      X
                    </DeleteButton>
                  </Box>
                );
              })}
              <MaterialButton onClick={() => formRecipe.addItem("ingredients")}>
                +
              </MaterialButton>
            </Box>
            <Box
              component="section"
              sx={{ flexDirection: "column", flex: 0.5 }}
            >
              {formRecipe?.values?.instructions?.map?.((instruction, index) => {
                return (
                  <Box component="section" sx={{ display: "flex" }} key={index}>
                    <StyledTextField
                      variant="outlined"
                      margin="normal"
                      required
                      fullWidth
                      name="instructions"
                      label="Instrucciones"
                      type="text"
                      id="instructions"
                      onChange={(e) => formRecipe.handleChange(e, index)}
                      value={instruction}
                      error={!!formRecipe.errors.instructions}
                      helperText={formRecipe.errors.instructions}
                      key={index}
                    />
                    <DeleteButton
                      onClick={() =>
                        formRecipe.deleteData("instructions", index)
                      }
                      sx={styles.buttonDelete}
                    >
                      X
                    </DeleteButton>
                  </Box>
                );
              })}
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
          ></LoadingButton>
        </form>
      </StyledPaper>
    </StyledContainer>
  );
};

export default Create;

const styles = {
  buttonDelete: {
    color: "red",
    backgroundColor: "transparent",
    "& hover": { color: "blue" },
  },
};
