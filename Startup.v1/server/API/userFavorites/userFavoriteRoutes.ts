import express from "express";

import { getUserFavorites, addToFavorites, deleteFromFavorite, getUserFavirotesFoodBySearch } from "./userFavoritesCtrl";

const router = express.Router();

router
    .get("/get-user-favorites", getUserFavorites)
    .post("/add-to-favorites", addToFavorites)
    .post("/delete-from-favorites", deleteFromFavorite)
    .post("/get-user-favorites-by=search", getUserFavirotesFoodBySearch)

export default router;