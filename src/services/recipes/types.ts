import { IRecipe } from "@/pages/recipes/myRecipes/types";
import { FetchParams } from "@/utils/api";

export interface IRecipeServiceParams {
  /** Devuelve los FetchParams para listar recetas del usuario */
  getAllById(): FetchParams;
  /** Devuelve los FetchParams para crear una receta;
   *  token es opcional */
  create(token?: string): FetchParams;
}

export interface IRecipeService {
  /** Obtiene una receta por su ID */
  getById(id: number | string): Promise<IRecipe>;
  /** Actualiza una receta existente */
  update(id: number | string, body: Omit<IRecipe, "id">): Promise<IRecipe>;
  /** Crea una nueva receta (requiere token) */
  create(data: { body: Omit<IRecipe, "id">; token: string }): Promise<IRecipe>;
  /** Sube una imagen y devuelve su URL pública */
  uploadImage(file: File | FormData): Promise<string>;
}
