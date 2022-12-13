import express from "express";
import {
  addMeal,
  getMealsServings,
  getTodayMeals,
  updateMealServing,
  deleteMealById,
} from "./mealsCtrl";

const router = express.Router();

router
  .post("/add-meal", addMeal)
  .get("/get-today-meals", getTodayMeals)
  .post("/get-meals-servings", getMealsServings)
  .post("/update-meal-serving-amount", updateMealServing)
  .post("/delete-meal-by-id", deleteMealById);
export default router;
