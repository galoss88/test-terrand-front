import { MaterialButton } from "@/components/Material/MaterialButton";
import { MuiCard } from "@/components/Material/MuiCard";
import { StyledText } from "@/pages/auth/styles";
import { Grid } from "@mui/material";
import { memo, useCallback } from "react";
import { useNavigate } from "react-router";
import { IRecipe } from "../types";

const RecipeItem = memo(
  ({
    recipe,
    onEdit = () => {},
    onDetail = () => {},
  }: {
    recipe: IRecipe;
    onEdit?: (recipeId: string | number) => void;
    onDetail?: (recipeId: string | number) => void;
  }) => {
    return (
      <MuiCard>
        <MuiCard.Media image={recipe.image} alt={recipe.title} />
        <MuiCard.Title sx={{ textAlign: "center" }}>
          {recipe.title}
        </MuiCard.Title>
        <MuiCard.Content>
          <MuiCard.Description>{recipe.description}</MuiCard.Description>
          <MuiCard.Description>
            {recipe.ingredients.map((ingredient, index) => {
              return (
                <li key={`${recipe.id}-ingredient-${index}`}>{ingredient}</li>
              );
            })}
          </MuiCard.Description>
        </MuiCard.Content>
        <MuiCard.Actions sx={{ justifyContent: "space-between" }}>
          <MaterialButton onClick={() => onEdit(recipe.id)}>
            Editar
          </MaterialButton>
          <MaterialButton onClick={() => onDetail(recipe.id)}>
            Ver detalle
          </MaterialButton>
        </MuiCard.Actions>
      </MuiCard>
    );
  }
);

export const ListRecipesComponent = ({ recipes }: { recipes: IRecipe[] }) => {
  const navigate = useNavigate();

  const onEdit = useCallback(
    (recipeId: IRecipe["id"]) => {
      navigate(`/myRecipes/edit/${recipeId}`);
    },
    [navigate]
  );

  const onDetail = useCallback(
    (recipeId: IRecipe["id"]) => {
      navigate(`/myRecipes/detail/${recipeId}`);
    },
    [navigate]
  );

  if (recipes.length === 0) {
    return <StyledText>No hay recetas</StyledText>;
  }
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {recipes.map((recipe) => (
        <Grid size={{ xl: 2 }} key={`recipe-${recipe.id}`}>
          <RecipeItem recipe={recipe} onEdit={onEdit} onDetail={onDetail} />
        </Grid>
      ))}
    </Grid>
  );
};

export const ListRecipes = memo(ListRecipesComponent);
