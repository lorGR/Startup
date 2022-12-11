import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function addServingToMeal(req: express.Request, res: express.Response) {
    try {
        const { mealId, foodArray } = req.body;
        if (!mealId || !foodArray) throw new Error("Couldn't receive mealId/foodArray from req.body ON addServingToMeal IN servingsCtrl");

        await foodArray.forEach(async (food) => {
            const sql = `INSERT INTO servings(food_id, meal_id, amount) VALUES ('${food.food_id}', '${mealId}', '0')`;

            await connection.query(sql, (err, result) => {
                try {
                    if(err) throw err;
                } catch (error) {
                    console.log(error);
                    res.status(500).send({ error: error.message });
                }
            })
        })
        
        res.send({status: true, msg: "Meal sucssecfully added"});

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}