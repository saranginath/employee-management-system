import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";

import {
    createDocumentService,
    deleteDocumentService,
    getDocumentByIdService,
    getDocumentsService,
    updateDocumentService,
} from "../services/document.service";

import {
    createDocumentSchema,
    updateDocumentSchema,
} from "../validators/document.validator";

export const createDocumentController = asyncHandler(async (req: Request, res: Response) => {
    const data = createDocumentSchema.parse(req.body);

    const document = await createDocumentService({
        ...data,
        uploadedBy: req.user!.id,
    });

    res.status(201).json({
        success: true,
        data: document,
    });
});

export const getDocumentsController = asyncHandler(async (req: Request, res: Response) => {
    const documents = await getDocumentsService(
        req.query.employeeId as string | undefined
    );

    res.status(200).json({
        success: true,
        data: documents,
    });
});

export const getDocumentByIdController = asyncHandler(async (req: Request, res: Response) => {
    const document = await getDocumentByIdService(req.params.id as string);

    res.status(200).json({
        success: true,
        data: document,
    });
});

export const updateDocumentController = asyncHandler(async (req: Request, res: Response) => {
    const data = updateDocumentSchema.parse(req.body);

    const document = await updateDocumentService(
        req.params.id as string,
        data
    );

    res.status(200).json({
        success: true,
        data: document,
    });
});

export const deleteDocumentController = asyncHandler(async (req: Request, res: Response) => {
    await deleteDocumentService(req.params.id as string);

    res.status(200).json({
        success: true,
        message: "Document deleted successfully",
    });
});