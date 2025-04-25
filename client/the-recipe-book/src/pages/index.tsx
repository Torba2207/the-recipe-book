import Head from "next/head";
import { useRouter } from "next/router";
import { useState,useEffect } from "react";
import RecipesList from "@/components/RecipesList";
import LoadingScreen from "@/components/LoadingScreen";

export default function Home() {
    const router = useRouter();
    const [recipes, setRecipes] = useState([]);
    const [filter,setFilter]=useState({
        ingredient: "",
        country: "",
        category: "",
      })

    const[filterApply,setFilterApply]=useState(false)
    
    
    const [loading, setLoading] = useState(true);


    const handleFilterChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = event.target;
        setFilter((prevFilter) => ({
          ...prevFilter,
          [name]: value,
        }));
        console.log(filter)
      };

      const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        console.log(filter)
        setFilterApply(filterApply => !filterApply);
      }
    const fetchRecipes = async () => {
        setLoading(true);
        try{
            let url="http://localhost:3000/api/recipes/available"
            if (filter.ingredient)
                url=`${url}?ingredient=${filter.ingredient}`
            else
                if (filter.country) 
                url=`${url}?country=${filter.country}`
            else
            if (filter.category) 
                url=`${url}?category=${filter.category}`
                    
            const response = await fetch(url,{
                method: "GET",
            });
            if (!response.ok) {
                throw new Error("Network response was not ok");
            };
            const data=await response.json();
            setRecipes(data.meals);


        }catch (error) {
            console.error("Error fetching recipes:", error);   
        }
        finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchRecipes();
    }, [filterApply,router.query]);

    useEffect(() => {
        if (!router.isReady) return;
        console.log(router.query.toString())
        
        const { ingredient, country, category } = router.query;
        setFilter({
        ingredient: ingredient?.toString() || "",
        country: country?.toString() || "",
        category: category?.toString() || "",
        });
        console.log(filter)
        setFilterApply(!filterApply)
        if(filter.category!="undefined" && filter.category!="")
            fetchRecipes()
        console.log(router.query)
        
      }, [router.isReady,router.query]);


    console.log(recipes)

    if (loading) {
        return <LoadingScreen />;
    }
    
    if(!recipes || recipes.length === 0)
        return (<div className="p-4">No recipes found</div>)


    return(<>
        <Head>
            <title>The Recipe Book {filter.category+" "+filter.country+" "+filter.ingredient}</title>
            <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <form onSubmit={handleSubmit}>
  <label>
    Ingredient:
    <input
      type="text"
      name="ingredient"
      value={filter.ingredient}
      onChange={handleFilterChange}
    />
  </label>
  <label>
    Country:
    <input
      type="text"
      name="country"
      value={filter.country}
      onChange={handleFilterChange}
    />
  </label>
  <label>
    Category:
    <input
      type="text"
      name="category"
      value={filter.category}
      onChange={handleFilterChange}
    />
  </label>
  <button type="submit">Apply Filters</button>
</form>
            <RecipesList recipes={recipes}/>

    
    </>)
}