import { MaterialButton } from "@/components/Material/MaterialButton";
import { MuiCard } from "@/components/Material/MuiCard";
import { Grid } from "@mui/material";
import { IRecipe } from "../types";

const RecipeItem = ({ recipe }: { recipe: IRecipe }) => {
  return (
    <MuiCard key={recipe.id}>
      <MuiCard.Media image={recipe.image} alt={recipe.title} />
      <MuiCard.Title sx={{ textAlign: "center" }}>{recipe.title}</MuiCard.Title>
      <MuiCard.Content>
        <MuiCard.Description>{recipe.description}</MuiCard.Description>
        <MuiCard.Description>
          {recipe.ingredients.map((ingredient) => {
            return <p>- {ingredient}</p>;
          })}
        </MuiCard.Description>
      </MuiCard.Content>
      <MuiCard.Actions sx={{ justifyContent: "flex-end" }}>
        <MaterialButton>Editar</MaterialButton>
      </MuiCard.Actions>
    </MuiCard>
  );
};

export const ListRecipes = ({ recipes }: { recipes: IRecipe[] }) => {
  if (recipes.length === 0) {
    return <p>No hay recetas</p>;
  }
  return (
    <Grid container spacing={2} justifyContent="flex-start">
      {recipes.map((recipe) => (
        <Grid size={{ xl: 2 }} key={recipe.id}>
          <RecipeItem recipe={recipe} />
        </Grid>
      ))}
    </Grid>
  );
};
