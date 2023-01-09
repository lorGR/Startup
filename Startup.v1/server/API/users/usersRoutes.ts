import express from "express";
import { getUserByCookie, login, register, updateCarbsGoal, updateUserInfo, updateUserInformation } from "./usersCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.post("/updated-user-info", updateUserInfo)
.post("/update-information", updateUserInformation)
.get("/get-user-by-cookie", getUserByCookie)
.patch("/update-user-carbs-goal", updateCarbsGoal)

export default router;