import { asyncHanlder } from "../middleware/asyncHandler";
import { Request, Response, NextFunction } from "express";
import { createEmployeeService, deleteEmployeeService, getEmployeeByIdService, getEmployeeService, updateEmployeeService } from "../services/employee.service";
import { updateEmployeeSchema } from "../validators/employee.validator";
import { success } from "zod";
import { Types } from "mongoose";
import { IEmployee } from "../interfaces/employee.interface";

export const createEmployeeController = asyncHanlder(async (req: Request, res: Response, next: NextFunction) => {
    const employee = await createEmployeeService(req.body);
    res.status(201).json({
        succes: true,
        message: "Employee created successfully",
        data: employee
    })

});

export const getEmployeeController = asyncHanlder(async (req: Request, res: Response) => {
    const employee = await getEmployeeService();
    res.json({
        success: true,
        data: employee
    })
})

export const getEmployeeByIdController = asyncHanlder(async (req: Request, res: Response) => {
    const employee = await getEmployeeByIdService(req.params.id as string);
    res.json({
        success: true,
        data: employee
    })
})

export const updateEmployeeController = asyncHanlder(async (req: Request, res: Response) => {

    const data = updateEmployeeSchema.parse(req.body);
    const employeeData: Partial<IEmployee> = {
        ...data,
        department: data.department ? new Types.ObjectId(data.department) : undefined
    }
    const employee = await updateEmployeeService(req.params.id as string, employeeData);
    res.json({
        success: true,
        message: "Employee updated successfully",
        data: employee
    })
})
export const deleteEmployeeController = asyncHanlder(async (req: Request, res: Response) => {
    await deleteEmployeeService(req.params.id as string);
    res.json({
        success: true,
        message: "Employee deleted successfully"
    })
})