import express from "express";
import { getUserByCookie, login, register, updateUserInfo } from "./usersCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.post("/updated-user-info", updateUserInfo)
.get("/get-user-by-cookie", getUserByCookie)

export default router;