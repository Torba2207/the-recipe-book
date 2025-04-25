import Link from "next/link";

interface Recipe {
    idMeal: string;
    strMeal: string;
    strCategory: string;
    strArea: string;
    strMealThumb: string;
  }
  
  interface RecipesListProps {
    recipes: Recipe[];
  }

export default function RecipesList({ recipes }:RecipesListProps) {
    return(
        <ul className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 p-4">
            {recipes.map((recipe) => (
                <li key={recipe.idMeal} className="border rounded-lg p-4 shadow">
                    <Link href={`/recipes/${recipe.idMeal}`}>
                        <div className="cursor-pointer hover:opacity-80">
                            <img src={recipe.strMealThumb} alt={recipe.strMeal} className="rounded-md" />
                            <h2 className="text-xl font-semibold mt-2">{recipe.strMeal}</h2>
                            <p className="text-sm text-gray-500">{recipe.strArea} - {recipe.strCategory}</p>
                        </div>
                    </Link>
                </li>
            ))}
        </ul>
        
    )
}