import axios from "axios";
import { Router } from "express";
import dotenv from 'dotenv';


dotenv.config();
const recipeRoutes = Router()

const api_url=process.env.RECIPE_API_BASE_URL
recipeRoutes.get("/available", async (req, res) => {
    const {ingredient,country,category} = req.query
    let url=`${api_url}/search.php?s=`
    if(ingredient) {
        url=`${api_url}/filter.php?i=${ingredient}`
    }
    if(country) { 
        url=`${api_url}/filter.php?a=${country}`
    }
    if(category) {
        url=`${api_url}/filter.php?c=${category}`
    }

    console.log(`Request URL: ${url}`);  // Log the constructed URL


    try {
        const response = await axios.get(url)
        res.status(200).json(response.data);

    }
    catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})


recipeRoutes.get("/info/:id", async (req, res) => {
    const {id} = req.params
    const url=`${api_url}/lookup.php?i=${id}`

    try {
        const response = await axios.get(url)
        res.status(200).json(response.data);

    }
    catch (error) {
        console.error("Error fetching data from API:", error);
        res.status(500).json({ error: "Internal Server Error" });
    }
})






export {recipeRoutes} 