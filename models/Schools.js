import { DataTypes, Sequelize } from "sequelize";
import connection from '../config/database.js';

const schools = connection.define("schools", {
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    name: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    address: {
        type: DataTypes.STRING,
        allowNull: true,
    },
    latitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    },
    longitude: {
        type: DataTypes.FLOAT,
        allowNull: true,
    }
}, {
    timestamps: false, // Disable createdAt & updatedAt fields
    tableName: "schools", // Explicitly specify table name
});

export default schools;