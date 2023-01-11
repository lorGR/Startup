import express from "express";
import { getUserByCookie, login, register, updateCarbsGoal, updateUserInfo, updateUserInformation, updateAllUserInformation } from "./usersCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.post("/updated-user-info", updateUserInfo)
.post("/update-information", updateUserInformation)
.post("/update-all-user-information", updateAllUserInformation)
.get("/get-user-by-cookie", getUserByCookie)
.patch("/update-user-carbs-goal", updateCarbsGoal)

export default router;