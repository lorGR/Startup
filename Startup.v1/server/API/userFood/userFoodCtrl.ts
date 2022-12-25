import express from "express";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from "../users/usersCtrl";

export function addFoodByUser(req: express.Request, res: express.Response) {
  try {
    const { formData, calories } = req.body;
    if (!formData || !calories)
      throw new Error(
        "Could'nt recieve formData or calories from client on FUNCTION addFoodByUser IN FILE userFoodCtrl"
      );
      const parsedFormData = JSON.parse(formData);
    const { userID } = req.cookies;

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedcookie on FUNCTION addFoodByUser IN FILE userFoodCtrl"
      );

      const sql = `INSERT INTO user_food (user_id, food_name, carbs, protein, fat, calories) VALUES ('${userId}', '${parsedFormData.foodName}', '${parsedFormData.carbs}', '${parsedFormData.protein}', '${parsedFormData.fat}', '${calories}');`

      connection.query(sql, (error, result) => {
        try {
            if (error) throw error;
            res.send({result})
        } catch (error) {
            res.status(500).send({error: error.message})
        }
      })
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
