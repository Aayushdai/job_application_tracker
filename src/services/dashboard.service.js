import { Op } from "sequelize";

import sequelize from "../config/database.js";
import Application from "../models/Application.js";
import Interview from "../models/Interview.js";
import FollowUp from "../models/FollowUp.js";
import Company from "../models/Company.js";

export const getDashboardData = async (userId) => {
    const now = new Date();

    const [
        totalApplications,
        applicationsByStatus,
        totalInterviews,
        upcomingInterviews,
        pendingFollowUps,
        totalOffers,
        totalRejections,
        recentApplications
    ] = await Promise.all([
        // Total applications
        Application.count({
            where: {
                user_id: userId
            }
        }),

        // Applications grouped by status
        Application.findAll({
            where: {
                user_id: userId
            },
            attributes: [
                "status",
                [
                    Application.sequelize.fn(
                        "COUNT",
                        Application.sequelize.col("id")
                    ),
                    "count"
                ]
            ],
            group: ["status"],
            raw: true
        }),

        // Total interviews
        Interview.count({
            include: [
                {
                    model: Application,
                    as: "application",
                    where: {
                        user_id: userId
                    }
                }
            ]
        }),

        // Upcoming interviews
        Interview.findAll({
            where: {
                scheduled_at: {
                    [Op.gte]: now
                },
                status: "scheduled"
            },
            include: [
                {
                    model: Application,
                    as: "application",
                    where: {
                        user_id: userId
                    },
                    include: [
                        {
                            model: Company,
                            as: "company",
                            attributes: ["id", "name"]
                        }
                    ]
                }
            ],
            order: [["scheduled_at", "ASC"]],
            limit: 5
        }),

        // Pending follow-ups
        FollowUp.findAll({
            where: {
                status: "pending"
            },
            include: [
                {
                    model: Application,
                    as: "application",
                    where: {
                        user_id: userId
                    },
                    include: [
                        {
                            model: Company,
                            as: "company",
                            attributes: ["id", "name"]
                        }
                    ]
                }
            ],
            order: [["due_at", "ASC"]],
            limit: 5
        }),

        // Offers
        Application.count({
            where: {
                user_id: userId,
                status: "offer"
            }
        }),

        // Rejections
        Application.count({
            where: {
                user_id: userId,
                status: "rejected"
            }
        }),

        // Recent applications
        Application.findAll({
            where: {
                user_id: userId
            },
            include: [
                {
                    model: Company,
                    as: "company",
                    attributes: ["id", "name"]
                }
            ],
            order: [["created_at", "DESC"]],
            limit: 5
        })
    ]);

    return {
        summary: {
            totalApplications,
            totalInterviews,
            totalOffers,
            totalRejections
        },

        applicationsByStatus,

        upcomingInterviews,

        pendingFollowUps,

        recentApplications
    };
};