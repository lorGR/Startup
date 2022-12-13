import express from "express";
import { connection } from "../../DB/databaseSQL";
import { getCurrentDate } from "../helpers/helpers";
import { decodeCookie } from "./../users/usersCtrl";

export async function addMeal(req: express.Request, res: express.Response) {
  try {
    const { blood_sugar, insulin, date, time, carbs } = req.body;
    if (!date || !time || !blood_sugar || !insulin || !carbs)
      throw new Error(
        "Couldn't receive date/time/insulin/blood_sugar/carbs from req.body mealsCtrl"
      );

    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't extract userID from req.cookies ON FUNCTION addMeal IN FILE mealsCtrl"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't decode userId from decodeCookie ON FUNCTION addMeal IN FILE mealsCtrl"
      );

    const sql = `INSERT INTO meals (blood_sugar, carbs, insulin, date, time, user_id) VALUES ('${blood_sugar}', '${carbs}', '${insulin}', '${date}', '${time}', '${userId}')`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getTodayMeals(
  req: express.Request,
  res: express.Response
) {
  try {
    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't extract userID from req.cookies ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const user_id = decodeCookie(userID);
    if (!user_id)
      throw new Error(
        "Couldn't decode userId from decodeCookie ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const date = getCurrentDate();
    if (!date)
      throw new Error(
        "Coulnd't receive date from getCurrentDate ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const sql = `SELECT * FROM meals WHERE user_id = '${user_id}' AND date = '${date}'`;

    connection.query(sql, (err, result) => {
      try {
        if (err) throw err;
        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function getMealsServings(
  req: express.Request,
  res: express.Response
) {
  try {
    const { mealId } = req.body;
    if (!mealId)
      throw new Error(
        "Couldn't receive mealId from req.body ON FUNCTION getMealsServings IN FILE mealsCtrl"
      );

    const sql = `SELECT * FROM servings JOIN food ON servings.food_id = food.food_id WHERE servings.meal_id = '${mealId}'`;

    connection.query(sql, (err, result) => {
      try {
        if (err) throw err;
        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    console.error(error);
    res.status(500).send({ error: error.message });
  }
}

export async function updateMealServing(
  req: express.Request,
  res: express.Response
) {
  try {
    const { servingId, amount, mealId } = req.body;
    const totalCarbsArray = [];
    if (!servingId || !amount)
      throw new Error(
        "Could'nt receive servingId or amount from client on FUCTION updateMealServing IN mealCtrl"
      );
    const sql = `UPDATE servings SET amount = '${amount}' WHERE (serving_id = '${servingId}')`;
    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

        if (result.affectedRows > 0) {
          const sql2 = `SELECT * FROM meals JOIN servings ON servings.meal_id = meals.meal_id JOIN food ON servings.food_id = food.food_id WHERE meals.meal_id = '${mealId}'`;
          connection.query(sql2, (error, results) => {
            try {
              if (error) throw error;
              results.forEach((result) => {
                totalCarbsArray.push(result.amount * result.carbs_unit);
              });
              const totalCarbsNew = totalCarbsArray.reduce(
                (accumulator, currentValue) => accumulator + currentValue
              );
              const sql3 = `UPDATE meals SET carbs = '${totalCarbsNew}' WHERE (meal_id = '${mealId}')`;

              connection.query(sql3, (error, result) => {
                if (error) throw error;
                res.send({ result });
              });
            } catch (error) {
              res.status(500).send({ error: error });
            }
          });
        }
      } catch (error) {
        res.status(500).send({ error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function deleteMealById(
  req: express.Request,
  res: express.Response
) {
  try {
    const { mealId } = req.body;
    if (!mealId)
      throw new Error(
        "could'nt find mealId from clien on FUNCTION deleteMealById IN FILE mealsCtrl"
      );
    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't extract userID from req.cookies ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const user_id = decodeCookie(userID);
    if (!user_id)
      throw new Error(
        "Couldn't decode userId from decodeCookie ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const date = getCurrentDate();
    if (!date)
      throw new Error(
        "Coulnd't receive date from getCurrentDate ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const sql = `DELETE FROM servings WHERE meal_id = '${mealId}'`;

    connection.query(sql, (error, result) => {
      if (error) throw error;
      if (result.affectedRows > 0) {
        const sql = `DELETE FROM meals WHERE (meal_id = '${mealId}')`;
        connection.query(sql, (error, result) => {
          if (error) throw error;
          if (result.affectedRows > 0) {
            const sql = `SELECT * FROM meals WHERE user_id = '${user_id}' AND date = '${date}'`;

            connection.query(sql, (err, result) => {
              try {
                if (err) throw err;
                res.send({ result });
              } catch (error) {
                res.status(500).send({ error: error.message });
              }
            });
          }
        });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function getMealsByDate(req: express.Request, res: express.Response) {
  try {
    const { date } = req.body;
    if (!date) throw new Error("Couldn't receive date from req.body ON FUNCTION getMealsByDate IN FILE mealsCtrl");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in updateUserInfo ON FUNCTION getMealsByDate IN FILE mealsCtrl");

    const userId = decodeCookie(userID);
    if (!userId) throw new Error("Couldn't find userId from decodedUserId ON FUNCTION getMealsByDate IN FILE mealsCtrl");

    const sql = `SELECT * FROM meals WHERE user_id = '${userId}' AND date = '${date}' `

    connection.query(sql, (err, result) => {
      try {
        if (err) throw err;
        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}