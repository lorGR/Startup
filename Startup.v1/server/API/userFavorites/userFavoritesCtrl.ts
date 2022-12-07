import express from "express";
import jwt from "jwt-simple";
import { connection } from "../../DB/databaseSQL";

export async function getUserFavorites(
  req: express.Request,
  res: express.Response
) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

    const decodeUserId = jwt.decode(userID, secret);
    if (userID && decodeUserId) {
      const { userID } = decodeUserId;
      if (!userID) throw new Error("Couldn't find userId from decodedUserId");
      const sql = `SELECT food.food_name, food.carbs_unit, food.unit FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userID}'`

    connection.query(sql, (error, result) => {
        try {
          if (error) throw error;
          res.send({result})
        } catch (error) {
          res.status(500).send({ error: error.message });
        }
      });
    }
    else {
        res.send({failed: "no userID found"})
    }
    
  } catch (error) {
    res.status(500).send({ error: error });
  }
}
