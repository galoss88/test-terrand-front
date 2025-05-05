import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { fetchApi } from "@/utils/api";

export const recipeService = {
  getById(id: number): Promise<IRecipe> {
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${id}`,
      method: "GET",
    });
  },

  update(id: number, body: Omit<IRecipe, "id">): Promise<IRecipe> {
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${id}`,
      method: "PUT",
      body,
    });
  },

  create({ body }: { body: Omit<IRecipe, "id"> }) {
    const idUser = "1";
    fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes?id=${idUser}`,
      method: "POST",
      body: body,
    });
  },
};
