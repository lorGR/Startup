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
    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in application");
    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodeCookie on FUNCTION getUserByCookie IN FILE userCtrl"
      );

    const sql = `SELECT * FROM users WHERE user_id = '${userId}'`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
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

        const cookie = { userId: result[0].user_id };
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

    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in updateUserInfo");

    const userId = decodeCookie(userID);
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

export function updateCarbsGoal(req: express.Request, res: express.Response) {
  try {
    const { userCarbsGoal } = req.body;
    if (!userCarbsGoal)
      throw new Error(
        "Couldn't receive userCarbsGoal from req.body ON FUNCTION updateCarbsGoal IN FILE usersCtrl"
      );

    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't find cookie named userID in updateUserInfo ON FUNCTION updateCarbsGoal IN FILE usersCtrl"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedUserId ON FUNCTION updateCarbsGoal IN FILE usersCtrl"
      );

    //UPDATE `sugarbit`.`users` SET `carbs_goal` = '200' WHERE (`user_id` = '3');
    const sql = ` UPDATE users SET carbs_goal = '${userCarbsGoal}' WHERE user_id = '${userId}'`;

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

export function decodeCookie(userID: string): number {
  try {
    const secret = process.env.JWT_SECRET;
    if (!secret)
      throw new Error(
        "Couldn't load secret from .env on FUNCTION decodeCookie IN FILE userCtrl"
      );

    const decodeUserId = jwt.decode(userID, secret);
    const { userId } = decodeUserId;
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedUserId on FUNCTION decodeCookie IN FILE userCtrl"
      );
    return userId;
  } catch (error) {
    console.log(error);
  }
}

export function updateUserInformation(
  req: express.Request,
  res: express.Response
) {
  try {
    const { firstName, lastName, identityNumber } = req.body;
    console.log(firstName)
    console.log(lastName)
    console.log(identityNumber)
    if (!firstName || !lastName || !identityNumber)
      throw new Error(
        "Couldn't receive firstName/lastName/identityNumber from req.body FROM register CNTL"
      );

    const { userID } = req.cookies;
    if (!userID)
      throw new Error(
        "Couldn't find cookie named userID in updateUserInfo ON FUNCTION updateCarbsGoal IN FILE usersCtrl"
      );

    const userId = decodeCookie(userID);
    if (!userId)
      throw new Error(
        "Couldn't find userId from decodedUserId ON FUNCTION updateCarbsGoal IN FILE usersCtrl"
      );

    const sql = `UPDATE users SET first_name = '${firstName}', last_name = '${lastName}', identity_number = '${identityNumber}' WHERE (user_id = '${userId}')`;

    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;

        res.send({ result });
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });
  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}

