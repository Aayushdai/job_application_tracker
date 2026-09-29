import Company from "../models/Company.js";

export const createCompany = async ({ name, website, industry, location }) => {
    const existingCompany = await Company.findOne({

        where: { name }
    });
    if(existingCompany) {
        throw new Error("Company already exists");
    }

    const company = await Company.create({
        name,website,industry,location,
        created_at: new Date(),
        updated_at: new Date()
    });

    return company;
};

export const getAllCompanies = async () => {
    return await Company.findAll({
        order: [["created_at", "DESC"]]
    });
};

export const getCompanyById = async (id) => {
    const company = await Company.findByPk(id);
    if(!company) {
        throw new Error("Company not found");
    }
    return company;
};

export const updateCompany = async (id, data) => {
    const company = await Company.findByPk(id);
    if(!company){
        throw new Error("Company not found");
    }
    await company.update({
        ...data,
        updated_at: new Date()
    });
    return company;
};

export const deleteCompany = async (id) => {
    const company = await Company.findByPk(id);

    if(!company){
        throw new Error("Company not found");
    }
    await company.destroy();
}