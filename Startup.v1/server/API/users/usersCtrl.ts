import express from "express";
import { connection } from "../../DB/databaseSQL";
import { UserJoi } from "./usersModel";
import bycrpt from "bcrypt";
import jwt from "jwt-simple";

export function register(req: express.Request, res: express.Response) {
  try {
    const {
      email,
      firstName,
      lastName,
      identityNumber,
      password,
      confirmPassword,
      language,
    } = req.body;
    if (
      !email ||
      !firstName ||
      !lastName ||
      !identityNumber ||
      !password ||
      !confirmPassword ||
      !language
    )
      throw new Error(
        "Couldn't receive email/firstName/lastName/identityNumber/password/confirmPassword from req.body FROM register CNTL"
      );

    const { error } = UserJoi.validate({
      firstName,
      lastName,
      identityNumber,
      email,
      password,
      confirmPassword,
    });
    if (error) throw error;

    const saltRounds = 10;
    const salt = bycrpt.genSaltSync(saltRounds);
    const hashPassword = bycrpt.hashSync(password, salt);

    const sql = `INSERT INTO users(first_name, last_name, identity_number, email, password, language) VALUES ('${firstName}', '${lastName}', '${identityNumber}', '${email}', '${hashPassword}', '${language}')`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

        const cookie = { userId: result.insertId };
        const secret = process.env.JWT_SECRET;

        if (!secret) throw new Error("Couldn't load secret from .env");

        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userID", JWTCookie);
        res.send({ register: true });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export function getUserByCookie(req: express.Request, res: express.Response) {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

        const decodeUserId = jwt.decode(userID, secret);
        if(userID && decodeUserId) {
            const { userID } = decodeUserId;
            if (!userID) throw new Error("Couldn't find userId from decodedUserId");
    
            const sql = `SELECT * FROM users WHERE user_id = '${userID}'`;
    
            connection.query(sql, (error, result) => {
                try {
                    if (error) throw error;
                    res.send({ result });
                } catch (error) {
                    res.status(500).send({ error: error.message });
                }
            });
        } else {
            res.status(500).send({error: "No userID from cookies"});
        }
    } catch (error) {
        res.status(500).send({ error: error.message });
    }
}

export async function login(req: express.Request, res: express.Response) {
  try {
    const { email, password } = req.body;
    if (!email || !password)
      throw new Error(
        "Couldn't receive email/firstName/lastName/identityNumber/password/confirmPassword from req.body FROM register CNTL"
      );

    const sql = `SELECT * from users WHERE email='${email}'`;

    connection.query(sql, async (error, result) => {
      try {
        if (error) throw error;
        const isMatch = await bycrpt.compare(password, result[0].password);
        if (!isMatch) throw new Error("Email or password incorrect");

        const cookie = { userID: result[0].user_id };
        const secret = process.env.JWT_SECRET;
        if (!secret) throw new Error("Couldn't load secret from .env");

        const JWTCookie = jwt.encode(cookie, secret);

        res.cookie("userID", JWTCookie);
        res.send({ loggedIn: true });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

export async function updateUserInfo(
  req: express.Request,
  res: express.Response
) {
  try {
    const { formData } = req.body;
   const parsedFormData = JSON.parse(formData);
    const secret = process.env.JWT_SECRET;
    if (!secret) throw new Error("Couldn't load secret from .env");

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");

    const decodeUserId = jwt.decode(userID, secret);
    const { userId } = decodeUserId;
    if (!userId) throw new Error("Couldn't find userId from decodedUserId");

    const sql = `UPDATE users SET birth_date = '${parsedFormData.birth_date}', height = '${parsedFormData.height}', weight = '${parsedFormData.weight}', diabetes_type = '${parsedFormData.diabetes_type}', hmo = '${parsedFormData.hmo}', balance_min = '${parsedFormData.balance_min}', balance_max = '${parsedFormData.balance_max}', carbs_unit = '${parsedFormData.units}', protein_calc = '${parsedFormData.protein}' WHERE (user_id = '${userId}')`;

    connection.query(sql, async (error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}
