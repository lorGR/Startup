import express from "express";
import { addServingToMeal } from "./servingsCtrl";

const router = express.Router();

router
    .post("/add-servings-to-meal", addServingToMeal)

export default router;