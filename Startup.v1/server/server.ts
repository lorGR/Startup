import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 4000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());

import UserRoutes from "./API/users/usersRoutes";
app.use("/api/users", UserRoutes);

import foodRoutes from "./API/food/foodRoutes";
app.use("/api/food", foodRoutes);

import MealsRoutes from "./API/meals/mealsRoutes";
app.use("/api/meals", MealsRoutes);

import userFavoriteRoutes from "./API/userFavorites/userFavoriteRoutes";
app.use("/api/user-favorites", userFavoriteRoutes);

import servingsRoutes from "./API/servings/servingsRoutes";
app.use("/api/servings", servingsRoutes);

app.listen(port, () => {
  console.info(`Server is up and running at http://localhost:${port}`);
});
