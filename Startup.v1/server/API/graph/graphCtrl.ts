import express from "express";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from "../users/usersCtrl";

export async function getDailyCarbs(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getDailyCarbs IN FILE graphCtrl");

        const { day } = req.body;
        if (!day) throw new Error("Couldn't receive day from req.body on FUNCTION getDailyCarbs IN FILE graphCtrl");

        const sql = `SELECT SUM(carbs) as carbs FROM meals WHERE date = '${day}'`;

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

export async function getDailyInsulin(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getDailyInsulin IN FILE graphCtrl");

        const { day } = req.body;
        if (!day) throw new Error("Couldn't receive day from req.body on FUNCTION getDailyInsulin IN FILE graphCtrl");

        const sql = `SELECT SUM(insulin) as insulin FROM meals WHERE date= '${day}'`;

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

export async function getDailyAverageBloodSugar(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getDailyAverageBloodSugar IN FILE graphCtrl");

        const { day } = req.body;
        if (!day) throw new Error("Couldn't receive day from req.body on FUNCTION getDailyAverageBloodSugar IN FILE graphCtrl");

        const sql = `SELECT AVG(blood_sugar) as bloodSugar FROM meals WHERE date = '${day}'`;

        connection.query(sql, (err, result) => {
            try {
                if (err) throw err;
                res.send({ result });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        })
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}