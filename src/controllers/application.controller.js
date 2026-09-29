import {createApplication,deleteApplication,updateApplication ,getApplicationById, getUserApplications} from "../services/application.service.js"
import { createApplicationSchema } from "../validators/application.validator.js"


export const create = async (req, res, next)=>{
    try{const validateData = createApplicationSchema.parse(req.body);

    const application = await createApplication(
        req.user.id, validateData
    );
    res.status(201).json({
        success: true,
        message: "Application created successfully",
        data: application
    });
}catch(error){
    next(error);
}
};

export const getAll = async (req,res,next)=>{
    try{
        const applications = await getUserApplications(req.user.id);
        res.status(200).json({
            success: true,
            message: "Applications retrieved successfully",
            data: applications
        });
    }catch(error){
        next(error);
    }

};

export const getById = async (req,res,next)=>{
    try{
        const applicationId = req.params.id;
        const application = await getApplicationById(req.user.id, applicationId);
        res.status(200).json({
            success: true,
            message: "Application retrieved successfully",
            data: application
        });
    }catch(error){
        next(error);
    }
};

export const update = async (req,res,next)=>{
    try{
        const applicationId = req.params.id;
        const application = await updateApplication(applicationId, req.user.id, req.body);
        res.status(200).json({
            success: true,
            message: "Application updated successfully",
            data: application
        });
    }catch(error){
        next(error);
    }
};

export const remove = async (req, res, next)=>{
    try{
        const applicationId = req.params.id;
        await deleteApplication(applicationId, req.user.id);
        res.status(200).json({

            success: true,
            message: "Application deleted successfully"
        });

    }catch(error){
        next(error);
    }
};