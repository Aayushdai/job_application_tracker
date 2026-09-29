import app from "./app.js";
import env from "./config/env.js";
import sequelize from "./config/database.js";
import {User } from "./models/index.js";
import { startNotificationJob } from "./jobs/notification.job.js";
import {startFollowUpJob} from "./jobs/followUp.job.js";
const startServer = async () => {
    try{
        await sequelize.authenticate();//verify
        console.log("Database connection has been established successfully.");

        
        app.listen(env.port, () => {
    
    console.log(`Server is running on port ${env.port}`);
    startFollowUpJob();
    startNotificationJob();
});
    } catch (error) {
        console.error("Unable to connect to the database:", error);
    }
};

startServer();
