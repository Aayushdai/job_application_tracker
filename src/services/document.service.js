import { Document, Application } from "../models/index.js";
import fs from "fs";
export const createDocument = async (userId, applicationId, data) => {
    if (applicationId) {
        const application = await Application.findOne({
            where: {
                id: applicationId,
                user_id: userId
            }
        });

        if (!application) {
            throw new Error("Application not found");
        }
    }

    const document = await Document.create({
        user_id: userId,
        application_id: applicationId || null,
        name: data.name,
        file_name: data.file_name,
        file_path: data.file_path,
        file_type: data.file_type,
        created_at: new Date(),
        updated_at: new Date()
    });

    return document;
};

export const getUserDocuments = async (userId) => {
    return await Document.findAll({
        where: {
            user_id: userId
        },
        order: [["created_at", "DESC"]]
    });
};

export const getDocumentById = async (userId, documentId)=>{
    const document = await Document.findOne({
        where: {
            id: documentId,
            user_id: userId
        }
    });
    if(!document){
        throw new Error("Document not found");
    }
    return document;
}

export const getDocumentFile = async (userId, documentId) => {
    const document = await Document.findOne({
        where: {
            id: documentId,
            user_id: userId
        }
    });
    if(!document){
        throw new Error("Document not found");
    }
    return document;
};
export const deleteDocument = async (userId, documentId)=>{
    const document = await Document.findOne({
        where: {
            id: documentId,
            user_id: userId
        }
    });
    if(!document){
        throw new Error("Document not found");
    }
if(fs.existsSync(document.file_path)){
    fs.unlinkSync(document.file_path);
}

    await document.destroy();
}

export const updateDocument = async (userId, documentId, data) => {
    const document = await Document.findOne({
        where: {
            id: documentId,
            user_id: userId
        }
    });
    if(!document){
        throw new Error("Document not found");
    }
    const updates={};
    if(data.name !== undefined){
        updates.name = data.name;
    }
    if(data.application_id !== undefined){
        if(data.application_id !== null){
            const application = await Application.findOne({
                where: {
                    id: data.application_id,
                    user_id: userId
                }});
            if(!application){
                throw new Error("Application not found");
            }
            updates.application_id = data.application_id;
        }
    }
    updates.updated_at = new Date();
    await document.update(updates);
    return document;
};

