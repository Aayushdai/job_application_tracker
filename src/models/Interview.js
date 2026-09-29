import { DataTypes } from "sequelize";
import sequelize from "../config/database.js";

const Interview = sequelize.define(
    "Interview",
    {
        id:{

            type: DataTypes.INTEGER,
            primaryKey: true,
            autoIncrement: true,
            allowNull: false
        },

        application_id: {
            type: DataTypes.INTEGER,
            allowNull: false,
    },
    type: {
        type: DataTypes.STRING,
        allowNull: false
    },
    scheduled_at: {
        type: DataTypes.DATE,
        allowNull: false
    },
    location: {
        type: DataTypes.STRING,
        allowNull: true
    },
    meeting_url: {
        type: DataTypes.STRING,
        allowNull: true
    },
    notes: {
        type: DataTypes.TEXT,
        allowNull: true
    },
    status: {
        type: DataTypes.STRING,

        allowNull: false,
        defaultValue: "scheduled"
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
    tableName: "interviews",
    timestamps: false
}

);

export default Interview;
