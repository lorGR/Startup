import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function addServingToMeal(req: express.Request, res: express.Response) {
    try {
        const { mealId, foodArray } = req.body;
        if (!mealId || !foodArray) throw new Error("Couldn't receive mealId/foodArray from req.body ON addServingToMeal IN servingsCtrl");

        const sql = `SELECT * FROM meals WHERE meal_id = ${mealId}`; 
        
        connection.query(sql, async (error, result) => {
            try {
                if (error) throw error;
                const mealCarbsUnit = result[0].carbs_unit_type;
                let amountType;
                let amount;
                if(mealCarbsUnit === "gram") {
                    amountType = "amount_gram";
                    amount = 100;
                } else {
                    amountType = "amount_portion";
                    amount = 1;
                }
                await foodArray.forEach(async (food) => {
                    const sql = `INSERT INTO servings(food_id, meal_id, ${amountType}) VALUES ('${food.food_id}', '${mealId}', '${amount}')`;
        
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
                res.status(500).send({error: error.message})
            }
        })

       

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function deleteServing(req:express.Request, res:express.Response) {
    try {
        const {servingId} = req.body;
        if(!servingId) throw new Error("Couldn't recieve servingId from client on FUNCTION seleteServing IN FILE servingCtrl");

        const sql = `DELETE FROM servings WHERE serving_id = '${servingId}'`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error
                if (result.affectedRows > 0) {
                    res.send({result});
                }
            } catch (error) {
                res.status(500).send({error: error.message})
            }
        })
    } catch (error) {
        res.status(500).send({error: error.message})
    }
}