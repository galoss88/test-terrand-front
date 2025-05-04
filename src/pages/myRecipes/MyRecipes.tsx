import { useEffect, useState } from "react";
interface IRecipe {
  id: number;
  title: string;
  description: string;
  ingredients: string[];
  instructions: string[];
  image: string;
}

const ListRecipes = ({ recipes }: { recipes: IRecipe[] }) => {
  if (recipes.length === 0) {
    return <p>No hay recetas</p>;
  }
  return recipes.map((recipe) => (
    <div key={recipe.id}>
      <img src={recipe.image} alt={recipe.title} width="200" height="200" />
      <h2>{recipe.title}</h2>
      <p>{recipe.description}</p>
      <p>
        Ingredientes:{" "}
        {recipe.ingredients.map((ingredient) => {
          return <span key={ingredient}>{ingredient}, </span>;
        })}
      </p>
    </div>
  ));
};

const MyRecipes = () => {
  const [recipes, setRecipes] = useState<IRecipe[]>([]);
  useEffect(() => {
    const fetchData = async () => {
      const url = "http://localhost:3000/recipes";
      const idUser = 1;
      const response = await fetch(`${url}?userId=${idUser}`);
      const data = await response.json();
      setRecipes(data);
    };
    fetchData();
  }, []);
  return (
    <div>
      Mis recetas
      <ListRecipes recipes={recipes} />
    </div>
  );
};

export default MyRecipes;
