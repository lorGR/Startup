import express from "express";
import jwt from "jwt-simple";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from "./../users/usersCtrl";

export async function getUserFavorites(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't find cookie named userID on function getUserFavorites"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodeCookie on FUNCTION getUserFavorites IN FILE userFavoritesCtrl"
      );
    const sql = `SELECT food.food_id, food.food_name, food.carbs, food.protien, food.fat, food.calories, food.unit, food.weight, food.carbs_unit, food.carbs_unit_protein FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userId}'`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export function addToFavorites(req: express.Request, res: express.Response) {
  try {
    const { foodId } = req.body;
    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");
    const userId = decodeCookie(userID);

    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedcookie on FUNCTION addToFavorites IN FILE userFavoritesCtrl"
      );
    const sql = `INSERT INTO user_favorite (user_id, food_id) VALUES ('${userId}', '${foodId}')`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        if (result.affectedRows > 0) {
          const sql = `SELECT food.food_id, food.food_name, food.carbs, food.protien, food.fat, food.calories, food.unit, food.weight, food.carbs_unit, food.carbs_unit_protein FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userId}'`;
          connection.query(sql, (error, result) => {
            try {
              if (error) throw error;
              res.send({ result })
            } catch (error) {
              res.status(500).send({ error: error.message });
            }
          })
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function deleteFromFavorite(
  req: express.Request,
  res: express.Response
) {
  try {
    const { foodId } = req.body;
    const { userID } = req.cookies;

    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedcookie on FUNCTION deleteFromFavorite IN FILE userFavoritesCtrl"
      );
    const sql = `DELETE FROM user_favorite WHERE user_id = '${userId}'AND food_id = ${foodId}`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        if (result.affectedRows > 0) {
          const sql = `SELECT food.food_id, food.food_name, food.carbs, food.protien, food.fat, food.calories, food.unit, food.weight, food.carbs_unit, food.carbs_unit_protein FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userId}'`;
          connection.query(sql, (error, result) => {
            try {
              if (error) throw error
              res.send({ result })
            } catch (error) {
              res.status(500).send({ error: error.message })
            }
          })
        }
      } catch (error) {
        console.log(error);
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

export async function getUserFavirotesFoodBySearch(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't find cookie named userID on function getUserFavirotesFoodBySearch IN FILE userFavoritesCtrl"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodeCookie on FUNCTION getUserFavirotesFoodBySearch IN FILE userFavoritesCtrl"
      );

    const { userSearch } = req.body;
    if (!userSearch) throw new Error("Couldn't receive userSearch from req.body ON FUNCTION getUserFavirotesFoodBySearch IN FILE userFavoritesCtrl");
    const sql = `SELECT food.food_id, food.food_name, food.carbs, food.protien, food.fat, food.calories, food.unit, food.weight, food.carbs_unit, food.carbs_unit_protein FROM user_favorite JOIN users ON users.user_id = user_favorite.user_id JOIN food ON food.food_id = user_favorite.food_id WHERE users.user_id = '${userId}' AND food.food_name LIKE '%${userSearch}%' `;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

        res.send({ result });
      } catch (error) {
        console.error(error);
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: error });
  }
}

