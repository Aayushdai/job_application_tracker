import Interview from "../models/Interview.js";
import Application from "../models/Application.js";
import { createInterviewSchema } from "../validators/interview.validator.js";
export const createInterview = async (userId, applicationId, data) => {
    
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if(!application){
        
                throw new Error("Application not found");

    }
    const validateData = createInterviewSchema.parse(data);

    const interview = await Interview.create({
        application_id: applicationId,
        type: validateData.type,
        scheduled_at: new Date(validateData.scheduledAt),
        location: validateData.location,
        meeting_url: validateData.meetingUrl,
        notes: validateData.notes,
        status: validateData.status || "scheduled",
        created_at: new Date(),
        updated_at: new Date()
    });
    return interview;
};

export const getAllInterviews = async (userId, applicationId) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });
    if (!application) {
        throw new Error("Application not found");
    }
    const interviews = await Interview.findAll({
        where: {
            application_id: applicationId
        }
    });
    return interviews;
};

export const getInterviewById = async (userId, applicationId, interviewId) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });
    if (!application) {
        throw new Error("Application not found");
    }
    const interview = await Interview.findOne({
        where: {
            id: interviewId,
            application_id: applicationId
        }
    });
    if (!interview) {
        throw new Error("Interview not found");
    }
    return interview;
};

export const updateInterview = async (
    userId,
    applicationId,
    interviewId,
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

    const interview = await Interview.findOne({
        where: {
            id: interviewId,
            application_id: applicationId
        }
    });

    if (!interview) {
        throw new Error("Interview not found");
    }

    const updates = {};

    if (data.type !== undefined) {
        updates.type = data.type;
    }

    if (data.scheduledAt !== undefined) {
        updates.scheduled_at = new Date(data.scheduledAt);
    }

    if (data.location !== undefined) {
        updates.location = data.location;
    }

    if (data.meetingUrl !== undefined) {
        updates.meeting_url = data.meetingUrl;
    }

    if (data.notes !== undefined) {
        updates.notes = data.notes;
    }

    if (data.status !== undefined) {
        updates.status = data.status;
    }

    updates.updated_at = new Date();

    await interview.update(updates);

    return interview;
};

export const deleteInterview = async ( userId, applicationId, interviewId)=>{
    const application= await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });
    if (!application){
        throw new Error("Application not found");
    }
    const interview = await Interview.findOne({
        where: {
            id: interviewId,
            application_id: applicationId
        }
    });
    if(!interview){
        throw new Error("Interview not found");
        }
        await interview.destroy();
};