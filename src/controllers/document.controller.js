import {
    createDocument,updateDocument,deleteDocument, getDocumentById, getUserDocuments, getDocumentFile
} from "../services/document.service.js";
import path from "path";
import fs from "fs";
export const create = async (req, res, next) => {
    try {
        console.log("REQ.BODY:", req.body);
        console.log("REQ.FILE:", req.file);

        const applicationId = req.body.applicationId
            ? Number(req.body.applicationId)
            : null;

        console.log("APPLICATION ID:", applicationId);

        if (!req.file) {
            return res.status(400).json({
                success: false,
                message: "No file uploaded"
            });
        }

        if (!req.body.name) {
            return res.status(400).json({
                success: false,
                message: "Document name is required"
            });
        }

        const document = await createDocument(
            req.user.id,
            applicationId,
            {
                name: req.body.name,
                file_name: req.file.originalname,
                file_path: req.file.path,
                file_type: req.file.mimetype
            }
        );

        res.status(201).json({
            success: true,
            message: "Document uploaded successfully",
            data: document
        });
    } catch (error) {
        next(error);
    }
};

export const getAll = async (req, res, next) => {
    try {
        const documents = await getUserDocuments(req.user.id);
        if(!documents || documents.length === 0){
            return res.status(404).json({
                success: false,
                message: "No documents found"
            });
        }

        res.status(200).json({
            success: true,
            message: "Documents retrieved successfully",
            data: documents
        });
    } catch (error) {
        next(error);
    }
};

export const getById = async (req, res, next) => {
    try {
        const documentId = req.params.id;

        const document = await getDocumentById(
            req.user.id,
            documentId
        );

        res.status(200).json({
            success: true,
            message: "Document retrieved successfully",
            data: document
        });
    } catch (error) {
        next(error);
    }
};

export const download = async (req, res, next) => {
    try {
        const document = await getDocumentFile(
            req.user.id,
            req.params.id
        );
        const filePath = path.resolve(document.file_path);

        if(!fs.existsSync(filePath)){
            return res.status(404).json({
                success: false,
                message: "File not found"
            });
        }
        res.download(filePath, document.file_name);
    } catch (error) {
        next(error);
    }
}
export const remove = async (req, res, next) => {
    try {
        const documentId = req.params.id;
        if(!documentId) {
            return res.status(400).json({
                success: false,
                message: "Document ID is required"
            });
        }
        const document = await deleteDocument(req.user.id, documentId);
        res.status(200).json({
            success: true,
            document: document,
            message: "Document deleted successfully"
        });
    } catch (error) {
        next(error);
    }
};
export const update = async (req, res, next) => {
    try {
        const documentId = req.params.id;
        if(!documentId) {
            return res.status(400).json({
                success: false,
                message: "Document ID is required"
            });
        }
        const updatedDocument = await updateDocument(req.user.id, documentId, req.body);
        res.status(200).json({
            success: true,
            message: "Document updated successfully",
            data: updatedDocument
        });
    }catch (error) {
        next(error);
    }   };