import express from "express";
import { connection } from "../../DB/databaseSQL";
import { decodeCookie } from "../users/usersCtrl";


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

export async function getUserFood(req:express.Request, res:express.Response) {
  try {
    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in updateUserInfo ON FUNCTION updateCarbsGoal IN FILE usersCtrl");

    const userId = decodeCookie(userID);
    if (!userId) throw new Error("Couldn't find userId from decodedUserId ON FUNCTION updateCarbsGoal IN FILE usersCtrl");

    const sql = `SELECT * FROM user_food WHERE user_id = '${userId}'`;
    connection.query(sql, (error, result) => {
      try {
        if (error) throw error;
        res.send({result})
      } catch (error) {
        res.status(500).send({error: error.message})
      }
    })

  } catch (error) {
    res.status(500).send({error:error.message})
  }
}
export async function getfoodInfo(req:express.Request, res:express.Response) {
  try {
    const {foodId} = req.body;
    const { userID } = req.cookies;
    if (!userID)
      throw new Error("Couldn't find cookie named userID in updateUserInfo ON FUNCTION updateCarbsGoal IN FILE usersCtrl");

    const userId = decodeCookie(userID);
    if (!userId) throw new Error("Couldn't find userId from decodedUserId ON FUNCTION updateCarbsGoal IN FILE usersCtrl");

    const sql = `SELECT * FROM user_food WHERE user_id = '${userId}' AND food_id = '${foodId}';`
    connection.query(sql, (error,result) => {
      try {
        if (error) throw error;
        if( result.length === 0) {
          const sql = `SELECT * FROM food WHERE food_id = '${foodId}'`;
          connection.query(sql, (error, result) => {
            try {
              if (error) throw error;
              res.send({result})
            } catch (error) {
              res.status(500).send({error:error.message})
            }
          })
        } else {
          res.send({result})
        }
        
      } catch (error) {
        res.status(500).send({error:error.message})
      }
    })
  } catch (error) {
    res.status(500).send({error: error.message})
  }
}