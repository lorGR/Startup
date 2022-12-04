import express from "express";
import { getUserByCookie, login, register } from "./usersCtrl";

const router = express.Router();

router
.post("/register", register)
.post("/login", login)
.get("/get-user-by-cookie", getUserByCookie)

export default router;