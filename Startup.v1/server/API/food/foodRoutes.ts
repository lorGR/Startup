import express from "express";
import { getAllFood, getFoodBySearch, getUserFood, getfoodInfo } from "./foodCtrl";

const router = express.Router();

router
    .get("/get-all-food", getAllFood)
    .get("/get-user-food", getUserFood)
    .get("/get-food-info", getfoodInfo)
    .post("/get-food-by-search", getFoodBySearch)

export default router;