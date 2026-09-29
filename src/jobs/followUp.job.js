import cron from "node-cron";

import FollowUp from "../models/followUp.model.js"; 
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";

export const startFollowUpJob = () => {
    cron.schedule("* * * * *", async () => {
        try {
            const now = new Date();

            const dueFollowUps = await FollowUp.findAll({
                where: {
                    status: "pending",
                },
                include: [
                    {
                        model: Application,
                        as: "application"
                    }
                ]
            });
            for (const followUp of dueFollowUps) {
                if( new Date(followUp.due_at)> now){
                    continue;
                }

                const userId = followUp.application.user_id;
                const existingNotification = await Notification.findOne({
                    where: {
                        user_id: userId,
                        type: "follow_up_due",
                        message: `Follow-up: ${followUp.title} for application ${followUp.application.company_name} is due.`,
                    },
                });
                if(existingNotification){
                    continue;
                }
                await Notification.create({
                    user_id: userId,
                    title: "follow_up_due",
                    message: `Follow-up: ${followUp.title} for application ${followUp.application.company_name} is due.`,
                    type: "follow_up_due",
                    is_read: false,
                    created_at: new Date(),
                    updated_at: new Date()
                });

                console.log(`Notification created for user ${userId} for follow-up ${followUp.title}`);
            }
        } catch (error) {
            console.error("Error in follow-up job:", error);
        }
    });
    console.log("Follow-up job started");
};