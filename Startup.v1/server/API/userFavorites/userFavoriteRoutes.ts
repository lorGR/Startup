import express from "express";

import { getUserFavorites, addToFavorites, deleteFromFavorite } from "./userFavoritesCtrl";

const router = express.Router();

router
    .get("/get-user-favorites", getUserFavorites)
    .post("/add-to-favorites", addToFavorites)
    .post("/delete-from-favorites", deleteFromFavorite)

export default router;