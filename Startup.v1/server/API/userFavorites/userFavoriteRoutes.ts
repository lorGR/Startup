import express from "express";

import { getUserFavorites } from "./userFavoritesCtrl";

const router = express.Router();

router
    .get("/get-user-favorites", getUserFavorites)

export default router;