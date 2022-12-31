import express from "express";
import { getAllFood, getFoodBySearch, getuserFood } from "./foodCtrl";

const router = express.Router();

router
    .get("/get-all-food", getAllFood)
    .get("/get-user-food", getuserFood)
    .post("/get-food-by-search", getFoodBySearch)

export default router;