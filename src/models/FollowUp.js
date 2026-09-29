import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const FollowUp = sequelize.define(
    "FolowUp",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },
        application_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        due_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        completed_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        created_at: {
            type: DataTypes.DATE,
            allowNull: false
        },
        updated_at: {
            type: DataTypes.DATE,
            allowNull: false
        }
    },
    {
        tableName: "follow_ups",
        timestamps: false
    }
);
export default FollowUp;