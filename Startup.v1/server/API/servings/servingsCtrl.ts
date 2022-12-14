import express from "express";
import { array } from "joi";
import { ModuleResolutionKind } from "typescript";
import { resourceLimits } from "worker_threads";
import { connection } from "../../DB/databaseSQL";

export async function addServingToMeal(
  req: express.Request,
  res: express.Response
) {
  try {
    const { mealId, foodArray, carbs } = req.body;
    if (!mealId || !foodArray)
      throw new Error(
        "Couldn't receive mealId/foodArray from req.body ON addServingToMeal IN servingsCtrl"
      );

    const sql = `SELECT * FROM meals WHERE meal_id = ${mealId}`;

    connection.query(sql, async (error, result) => {
      try {
        if (error) throw error;
        const mealCarbsUnit = result[0].carbs_unit_type;
        let amountType;
        let amount;
        if (mealCarbsUnit === "gram") {
          amountType = "amount_gram";
          amount = 100;
        } else {
          amountType = "amount_portion";
          amount = 1;
        }
        await foodArray.forEach(async (food) => {
          let sql;
          if (food.user_food_id) {
            sql = `INSERT INTO servings(user_food_id, meal_id, ${amountType}) VALUES ('${food.user_food_id}', '${mealId}', '${amount}')`;
          } else {
            sql = `INSERT INTO servings(food_id, meal_id, ${amountType}) VALUES ('${food.food_id}', '${mealId}', '${amount}')`;
          }

          await connection.query(sql, (err, result) => {
            try {
              if (err) throw err;
              const sql = `UPDATE meals SET carbs = '${carbs}' WHERE (meal_id = '${mealId}')`;
              connection.query(sql, (error, result) => {
                try {
                  if (error) throw error;
                } catch (error) {
                  res.status(500).send({ error: error.message });
                }
              });
            } catch (error) {
              console.log(error);
              res.status(500).send({ error: error.message });
            }
          });
        });
        res.send({ result });
        // res.send({status: true, msg: "Meal sucssecfully added"});
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function deleteServing(
  req: express.Request,
  res: express.Response
) {
  try {
    const { servingId, mealId } = req.body;
    let totalCarbs = 0;

    if (!servingId || !mealId)
      throw new Error(
        "Couldn't recieve servingId or mealId from client on FUNCTION seleteServing IN FILE servingCtrl"
      );

    const sql = `DELETE FROM servings WHERE serving_id = '${servingId}'`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

// //TODO: fix portion and gram


        const sql = `SELECT sum(carbs * amount_gram /100) AS total_carbs FROM servings JOIN food ON food.food_id = servings.food_id WHERE servings.meal_id = '${mealId}'; SELECT sum(carbs * amount_gram /100) AS total_carbs FROM servings JOIN user_food ON user_food.user_food_id = servings.user_food_id WHERE servings.meal_id = '${mealId}'`;

        connection.query(sql, [1,2], async (error, results) => {
            try {
                if(error) throw error;
                await results.forEach(array => {
                    totalCarbs += array[0].total_carbs
                });
                const sql = `UPDATE meals SET carbs = '${totalCarbs}' WHERE (meal_id = '${mealId}')`;
                connection.query(sql, (error, result) => {
                    try {
                        if (error) throw error;
                        res.send({result})
                    } catch (error) {
                        res.status(500).send({error: error.message})
                    }
                })

            } catch (error) {
                res.status(500).send({error: error.message})
            }
        })

                
        //     } catch (error) {
        //         res.status(500).send({error: error.message})
        //     }
        // })
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
