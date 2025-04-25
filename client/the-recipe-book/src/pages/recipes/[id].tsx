import { useRouter } from "next/router";
import { use, useEffect, useState } from "react";

import MealsOfCategory from "@/components/MealsOfCategory"; 
import Head from "next/head";


interface Recipe {
    idMeal: string;
    strMeal: string;
    strMealThumb: string;
    strCategory: string;
    strArea: string;
    strInstructions: string;
    // Додаткові поля можна додати за потребою
  }
  

export default function RecipePage() {
  const router = useRouter();
  const { id } = router.query;

  const [recipe, setRecipe] = useState<Recipe|null>(null);
  const [meals, setMeals] = useState([]);
  const [loading, setLoading] = useState(true)
  const [secondLoading, setSecondLoading] = useState(true);

  useEffect(() => {
    if (!id) return;

    const fetchRecipe = async () => {
      try {
        const response = await fetch(`http://localhost:3000/api/recipes/info/${id}`,{
            method: "GET",
        });
        const data = await response.json();
        setRecipe(data.meals[0]); // assuming it's wrapped in `meals`
      } catch (error) {
        console.error("Error fetching recipe:", error);
      } finally {
        setLoading(false);
      }
    };
    
    

    fetchRecipe();
    
  }, [id]);

  useEffect(() => {
    const fetchMeals=async () => {
        try {
            const response = await fetch(`http://localhost:3000/api/recipes/available?category=${recipe?.strCategory}`,{
                method: "GET",
            });
            const data = await response.json();
            setMeals(data.meals);
            console.log(data.meals)
        }
        catch (error) {
            console.error("Error fetching recipe:", error);
        }
        finally {
            setSecondLoading(false);
        }
    }
    fetchMeals()
    },[recipe])

  if (loading||secondLoading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <>
      <Head>
        <title>{recipe.strMeal}</title>
      </Head>
      <div className="flex flex-col lg:flex-row w-full px-4 gap-4">
      <div className="p-4 w-[60%]">
        <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
        <p className="italic">{recipe.strArea} - {recipe.strCategory}</p>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="my-4 w-full max-w-md rounded-xl shadow" />
        <p className="mt-4 whitespace-pre-wrap">{recipe.strInstructions}</p>
        {/* Optional: ingredients table */}
      </div>
      <aside  className="lg:w-1/4 p-4 border-l border-gray-200">
        {meals!==null && <MealsOfCategory className={"space-y-4"} recipes={meals} />}
        
      </aside>
      </div>
    </>
  );
}
