import express from "express";
import { getAllFood } from "./foodCtrl";

const router = express.Router();

router
.get("/get-all-food", getAllFood)

export default router;