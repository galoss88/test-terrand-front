export interface IRecipe {
  id: number | string;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
}
