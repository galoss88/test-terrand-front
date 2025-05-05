import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { fetchApi } from "@/utils/api";

export const recipeService = {
  getAllById(id: string): Promise<IRecipe[]> {
    const url = "http://localhost:3000/recipes";
    const idUser = id;

    return fetchApi<IRecipe[]>({
      url: `${url}?userId=${idUser}`,
      method: "GET",
    });
  },
  getById(id: string): Promise<IRecipe> {
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${id}`,
      method: "GET",
    });
  },

  update(id: string, body: Omit<IRecipe, "id">): Promise<IRecipe> {
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${id}`,
      method: "PUT",
      body,
    });
  },

  create({ body }: { body: Omit<IRecipe, "id"> }): Promise<IRecipe> {
    const idUser = "1";
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes?id=${idUser}`,
      method: "POST",
      body: body,
    });
  },
};
