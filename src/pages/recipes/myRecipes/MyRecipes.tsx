import { StyledContainer } from "@/pages/auth/styles";
import { recipeService } from "@/services/recipes/recipesService";
import { useEffect, useState } from "react";
import { ListRecipes } from "./components";
import { IRecipe } from "./types";

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  
  useEffect(() => {
    const fetchData = async () => {
      const data = await recipeService.getAllById("1");
      setRecipes(data);
    };
    fetchData();
  }, []);

  return (
    <StyledContainer maxWidth={false} sx={{ backgroundColor: "tranparent" }}>
      Mis recetas
      <ListRecipes recipes={recipes} />
    </StyledContainer>
  );
};

export default MyRecipes;
