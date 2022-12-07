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
      const sql = `SELECT food.food_id, food.food_name, food.carbs, food.protien, food.fat, food.calories, food.unit, food.weight, food.carbs_unit, food.carbs_unit_protein FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userID}'`;

      connection.query(sql, (error, result) => {
        try {
          if (error) throw error;
          res.send({ result });
        } catch (error) {
          console.log(error);
          res.status(500).send({ error: error.message });
        }
      });
    } else {
      res.send({ failed: "no userID found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export function addToFavorites(req: express.Request, res: express.Response) {
  try {
    const {foodId} = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

    const decodeUserId = jwt.decode(userID, secret);
    if (userID && decodeUserId) {
      const { userID } = decodeUserId;
      if (!userID) throw new Error("Couldn't find userId from decodedUserId");
      const sql = `INSERT INTO user_favorite (user_id, food_id) VALUES ('${userID}', '${foodId}')`;

      connection.query(sql, (error, result) => {
        try {
          if (error) throw error;
          res.send({ result });
        } catch (error) {
          console.log(error);
          res.status(500).send({ error: error.message });
        }
      });
    } else {
      res.send({ failed: "no userID found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function deleteFromFavorite(req:express.Request, res:express.Response) {
  try {
    const {foodId} = req.body;
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

    const decodeUserId = jwt.decode(userID, secret);
    if (userID && decodeUserId) {
      const { userID } = decodeUserId;
      if (!userID) throw new Error("Couldn't find userId from decodedUserId");
      const sql = `DELETE FROM user_favorite WHERE user_id = '${userID}'AND food_id = ${foodId}`;

      connection.query(sql, (error, result) => {
        try {
          if (error) throw error;
          res.send({ result });
        } catch (error) {
          console.log(error);
          res.status(500).send({ error: error.message });
        }
      });
    } else {
      res.send({ failed: "no userID found" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}
