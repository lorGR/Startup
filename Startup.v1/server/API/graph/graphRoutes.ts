import express from "express";
import { getDailyCarbs } from "./graphCtrl";

const router = express.Router();

router
    .post("/get-daily-carbs", getDailyCarbs)

export default router;