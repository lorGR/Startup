import express from "express";

import {addFoodByUser } from "./userFoodCtrl";

const router = express.Router();

router
    .post("/add-food", addFoodByUser)

export default router;