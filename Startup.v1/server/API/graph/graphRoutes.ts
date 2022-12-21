import express from "express";
import { getDailyCarbs, getDailyInsulin } from "./graphCtrl";

const router = express.Router();

router
    .post("/get-daily-carbs", getDailyCarbs)
    .post("/get-daily-insulin", getDailyInsulin)

export default router;