import express from "express";
import { getDailyAverageBloodSugar, getDailyCarbs, getDailyInsulin, getMaximumAverageBloodSugarInWeek, getMaximumCarbsInWeek, getMaximumInsulinInWeek } from "./graphCtrl";

const router = express.Router();

router
    .post("/get-daily-carbs", getDailyCarbs)
    .post("/get-daily-insulin", getDailyInsulin)
    .post("/get-daily-average-blood-sugar", getDailyAverageBloodSugar)
    .post("/get-maximum-carbs-week", getMaximumCarbsInWeek)
    .post("/get-maximum-insulin-week", getMaximumInsulinInWeek)
    .post("/get-maximum-average-blood-sugar-week", getMaximumAverageBloodSugarInWeek)



export default router;