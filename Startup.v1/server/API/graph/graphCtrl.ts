import express from "express";
import { decodeCookie } from "../users/usersCtrl";

export async function getDailyCarbs(req: express.Request, res: express.Response) {
    try {
        const { userID } = req.cookies;
        if (!userID) throw new Error("Couldn't find cookie named userID in application");
        const userId = decodeCookie(userID);
        if (!userId) throw new Error("Couldn't find userId from decodeCookie on FUNCTION getDailyCarbs IN FILE graphCtrl");

        const { day } = req.body;
        if(!day) throw new Error("Couldn't receive day from req.body on FUNCTION getDailyCarbs IN FILE graphCtrl");

        res.send({day});
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}