import { success } from "zod";
import { createDepartmentService, getDepartmentService } from "../services/department.service"
import { createDepartmentSchema } from "../validators/department.validator";
import { Request, Response } from "express";
import { asyncHanlder } from "../middleware/asyncHandler";

export const createDepartmentController = asyncHanlder(async (req: Request, res: Response) => {
    const data = createDepartmentSchema.parse(req.body);
    const department = await createDepartmentService(data);
    res.status(201).json({
        sucess: true,
        message: "Created department successfully",
        data: department
    })
})
export const getDepartmentController = asyncHanlder(async (req: Request, res: Response) => {
    const department = await getDepartmentService();
    res.status(200).json({
        success: true,
        data: department
    })
})