import { useEffect, useState } from "react";
import { ListRecipes } from "./components";
import { IRecipe } from "./types";

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
