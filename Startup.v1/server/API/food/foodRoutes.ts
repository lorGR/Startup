import express from "express";
import { getAllFood, getFoodBySearch, getUserFood, getfoodInfo } from "./foodCtrl";

const router = express.Router();

router
    .get("/get-all-food", getAllFood)
    .get("/get-user-food", getUserFood)
    .post("/get-food-info", getfoodInfo)
    .post("/get-food-by-search", getFoodBySearch)

export default router;