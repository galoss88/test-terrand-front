import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { fetchApi, FetchParams } from "@/utils/api";
import { apiUrl } from "../baseUrl";
import { imageUploadService } from "../images/imageUploadService";
export const recipeServiceParams = {
  getAllById(): FetchParams {
    const url = `${apiUrl}/private/recipes`;
    const params = {
      url,
      method: "GET",
    };
    return params;
  },
  create(): FetchParams {
    const paramsCreate = {
      url: `http://localhost:3000/private/recipes/create`,
      method: "POST",
    };
    return paramsCreate;
  },
};
export const recipeService = {
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

  async create({ body }: { body: Omit<IRecipe, "id"> }): Promise<IRecipe> {
    return await fetchApi<IRecipe>({
      ...recipeServiceParams.create(),
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
