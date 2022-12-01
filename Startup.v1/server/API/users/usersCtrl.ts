import express from "express";
import { connection } from "../../DB/databaseSQL";

export function register(req: express.Request, res: express.Response) {
    try {
        const { email, firstName, lastName, identityNumber, password } = req.body;
        if (!email || !firstName || !lastName || !identityNumber || !password) throw new Error("Couldn't receive email/firstName/lastName/identityNumber/password from req.body FROM register CNTL");

        const sql = `INSERT INTO users(first_name, last_name, identity_number, email, password) VALUES ('${firstName}', '${lastName}', '${identityNumber}', '${email}', '${password}')`;

        connection.query(sql, (error, result) => {
            try {
                if (error) throw error;
                res.send({ register: true, id: result.insertId });
            } catch (error) {
                res.status(500).send({ error: error.message });
            }
        });

    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}