import FollowUp from "../models/FollowUp.js";
import Application from "../models/Application.js";

export const createFollowUp = async (
    userId,
    applicationId,
    data
) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    return await FollowUp.create({
        application_id: applicationId,
        title: data.title,
        notes: data.notes,
        due_at: new Date(data.dueAt),
        status: data.status || "pending",
        completed_at: null,
        created_at: new Date(),
        updated_at: new Date()
    });

};


export const getAllFollowUps = async (
    userId,
    applicationId
) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const followUps = await FollowUp.findAll({
        where: {
            application_id: applicationId
        },
        order: [["due_at", "ASC"]]
    });

    return followUps;
};


export const getFollowUpById = async (
    userId,
    applicationId,
    followUpId
) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId,
            application_id: applicationId
        }
    });

    if (!followUp) {
        throw new Error("Follow-up not found");
    }

    return followUp;
};


export const updateFollowUp = async (
    userId,
    applicationId,
    followUpId,
    data
) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId,
            application_id: applicationId
        }
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

    updates.updated_at = new Date();

    await followUp.update(updates);

    return followUp;
};


export const deleteFollowUp = async (
    userId,
    applicationId,
    followUpId
) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const followUp = await FollowUp.findOne({
        where: {
            id: followUpId,
            application_id: applicationId
        }
    });

    if (!followUp) {
        throw new Error("Follow-up not found");
    }

    await followUp.destroy();
};