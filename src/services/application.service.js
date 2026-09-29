import Application from "../models/Application.js";
import Company from "../models/Company.js";

export const createApplication = async (userId, data) => {
    const company = await Company.findByPk(data.companyId);

    if (!company) {
        throw new Error("Company not found");
    }

    const application = await Application.create({
        user_id: userId,
        company_id: data.companyId,
        job_title: data.jobTitle,
        status: data.status || "saved",
        job_url: data.jobUrl,
        location: data.location,
        notes: data.notes,
        applied_at: data.appliedAt
            ? new Date(data.appliedAt)
            : null,
        salary: data.salary,
        created_at: new Date(),
        updated_at: new Date()
    });

    return application;
};

export const getUserApplications = async (userId) =>{
    return await Application.findAll({
        where:{
            user_id: userId
        },
        include: [
            {
                model: Company,
                as: "company",
                attributes: [
                    "id",
                    "name",
                    "website",
                    "industry",
                    "location"
                ]
            }
        ],
        order: [["created_at", "DESC"]]
    });
};

export const getApplicationById = async (userId, applicationId) => {
    const application = await Application.findOne({
        where: {
        id: applicationId,
        user_id: userId
    },
include: [
    {
    model: Company,
    as: "company",
    attributes: [
        "id",
        "name",
        "website",
        "industry",
        "location"
    ]
}]
});
if (!application) {
    throw new Error("Application not found");
}
return application;
};

export const updateApplication = async (applicationId, userId, data) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });

    if (!application) {
        throw new Error("Application not found");
    }

    const updates = {};

    if (data.jobTitle !== undefined) {
        updates.job_title = data.jobTitle;
    }

    if (data.jobUrl !== undefined) {
        updates.job_url = data.jobUrl;
    }

    if (data.companyId !== undefined) {
        updates.company_id = data.companyId;
    }

    if (data.status !== undefined) {
        updates.status = data.status;
    }

    if (data.location !== undefined) {
        updates.location = data.location;
    }

    if (data.notes !== undefined) {
        updates.notes = data.notes;
    }

    if (data.appliedAt !== undefined) {
        updates.applied_at = new Date(data.appliedAt);
    }

    if (data.salary !== undefined) {
        updates.salary = data.salary;
    }

    updates.updated_at = new Date();

    await application.update(updates);

    return application;
    
};

export const deleteApplication = async (applicationId, userId) => {
    const application = await Application.findOne({
        where: {
            id: applicationId,
            user_id: userId
        }
    });
    if(!application){
        throw new Error("Application not found");
    }
    await application.destroy();
}