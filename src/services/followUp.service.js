import FollowUp from "../models/FollowUp.js";
import Application from "../models/Application.js";

export const createFollowUp = async (userId, data) => {
    const application = await Application.findOne({
        where: {
            id: data.applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const followUp = await FollowUp.create({
        application_id: data.applicationId,
        title: data.title,
        notes: data.notes,
        due_at: new Date(data.dueAt),
        status: data.status || "pending",
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
    });

    return followUp;
};


export const getAllFollowUps = async (userId) => {
    return await FollowUp.findAll({
        include: [
            {
                model: Application,
                as: "application",
                where: {
                    user_id: userId
                }
            }
        ],
        order: [["due_at", "ASC"]]
    });
};


export const getFollowUpById = async (userId, followUpId) => {
    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId
        },
        include: [
            {
                model: Application,
                as: "application",
                where: {
                    user_id: userId
                }
            }
        ]
    });

    if (!followUp) {
        throw new Error("Follow-up not found");
    }

    return followUp;
};


export const updateFollowUp = async (
    userId,
    followUpId,
    data
) => {
    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId
        },
        include: [
            {
                model: Application,
                as: "application",
                where: {
                    user_id: userId
                }
            }
        ]
    });

    if (!followUp) {
        throw new Error("Follow-up not found");
    }

    const updates = {};

    if (data.title !== undefined) {
        updates.title = data.title;
    }

    if (data.notes !== undefined) {
        updates.notes = data.notes;
    }

    if (data.dueAt !== undefined) {
        updates.due_at = new Date(data.dueAt);
    }

    if (data.status !== undefined) {
        updates.status = data.status;

        if (data.status === "completed") {
            updates.completed_at = new Date();
        }

        if (data.status === "pending") {
            updates.completed_at = null;
        }
    }

    if (data.applicationId !== undefined) {
        const application = await Application.findOne({
            where: {
                id: data.applicationId,
                user_id: userId
            }
        });

        if (!application) {
            throw new Error("Application not found");
        }

        updates.application_id = data.applicationId;
    }

    updates.updated_at = new Date();

    await followUp.update(updates);

    return followUp;
};


export const deleteFollowUp = async (
    userId,
    followUpId
) => {
    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId
        },
        include: [
            {
                model: Application,
                as: "application",
                where: {
                    user_id: userId
                }
            }
        ]
    });

    if (!followUp) {
        throw new Error("Follow-up not found");
    }

    await followUp.destroy();
};