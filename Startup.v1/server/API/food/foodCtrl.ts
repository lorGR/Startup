import express from "express";
import { connection } from "../../DB/databaseSQL";


export function getAllFood(req:express.Request, res:express.Response) {
  try {
    const sql = 'SELECT * from food'

    connection.query(sql, async(error, result) => {
      try {
        if (error) throw error;
        res.send({ result });
      } catch (error) {
        console.log(error);
        res.status(500).send({ ok: false, error: error });
      }
    })
  } catch (error) {
    res.status(500).send({error:error})
  }
}