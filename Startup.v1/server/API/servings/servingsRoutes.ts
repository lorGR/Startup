import express from "express";
import { addServingToMeal, deleteServing } from "./servingsCtrl";

const router = express.Router();

router
    .post("/add-servings-to-meal", addServingToMeal)
    .post("/delete-serving-by-id", deleteServing)

export default router;