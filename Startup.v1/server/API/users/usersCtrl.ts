import express from "express";
import { connection } from "../../DB/databaseSQL";
import { UserJoi } from "./usersModel";
import bycrpt from "bcrypt";
import jwt from "jwt-simple";

export function register(req: express.Request, res: express.Response) {
    try {
        const { email, firstName, lastName, identityNumber, password, confirmPassword } = req.body;
        if (!email || !firstName || !lastName || !identityNumber || !password || !confirmPassword) throw new Error("Couldn't receive email/firstName/lastName/identityNumber/password/confirmPassword from req.body FROM register CNTL");

        const { error } = UserJoi.validate({ firstName, lastName, identityNumber, email, password, confirmPassword });
        if (error) throw error;

        const saltRounds = 10;
        const salt = bycrpt.genSaltSync(saltRounds);
        const hashPassword = bycrpt.hashSync(password, salt);

        const sql = `INSERT INTO users(first_name, last_name, identity_number, email, password) VALUES ('${firstName}', '${lastName}', '${identityNumber}', '${email}', '${hashPassword}')`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;

                const cookie = { userId: result.insertId };
                const secret = process.env.JWT_SECRET;

                if(!secret) throw new Error("Couldn't load secret from .env");

                const JWTCookie = jwt.encode(cookie, secret);

                res.cookie("userID", JWTCookie);
                res.send({ register: true, id: result.insertId });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}