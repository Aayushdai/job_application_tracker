import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Application = sequelize.define(
    "Application",
    {
        id: {
            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false    
        },
        user_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
        },
        company_id: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        job_title: {
            type: DataTypes.STRING,
            allowNull: false
        },
        status: {
            type: DataTypes.ENUM(
                "saved",
                "applied",
                "assessment",
                "interview",
                "offer",
                "rejected",
                "withdrawn"
            ),
            allowNull: false,
            defaultValue: "saved"
        },
        job_url: {
            type: DataTypes.STRING,
            allowNull: true
        },
        location: {
            type: DataTypes.STRING,
            allowNull: true
        },
        notes: {
            type: DataTypes.TEXT,
            allowNull: true
        },
        applied_at: {
            type: DataTypes.DATE,
            allowNull: true
        },
        salary: {
            type: DataTypes.DECIMAL(10, 2),
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
        tableName: "applications",
        timestamps: false

    }
);
export default Application;