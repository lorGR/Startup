import express from "express";
import { connection } from "../../DB/databaseSQL";


export function getAllFood(req: express.Request, res: express.Response) {
  try {
    const sql = 'SELECT * from food'

    connection.query(sql, async (error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    })
  } catch (error) {
    res.status(500).send({ error: error })
  }
}

export async function getFoodBySearch(req: express.Request, res: express.Response) {
  try {
    const { userSearch } = req.body;
    if (!userSearch) throw new Error("Couldn't receive userSearch");

    const sql = `SELECT * FROM food WHERE food_name LIKE '${userSearch}%' `;

    connection.query(sql, (err, result) => {
      try {
        if(err) throw err;
        res.send({result});
      } catch (error) {
        res.status(500).send({ error: error.message });
      }
    });

  } catch (error) {
    res.status(500).send({ error: error.message });
  }
}