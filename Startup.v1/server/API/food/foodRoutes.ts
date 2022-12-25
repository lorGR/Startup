import express from "express";
import { getAllFood, getFoodBySearch } from "./foodCtrl";

const router = express.Router();

router
    .get("/get-all-food", getAllFood)
    .post("/get-food-by-search", getFoodBySearch)

export default router;