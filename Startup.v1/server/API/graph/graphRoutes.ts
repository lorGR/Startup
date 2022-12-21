import express from "express";
import { getDailyAverageBloodSugar, getDailyCarbs, getDailyInsulin } from "./graphCtrl";

const router = express.Router();

router
    .post("/get-daily-carbs", getDailyCarbs)
    .post("/get-daily-insulin", getDailyInsulin)
    .post("/get-daily-average-blood-sugar", getDailyAverageBloodSugar)

export default router;