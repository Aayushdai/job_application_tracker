import {
    createFollowUp,
    getAllFollowUps,
    getFollowUpById,
    updateFollowUp,
    deleteFollowUp
} from "../services/followUp.service.js";


export const create = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;

        const followUp = await createFollowUp(
            req.user.id,
            applicationId,
            req.body
        );

        res.status(201).json({
            success: true,
            message: "Follow-up created successfully",
            data: followUp
        });
    } catch (error) {
        next(error);
    }
};


export const getAll = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;

        const followUps = await getAllFollowUps(
            req.user.id,
            applicationId
        );

        res.status(200).json({
            success: true,
            message: "Follow-ups retrieved successfully",
            data: followUps
        });
    } catch (error) {
        next(error);
    }
};


export const getById = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const followUpId = req.params.id;

        const followUp = await getFollowUpById(
            req.user.id,
            applicationId,
            followUpId
        );

        res.status(200).json({
            success: true,
            message: "Follow-up retrieved successfully",
            data: followUp
        });
    } catch (error) {
        next(error);
    }
};


export const update = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const followUpId = req.params.id;

        const followUp = await updateFollowUp(
            req.user.id,
            applicationId,
            followUpId,
            req.body
        );

        res.status(200).json({
            success: true,
            message: "Follow-up updated successfully",
            data: followUp
        });
    } catch (error) {
        next(error);
    }
};


export const remove = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const followUpId = req.params.id;

        await deleteFollowUp(
            req.user.id,
            applicationId,
            followUpId
        );

        res.status(200).json({
            success: true,
            message: "Follow-up deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};