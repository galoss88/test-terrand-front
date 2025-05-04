import { MaterialButton } from "@/components/Material/MaterialButton";
import { MuiCard } from "@/components/Material/MuiCard";
import { Grid } from "@mui/material";
import { useCallback } from "react";
import { useNavigate } from "react-router";
import { IRecipe } from "../types";

const RecipeItem = ({
  recipe,
  onEdit = () => {},
}: {
  recipe: IRecipe;
  onEdit?: (recipeId: string | number) => void;
}) => {
  return (
    <MuiCard key={recipe.id}>
      <MuiCard.Media image={recipe.image} alt={recipe.title} />
      <MuiCard.Title sx={{ textAlign: "center" }}>{recipe.title}</MuiCard.Title>
      <MuiCard.Content>
        <MuiCard.Description>{recipe.description}</MuiCard.Description>
        <MuiCard.Description>
          {recipe.ingredients.map((ingredient) => {
            return <p key={ingredient}>- {ingredient}</p>;
          })}
        </MuiCard.Description>
      </MuiCard.Content>
      <MuiCard.Actions sx={{ justifyContent: "flex-end" }}>
        <MaterialButton onClick={() => onEdit(recipe.id)}>
          Editar
        </MaterialButton>
      </MuiCard.Actions>
    </MuiCard>
  );
};

export const ListRecipes = ({ recipes }: { recipes: IRecipe[] }) => {
  const navigate = useNavigate();
  const onEdit = useCallback(
    (recipeId: IRecipe["id"]) => {
      navigate(`/myRecipes/detail/${recipeId}`);
    },
    [navigate]
  );
  if (recipes.length === 0) {
    return <p>No hay recetas</p>;
  }
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {recipes.map((recipe) => (
        <Grid size={{ xl: 2 }} key={recipe.id}>
          <RecipeItem recipe={recipe} onEdit={onEdit} />
        </Grid>
      ))}
    </Grid>
  );
};
