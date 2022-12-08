import express from "express";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from './../users/usersCtrl';

export async function addMeal(req: express.Request, res: express.Response) {
    try {
        const {  blood_sugar, insulin, date, time, carbs } = req.body;
        if ( !date || !time || !blood_sugar || !insulin || !carbs) throw new Error("Couldn't receive date/time/insulin/blood_sugar/carbs from req.body mealsCtrl");

        const {userID} = req.cookies;
        if(!userID) throw new Error("Couldn't extract userID from req.cookies ON FUNCTION addMeal IN FILE mealsCtrl");

        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't decode userId from decodeCookie ON FUNCTION addMeal IN FILE mealsCtrl")

        const sql = `INSERT INTO meals (blood_sugar, insulin, date, time, user_id) VALUES ('${blood_sugar}', '${insulin}', '${date}', '${time}', '${userId}')`;

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