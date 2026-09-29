import { createInterviewSchema} from "../validators/interview.validator.js";
import { createInterview,deleteInterview,  getAllInterviews, getInterviewById, updateInterview  } from "../services/Interview.service.js";

export const create = async (req, res, next) => {
    try {
        console.log("BODY:", req.body);
        console.log("CONTENT TYPE:", req.headers["content-type"]);

        const applicationId = req.params.applicationId;

        const validatedData = createInterviewSchema.parse(req.body);

        const interview = await createInterview(
            req.user.id,
            applicationId,
            validatedData
        );

        res.status(201).json({
            success: true,
            message: "Interview created successfully",
            data: interview
        });
    } catch (error) {
        next(error);
    }
};
export const getAll = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const interviews = await getAllInterviews(req.user.id, applicationId);
        res.status(200).json({
            success: true,
            message: "Interviews retrieved successfully",
            data: interviews
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const interviewId = req.params.id;
        const interview = await getInterviewById(req.user.id, applicationId, interviewId);
        res.status(200).json({
            success: true,
            message: "Interview retrieved successfully",
            data: interview
        });
    } catch (error) {
        next(error);
    }
};

export const update = async (req, res, next) => {
    try {
        const applicationId = req.params.applicationId;
        const interviewId = req.params.id;
        const updatedInterview = await updateInterview(req.user.id, applicationId, interviewId, req.body);
        res.status(200).json({
            success: true,
            message: "Interview updated successfully",
            data: updatedInterview
        });
    } catch (error) {
        next(error);
    }
};

export const remove = async (req, res,next)=>{
    try{
        const applicationId = req.params.applicationId
        const deleteapplication = await deleteInterview(req.user.id,applicationId, interviewId);
        res.status(200).json({
            success: true,
            message: "Interview deleted successfully",
            data: deleteapplication
        });
    } catch (error) {
        next(error);
    }
};