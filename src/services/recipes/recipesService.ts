import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { fetchApi, FetchParams } from "@/utils/api";
import { apiUrl } from "../baseUrl";
import { imageUploadService } from "../images/imageUploadService";
import { IRecipeService } from "./types";
export const recipeServiceParams = {
  getAllById(): FetchParams {
    const url = `${apiUrl}/private/recipes`;
    const params = {
      url,
      method: "GET",
    };
    return params;
  },
  create(token?: string): FetchParams {
    const paramsCreate = {
      url: `${apiUrl}/private/recipes`,
      method: "POST",
      ...(token ? { Authorization: `Bearer ${token}` } : {}),
    };
    return paramsCreate;
  },
};
export const recipeService: IRecipeService = {
  getById(id) {
    return fetchApi<IRecipe>({
      url: `${apiUrl}/recipes/${id}`,
      method: "GET",
    });
  },

  update(id, body) {
    return fetchApi<IRecipe>({
      url: `${apiUrl}/recipes/${id}`,
      method: "PUT",
      body,
    });
  },

  async create({ body, token }) {
    return fetchApi<IRecipe>({
      ...recipeServiceParams.create(token),
      body,
    });
  },

  async uploadImage(file) {
    const result = await imageUploadService.uploadImage(file);
    if (!result.success) {
      throw new Error(result.error || "Error al subir la imagen");
    }
    return result.url;
  },
};
