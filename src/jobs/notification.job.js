import cron from "node-cron";
import { Op } from "sequelize";

import Notification from "../models/Notification.js";

export const startNotificationJob = () => {
    cron.schedule("0 * * * *", async () => {
        try {
            console.log("Running notification cleanup job...");

            const thirtyDaysAgo = new Date();
            thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);

            const deletedCount = await Notification.destroy({
                where: {
                    is_read: true,
                    created_at: {
                        [Op.lt]: thirtyDaysAgo
                    }
                }
            });

            console.log(
                `Notification cleanup completed. Deleted: ${deletedCount}`
            );
        } catch (error) {
            console.error("Notification job error:", error);
        }
    });

    console.log("Notification cleanup job started");
};