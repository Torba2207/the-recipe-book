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
    className?: string;
    category?: string;
  }

export default function MealsOfCategory({ recipes, ...props }: RecipesListProps) {
    return (
        <div className={props.className}>
            <div className="column">
                {recipes.slice(0,4).map((meal) => (
                    <Link
                        href={{ pathname: "/", query: { category: props.category } }} 
                        key={meal.idMeal}
                        className="col-md-4"
                        >
                        <div className="card mb-4">
                            <img src={meal.strMealThumb} className="card-img-top" alt={meal.strMeal} />
                            <div className="card-body">
                                <h5 className="card-title">{meal.strMeal}</h5>
                                <p className="card-text">{meal.strCategory}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}