import express from "express";
import { addMeal } from "./mealsCtrl";

const router = express.Router();

router
    .post("/add-meal", addMeal)

export default router;