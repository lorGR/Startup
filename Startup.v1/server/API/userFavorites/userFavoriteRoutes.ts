import express from "express";

import { getUserFavorites, addToFavorites } from "./userFavoritesCtrl";

const router = express.Router();

router
    .get("/get-user-favorites", getUserFavorites)
    .post("/add-to-favorites", addToFavorites)

export default router;