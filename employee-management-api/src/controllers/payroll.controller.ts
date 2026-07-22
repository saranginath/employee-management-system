import { Request, Response } from "express";
import { asyncHandler } from "../middleware/asyncHandler";
import {
    createPayrollService,
    deletePayrollService,
    getPayrollByIdService,
    getPayrollService,
    updatePayrollService,
} from "../services/payroll.service";
import {
    createPayrollSchema,
    updatePayrollSchema,
} from "../validators/payroll.validator";

interface PayrollParams {
    id: string;
}

export const createPayrollController = asyncHandler(
    async (req: Request, res: Response) => {
        const data = createPayrollSchema.parse(req.body);

        const payroll = await createPayrollService(data);

        res.status(201).json({
            success: true,
            data: payroll,
        });
    }
);

export const getPayrollController = asyncHandler(
    async (_req: Request, res: Response) => {
        const payroll = await getPayrollService();

        res.status(200).json({
            success: true,
            data: payroll,
        });
    }
);

export const getPayrollByIdController = asyncHandler(
    async (req: Request, res: Response) => {
        const payroll = await getPayrollByIdService(req.params.id as string);

        res.status(200).json({
            success: true,
            data: payroll,
        });
    }
);

export const updatePayrollController = asyncHandler(
    async (req: Request, res: Response) => {
        const data = updatePayrollSchema.parse(req.body);

        const payroll = await updatePayrollService(req.params.id as string, data);

        res.status(200).json({
            success: true,
            data: payroll,
        });
    }
);

export const deletePayrollController = asyncHandler(
    async (req: Request, res: Response) => {
        await deletePayrollService(req.params.id as string);

        res.status(200).json({
            success: true,
            message: "Payroll deleted successfully",
        });
    }
);