import express from "express";
import { connection } from "../../DB/databaseSQL";

export async function addMeal(req: express.Request, res: express.Response) {
    try {
        const { userId, blood_sugar, insulin, date, time } = req.body;
        if (!userId || !date || !time || !blood_sugar || !insulin) throw new Error("Couldn't receive userId/date/time/insulin/blood_sugar from req.body mealsCtrl");

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