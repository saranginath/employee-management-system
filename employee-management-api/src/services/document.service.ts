import * as documentRepository from "../repositories/document.repository";
import { AppError } from "../utils/AppError";

export const createDocumentService = (data: any) =>
    documentRepository.createDocumentRepo(data);

export const getDocumentsService = (
    employeeId?: string
) =>
    documentRepository.getDocumentsRepo(employeeId);

export const getDocumentByIdService = async (
    id: string
) => {
    const document =
        await documentRepository.getDocumentByIdRepo(id);

    if (!document) {
        throw new AppError("Document not found", 404);
    }

    return document;
};

export const updateDocumentService = async (
    id: string,
    data: any
) => {
    const document =
        await documentRepository.updateDocumentRepo(id, data);

    if (!document) {
        throw new AppError("Document not found", 404);
    }

    return document;
};

export const deleteDocumentService = async (
    id: string
) => {
    const document =
        await documentRepository.deleteDocumentRepo(id);

    if (!document) {
        throw new AppError("Document not found", 404);
    }
};