import { Sequelize } from "sequelize";
import dotenv from "dotenv";

dotenv.config();

const connection = new Sequelize(process.env.DATABASE, process.env.USER, process.env.PASSWORD, {
    host: process.env.HOST,
    dialect: "mysql"
});

// Authenticate the database connection
const connectDB = async () => {
    try {
        await connection.authenticate();
        console.log("Database is now connected!");
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

connectDB(); // Call it immediately when the file loads

export default connection; // Export connection for models
