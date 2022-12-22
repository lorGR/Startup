import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Meal } from './mealModel';

export const addMeal = createAsyncThunk(
    'add-meal',
    async({mealInformation}:{mealInformation:object}) => {
        try {
            const {data} = await axios.post("/api/meals/add-meal", { mealInformation });
            const {result} = data;
            return result[0]
        } catch (error) {
            console.error(error);
        }
    }
)