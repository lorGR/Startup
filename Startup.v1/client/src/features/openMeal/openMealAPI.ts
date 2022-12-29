import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { Meal } from "./mealModel";

export const addMeal = createAsyncThunk(
  "add-meal",
  async ({ mealInformation }: { mealInformation: object }) => {
    try {
      const { data } = await axios.post("/api/meals/add-meal", {
        mealInformation,
      });
      const { result } = data;
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }
);

export const getLastMeal = createAsyncThunk("get-last-meal", async () => {
  try {
    const { data } = await axios.get("/api/meals/get-last-meal");
    const { result } = data;
    return result[0];
  } catch (error) {
    console.error(error);
  }
});

export const deleteLastMeal = createAsyncThunk(
  "delete-last-meal",
  async ({ mealId }: { mealId: number }) => {
    try {
      const { data } = await axios.post("/api/meals/delete-meal-by-id", {
        mealId,
      });
      const { result } = data;
      return result[0];
    } catch (error) {
      console.error(error);
    }
  }
);

export const closeOpenMealFromEdit = createAsyncThunk("close-open-meal", async ({mealId}:{mealId:number}) =>{
  try {
    const {data} = await axios.post("/api/meals/close-open-meal", {mealId});
    const {result} = data;
    return result[0];
  } catch (error) {
    console.error(error)
  }
})
