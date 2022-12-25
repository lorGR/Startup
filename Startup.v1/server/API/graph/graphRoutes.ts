import express from "express";
import { getMaximumAverageBloodSugarInWeek, getMaximumCarbsInWeek, getMaximumInsulinInWeek } from "./graphCtrl";

const router = express.Router();

router
    .post("/get-maximum-carbs-week", getMaximumCarbsInWeek)
    .post("/get-maximum-insulin-week", getMaximumInsulinInWeek)
    .post("/get-maximum-average-blood-sugar-week", getMaximumAverageBloodSugarInWeek)



export default router;