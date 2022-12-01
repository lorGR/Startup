import mysql from "mysql";

const password = process.env.SQL_PASSWORD;

export const connection = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: password,
    database: "sugarbit"
});

connection.connect((error) => {
    try {
        if(error) throw error;
        console.info(`Connected to MySQL`);
    } catch (error) {
        console.error(error);
    }
});