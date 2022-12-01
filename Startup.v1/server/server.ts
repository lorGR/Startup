import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = 4000 || process.env.PORT;

app.use(express.json());
app.use(cookieParser());

app.listen(port, () => {
    console.info(`Server is up and running at http://localhost:${port}`);
});