import express from "express";
import { connection } from "../../DB/databaseSQL";
import { getCurrentDate } from "../helpers/helpers";
import { decodeCookie } from './../users/usersCtrl';

export async function addMeal(req: express.Request, res: express.Response) {
    try {
        const { blood_sugar, insulin, date, time, carbs } = req.body;
        if (!date || !time || !blood_sugar || !insulin || !carbs) throw new Error("Couldn't receive date/time/insulin/blood_sugar/carbs from req.body mealsCtrl");

        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't extract userID from req.cookies ON FUNCTION addMeal IN FILE mealsCtrl");

        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't decode userId from decodeCookie ON FUNCTION addMeal IN FILE mealsCtrl")

        const sql = `INSERT INTO meals (blood_sugar, carbs, insulin, date, time, user_id) VALUES ('${blood_sugar}', '${carbs}', '${insulin}', '${date}', '${time}', '${userId}')`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getTodayMeals(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't extract userID from req.cookies ON FUNCTION getTodayMeals IN FILE mealsCtrl");

        const user_id = decodeCookie(userID);
        if (!user_id) throw new Error("Couldn't decode userId from decodeCookie ON FUNCTION getTodayMeals IN FILE mealsCtrl");

        const date = getCurrentDate();
        if (!date) throw new Error("Coulnd't receive date from getCurrentDate ON FUNCTION getTodayMeals IN FILE mealsCtrl");

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

export async function getMealsServings(req: express.Request, res: express.Response) {
    try {
        const { mealId } = req.body;
        if (!mealId) throw new Error("Couldn't receive mealId from req.body ON FUNCTION getMealsServings IN FILE mealsCtrl");

        const sql = `SELECT * FROM servings JOIN food ON servings.food_id = food.food_id WHERE servings.meal_id = '${mealId}'`;

        connection.query(sql, (err, result) => {
            try {
                if(err) throw err;
                res.send({result});
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });
    } catch (error) {
        console.error(error)
        res.status(500).send({ error: error.message });
    }
}

export async function updateMealServing(req:express.Request, res:express.Response) {
    try {
        const {servingId, amount} = req.body;
        if ( !servingId || !amount) throw new Error("Could'nt receive servingId or amount from client on FUCTION updateMealServing IN mealCtrl")
        const sql = `UPDATE servings SET amount = '${amount}' WHERE (serving_id = '${servingId}')`;
        connection.query(sql, (error, result) => {
            if (error) throw error;
            console.log(result)
            if (result.affectedRows > 0) {
                const sql = `SELECT * FROM servings JOIN food ON food.food_id = servings.food_id WHERE serving_id = '${servingId}'`;
                connection.query(sql, (error, result) => {
                    if (error) throw error;
                    res.send({result})
                })
            }
        })
    } catch (error) {
     res.status(500).send({error: error})   
    }
}