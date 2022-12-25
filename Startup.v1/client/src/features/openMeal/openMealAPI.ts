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

export const getLastMeal = createAsyncThunk('get-last-meal',
async () => {
    try {
        const {data} = await axios.get("/api/meals/get-last-meal");
            const {result} = data;
            console.log(data)
            return result[0]
    } catch (error) {
        console.error(error)
    }
})