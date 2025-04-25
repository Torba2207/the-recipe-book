import express from 'express';
//import axios from 'axios';
import dotenv from 'dotenv';
import { recipeRoutes } from './routes.js';
import cors from 'cors';



dotenv.config();
const app = express();
app.use(cors({
    origin: 'http://localhost:3001', // Allow requests only from your frontend
  }));
  
const port = process.env.PORT || 3000;
app.use(express.json());
app.use('/api/recipes', recipeRoutes);
app.listen(port, () => {
    console.log(`Server is running at http://localhost:${port}`);
})