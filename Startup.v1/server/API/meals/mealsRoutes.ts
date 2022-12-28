import express from "express";
import {
  addMeal,
  getMealsServings,
  getTodayMeals,
  updateMealServing,
  deleteMealById,
  getMealsByDate,
  getLastMeal,
  closeOpenMeal
} from "./mealsCtrl";

const router = express.Router();

router
  .post("/add-meal", addMeal)
  .get("/get-today-meals", getTodayMeals)
  .get("/get-last-meal", getLastMeal)
  .post("/get-meals-servings", getMealsServings)
  .post("/update-meal-serving-amount", updateMealServing)
  .post("/delete-meal-by-id", deleteMealById)
  .post("/get-meals-by-date", getMealsByDate)
  .post("/close-open-meal", closeOpenMeal)
export default router;
