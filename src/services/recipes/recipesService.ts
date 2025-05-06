import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { fetchApi } from "@/utils/api";
import { imageUploadService } from "../images/imageUploadService";

export const recipeService = {
  getAllById(id: string): Promise<IRecipe[]> {
    const url = "http://localhost:3000/recipes";
    const idUser = id;

    return fetchApi<IRecipe[]>({
      url: `${url}?userId=${idUser}`,
      method: "GET",
    });
  },

  getById(id: number | string): Promise<IRecipe> {
    const idRecipeToGet = id;
    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${idRecipeToGet}`,
      method: "GET",
    });
  },

  update(id: number | string, body: Omit<IRecipe, "id">): Promise<IRecipe> {
    const idRecipeToUpdate = id;

    return fetchApi<IRecipe>({
      url: `http://localhost:3000/recipes/${idRecipeToUpdate}`,
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

  async uploadImage(file: File | FormData): Promise<string> {
    const result = await imageUploadService.uploadImage(file);

    if (!result.success) {
      throw new Error(result.error || "Error al subir la imagen");
    }

    return result.url;
  },
};
