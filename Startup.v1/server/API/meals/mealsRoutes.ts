import express from "express";
import { addMeal, getTodayMeals } from "./mealsCtrl";

const router = express.Router();

router
    .post("/add-meal", addMeal)
    .get("/get-today-meals", getTodayMeals)

export default router;