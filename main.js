import express from "express";
import connection from "./config/database.js"; // Import database connection
import dotenv from 'dotenv';
import apiRouter from './routes/apiRouter.js';
import bodyParser from "body-parser";

dotenv.config();
const app = express();

app.use(bodyParser.json())
app.use('/api',apiRouter);

const syncDB = async () => {
    try {
        await connection.sync({ force: false }); // Sync models with DB
        console.log("Database synced successfully!");
    } catch (error) {
        console.error("Error syncing database:", error);
    }
};

syncDB();

app.listen(process.env.PORT, () => {
    return console.log(`Server running on port ${process.env.PORT}`);
});
