import express from "express";
import { getAllFood, getFoodBySearch, getUserFood, getfoodInfo, getAllFoodWithFavorite } from "./foodCtrl";

const router = express.Router();

router
    .get("/get-all-food", getAllFood)
    .get("/get-user-food", getUserFood)
    .get("/get-all-food-with-favorite", getAllFoodWithFavorite)
    .post("/get-food-info", getfoodInfo)
    .post("/get-food-by-search", getFoodBySearch)

export default router;