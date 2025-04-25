import { useRouter } from "next/router";
import { useEffect, useState } from "react";
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
  const [loading, setLoading] = useState(true);

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

  if (loading) return <p>Loading...</p>;
  if (!recipe) return <p>Recipe not found</p>;

  return (
    <>
      <Head>
        <title>{recipe.strMeal}</title>
      </Head>
      <div className="p-4">
        <h1 className="text-3xl font-bold">{recipe.strMeal}</h1>
        <p className="italic">{recipe.strArea} - {recipe.strCategory}</p>
        <img src={recipe.strMealThumb} alt={recipe.strMeal} className="my-4 w-full max-w-md rounded-xl shadow" />
        <p className="mt-4 whitespace-pre-wrap">{recipe.strInstructions}</p>
        {/* Optional: ingredients table */}
      </div>
    </>
  );
}
