import cron from "node-cron";

import FollowUp from "../models/FollowUp.js";
import Application from "../models/Application.js";
import Notification from "../models/Notification.js";

import "../models/index.js";

export const startFollowUpJob = () => {
    cron.schedule("* * * * *", async () => {
        try {
            console.log("Running follow-up job...");

            const now = new Date();

            const dueFollowUps = await FollowUp.findAll({
                where: {
                    status: "pending"
                },
                include: [
                    {
                        model: Application,
                        as: "application"
                    }
                ]
            });

            console.log("Pending follow-ups:", dueFollowUps.length);

            for (const followUp of dueFollowUps) {
                console.log("Checking follow-up:", {
                    id: followUp.id,
                    title: followUp.title,
                    due_at: followUp.due_at,
                    status: followUp.status,
                    application: followUp.application
                        ? followUp.application.id
                        : null
                });

                if (new Date(followUp.due_at) > now) {
                    console.log(
                        `Follow-up ${followUp.id} is not due yet.`
                    );
                    continue;
                }

                const application = followUp.application;

                if (!application) {
                    console.log(
                        `Application not found for follow-up ${followUp.id}`
                    );
                    continue;
                }

                const userId = application.user_id;

                const message = `Follow-up: ${followUp.title} for ${application.job_title} is due.`;

                console.log("Notification message:", message);

                const existingNotification = await Notification.findOne({
                    where: {
                        user_id: userId,
                        type: "follow_up_due",
                        message
                    }
                });

                if (existingNotification) {
                    console.log(
                        `Notification already exists for follow-up ${followUp.id}`
                    );
                    continue;
                }

                const notification = await Notification.create({
                    user_id: userId,
                    title: "Follow-up due",
                    message,
                    type: "follow_up_due",
                    is_read: false,
                    created_at: new Date(),
                    updated_at: new Date()
                });

                console.log(
                    "Notification created:",
                    notification.id
                );
            }
        } catch (error) {
            console.error("Follow-up job error:", error);
        }
    });

    console.log("Follow-up job started");
};