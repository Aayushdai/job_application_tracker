import { createCompany,
    getAllCompanies,
    getCompanyById,
    updateCompany,
    deleteCompany
 } from "../services/company.service.js";
import { companySchema } from "../validators/company.validator.js";

export const create = async (req, res, next) => {
   try{ const validatedData = companySchema.parse(req.body);

    const company = await createCompany(validatedData);

    res.status(201).json({
        success: true,
        message: "Company created successfully",
        data: company
    });
}catch(error){
    next(error);
}
};

export const getAll = async (req, res, next)=>{
    try{
        const companies = await getAllCompanies();
        res.status(200).json({
            success: true,
            message: "Companies fetched successfully",
            data: companies
        });
    }catch(error){
        next(error);
    }
        
    };

export const getById = async (req, res, next) => {
    try{
        const company = await getCompanyById(req.params.id);
        res.status(200).json({
            success: true,
            message: "Company fetched successfully",
            data: company
        });
    }catch(error){
        next(error);
    }
};
export const update = async (req,res, next)=> {
    try{
        const company = await updateCompany(
            req.params.id,
            req.body
        );
        res.status(200).json({
            success: true,
            message: "Company updated successfully",
            data: company
        });
    }catch(error){
        next(error);
    }

};

export const remove = async (req,res,next) => {
    try{
        await deleteCompany(req.params.id);
        res.status(200).json({
            success: true,
            message: "Company deleted successfully"
        });
    }catch(error){
        next(error);
    }
};