import express from "express";
import { connection } from "../../DB/databaseSQL";
import { getCurrentDate } from "../helpers/helpers";
import { decodeCookie } from "./../users/usersCtrl";

export async function addMeal(req: express.Request, res: express.Response) {
  try {
    const { mealInformation } = req.body;
    const { blood_sugar, insulin, date, time, carbs } = mealInformation;
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
    const userSql = `SELECT * FROM users where user_id = '${userId}'`;

    connection.query(userSql, (error, result) => {
      try {
        if (error) throw error;
        const userCarbsUnit = result[0].carbs_unit;
        const sql = `INSERT INTO meals (blood_sugar, carbs, insulin, date, time, user_id, carbs_unit_type) VALUES ('${blood_sugar}', '${carbs}', '${insulin}', '${date}', '${time}', '${userId}', '${userCarbsUnit}')`;

        connection.query(sql, (error, result) => {
          try {
            if (error) throw error;
            if (result.affectedRows > 0) {
              const mealId = result.insertId;
              const sql = `SELECT * FROM meals WHERE meal_id = '${mealId}'`;

              connection.query(sql, (error, result) => {
                if (error) throw error;
                res.send({ result });
              });
            }
          } catch (error) {
            res.status(500).send({ error: error.message });
          }
        });
      } catch (error) {
        res.status(500).send({ error: error });
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

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't decode userId from decodeCookie ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const date = getCurrentDate();
    if (!date)
      throw new Error(
        "Coulnd't receive date from getCurrentDate ON FUNCTION getTodayMeals IN FILE mealsCtrl"
      );

    const sql = `SELECT * FROM meals WHERE user_id = '${userId}' AND date = '${date}'`;

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

    const foodArray = [];

    const sql = `SELECT * FROM servings LEFT JOIN food ON servings.food_id = food.food_id WHERE servings.meal_id = '${mealId}' AND servings.food_id`;

    connection.query(sql, (err, result) => {
      try {
        if (err) throw err;
        foodArray.push(...result);
        const sql = `SELECT * FROM servings LEFT JOIN user_food ON servings.user_food_id = user_food.user_food_id WHERE servings.meal_id = '${mealId}' AND servings.user_food_id`;

        connection.query(sql, (error, result) => {
          try {
            if (error) throw error;
            const allServingsArray = foodArray.concat(result);

            if (allServingsArray.length > 0) {
              res.send({ allServingsArray });
            } else {
              res.send({ message: "no servings found" });
            }
          } catch (error) {
            res.status(500).send({ error: error.message });
          }
        });
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
    const foodArray = [];
    if (!servingId || !amount)
      throw new Error(
        "Could'nt receive servingId or amount from client on FUCTION updateMealServing IN mealCtrl"
      );

    const sql = `SELECT * FROM servings WHERE serving_id = '${servingId}'`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        const servingUnit = result[0].amount_gram
          ? "amount_gram"
          : "amount_portion";

        const sql = `UPDATE servings SET ${servingUnit} = '${amount}' WHERE (serving_id = '${servingId}')`;
        connection.query(sql, (error, result) => {
          try {
            if (error) throw error;

            if (result.affectedRows > 0) {
              const sql = `SELECT * FROM meals JOIN servings ON servings.meal_id = meals.meal_id JOIN food ON servings.food_id = food.food_id WHERE meals.meal_id = '${mealId}'`;
              connection.query(sql, (error, result) => {
                try {
                  if (error) throw error;
                  foodArray.push(...result);
                  const sql = `SELECT * FROM meals JOIN servings ON servings.meal_id = meals.meal_id JOIN user_food ON servings.user_food_id = user_food.user_food_id WHERE meals.meal_id = '${mealId}'`;

                  connection.query(sql, (error, result) => {
                    try {
                      if (error) throw error;
                      const allServingsArray = foodArray.concat(result);

                      const carbsUnitType =
                        allServingsArray[0].carbs_unit_type === "gram"
                          ? "amount_gram"
                          : "amount_portion";
                      if (allServingsArray[0].carbs_unit_type === "gram") {
                        allServingsArray.forEach((result) => {
                          totalCarbsArray.push(
                            (result.amount_gram * result.carbs) / 100
                          );
                        });
                      } else if (
                        allServingsArray[0].carbs_unit_type === "portion"
                      ) {
                        allServingsArray.forEach((result) => {
                          totalCarbsArray.push(
                            result[carbsUnitType] * result.carbs_unit
                          );
                        });
                      }

                      const totalCarbsNew = totalCarbsArray.reduce(
                        (accumulator, currentValue) =>
                          accumulator + currentValue
                      );
                      const sql = `UPDATE meals SET carbs = '${totalCarbsNew}' WHERE (meal_id = '${mealId}')`;

                      connection.query(sql, (error, result) => {
                        if (error) throw error;
                        res.send({ result });
                      });
                    } catch (error) {
                      res.status(500).send({ error: error });
                    }
                  });
                } catch (error) {
                  res.status(500).send({ error: error.message });
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
    });
  } catch (error) {
    res.status(500).send({ error: error });
  }
}

export async function getMealsByDate(
  req: express.Request,
  res: express.Response
) {
  try {
    const { date } = req.body;
    if (!date)
      throw new Error(
        "Couldn't receive date from req.body ON FUNCTION getMealsByDate IN FILE mealsCtrl"
      );

    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't find cookie named userID in updateUserInfo ON FUNCTION getMealsByDate IN FILE mealsCtrl"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedUserId ON FUNCTION getMealsByDate IN FILE mealsCtrl"
      );

    const sql = `SELECT * FROM meals WHERE user_id = '${userId}' AND date = '${date}' `;

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

export async function getLastMeal(req: express.Request, res: express.Response) {
  try {
    const { userID } = req.cookies;
    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "no userId can be decoded on FUNCTION getLastMeal IN FILE mealsCtrl"
      );
    const date = getCurrentDate();
    const sql = `SELECT * from meals WHERE user_id = "${userId}" AND date = '${date}' ORDER BY meal_id DESC LIMIT 1`;

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

export async function deleteLastMeal(
  req: express.Request,
  res: express.Response
) {
  try {
    const { mealId } = req.body;
    const { userID } = req.cookies;
    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "no userId can be decoded on FUNCTION getLastMeal IN FILE mealsCtrl"
      );
    const date = getCurrentDate();

    const sql = `DELETE FROM meals WHERE (meal_id = '${mealId}')`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

        const sql = `SELECT * from meals WHERE user_id = "${userId}" AND date = '${date}' ORDER BY meal_id DESC LIMIT 1`;
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
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function closeOpenMeal(
  req: express.Request,
  res: express.Response
) {
  try {
    const { mealId } = req.body;
    if (!mealId)
      throw new Error(
        "Couldn't receive mealId on FUNCTION closeOpenMeal IN FILE mealsCtrl"
      );

    const sql = `UPDATE meals SET opened_to_edit = '0' WHERE (meal_id = '${mealId}')`;
    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        const sql = `SELECT * from meals WHERE meal_id = '${mealId}'`;
        connection.query(sql, (error, result) => {
          try {
            res.send({ result });
          } catch (error) {
            res.status(500).send({ error: error.message });
          }
        });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
