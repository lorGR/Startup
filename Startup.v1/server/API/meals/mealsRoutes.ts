import express from "express";
import { addMeal, getMealsServings, getTodayMeals } from "./mealsCtrl";

const router = express.Router();

router
    .post("/add-meal", addMeal)
    .get("/get-today-meals", getTodayMeals)
    .post("/get-meals-servings", getMealsServings)
export default router;