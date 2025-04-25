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
        <>
            <ul>
                {recipes.map((recipe,index) => (
                    <li className={"border-2 w-[10%]"}key={recipe.idMeal||index}>
                        <h2>{recipe.strMeal}</h2>
                        <p>{recipe.strCategory}</p>
                        <p>{recipe.strArea}</p>
                        <img className={"w-[50%]"}src={recipe.strMealThumb} alt={recipe.strMeal} />  
                    </li>
                ))}
            </ul>
        </>
    )
}