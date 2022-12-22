import express from "express";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from "../users/usersCtrl";

export async function getMaximumCarbsInWeek(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getMaximumCarbsInWeek IN FILE graphCtrl");

        const { weekDays } = req.body;
        if (!weekDays) throw new Error("Couldn't receive weekDays from req.body IN FUNCTION getMaximumCarbsInWeek IN FILE graphCtrl");

        const weekCarbs = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0
        }

        let finished = false;

        for (const key in weekDays) {
            const sql = `SELECT SUM(carbs) AS carbs FROM meals
            WHERE user_id ='${userId}' AND date = '${weekDays[key]}'`;
            connection.query(sql, (err, result) => {
                try {
                    if (err) throw err;
                    const { carbs } = result[0];
                    weekCarbs[key] = carbs;
                    if (weekCarbs['saturday'] !== 0) {
                        finished = true;
                    }
                    if (finished) {
                        let carbsValues = Object.values(weekCarbs);
                        let maxCarbs = Math.max(...carbsValues);
                        res.send({ maxCarbs, weekCarbs });
                    }
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getMaximumInsulinInWeek(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getMaximumInsulinInWeek IN FILE graphCtrl");

        const { weekDays } = req.body;
        if (!weekDays) throw new Error("Couldn't receive weekDays from req.body IN FUNCTION getMaximumInsulinInWeek IN FILE graphCtrl");

        const weekInsulin = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0
        };

        let finished = false;

        for (const key in weekDays) {
            const sql = `SELECT SUM(insulin) AS insulin FROM meals
            WHERE user_id = '${userId}' AND date = '${weekDays[key]}'`;
            connection.query(sql, (err, result) => {
                try {
                    if (err) throw err;
                    const { insulin } = result[0];
                    weekInsulin[key] = insulin;
                    if (weekInsulin['saturday'] !== 0) {
                        finished = true;
                    }
                    if (finished) {
                        let insulinValues = Object.values(weekInsulin);
                        let maxInsulin = Math.max(...insulinValues);
                        res.send({ maxInsulin, weekInsulin });
                    }
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            })
        }
        // res.send({weekDays});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function getMaximumAverageBloodSugarInWeek(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getMaximumAverageBloodSugarInWeek IN FILE graphCtrl");

        const { weekDays } = req.body;
        if (!weekDays) throw new Error("Couldn't receive weekDays from req.body IN FUNCTION getMaximumAverageBloodSugarInWeek IN FILE graphCtrl");

        const weekBloodSugar = {
            sunday: 0,
            monday: 0,
            tuesday: 0,
            wednesday: 0,
            thursday: 0,
            friday: 0,
            saturday: 0
        }

        let finished = false;

        for (const key in weekDays) {
            const sql = `SELECT AVG(blood_sugar) AS blood_sugar FROM meals
            WHERE user_id = '${userId}' AND date = '${weekDays[key]}';`;
            connection.query(sql, (err, result) => {
                try {
                    if (err) throw err;
                    const { blood_sugar } = result[0];
                    weekBloodSugar[key] = blood_sugar;
                    if (weekBloodSugar['saturday'] !== 0) {
                        finished = true;
                    }
                    if (finished) {
                        let bloodSugarValues = Object.values(weekBloodSugar);
                        let maxBloodSugar = Math.max(...bloodSugarValues);
                        res.send({ maxBloodSugar, weekBloodSugar });
                    }
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}