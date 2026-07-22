import { asyncHandler } from "../middleware/asyncHandler";
import { Request, Response, NextFunction } from "express";
import {
  createEmployeeService,
  deleteEmployeeService,
  getEmployeeByIdService,
  getEmployeeService,
  updateEmployeeService,
} from "../services/employee.service";
import { updateEmployeeSchema } from "../validators/employee.validator";
import { Types } from "mongoose";
import { IEmployee } from "../interfaces/employee.interface";

export const createEmployeeController = asyncHandler(
  async (req: Request, res: Response, next: NextFunction) => {
    const employee = await createEmployeeService(req.body);
    res.status(201).json({
      succes: true,
      message: "Employee created successfully",
      data: employee,
    });
  },
);

export const getEmployeesController = async (req: Request, res: Response) => {
  const page = Number(req.query.page) || 1;
  const limit = Number(req.query.limit) || 10;
  const result = await getEmployeeService(page, limit);
  res.status(200).json({
    success: true,
    data: result.employees,
    pagination: result.pagination,
  });
};

export const getEmployeeByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const employee = await getEmployeeByIdService(req.params.id as string);
    res.json({
      success: true,
      data: employee,
    });
  },
);

export const updateEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    const data = updateEmployeeSchema.parse(req.body);
    const employeeData: Partial<IEmployee> = {
      ...data,
      department: data.department
        ? new Types.ObjectId(data.department)
        : undefined,
    };
    const employee = await updateEmployeeService(
      req.params.id as string,
      employeeData,
    );
    res.json({
      success: true,
      message: "Employee updated successfully",
      data: employee,
    });
  },
);
export const deleteEmployeeController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteEmployeeService(req.params.id as string);
    res.json({
      success: true,
      message: "Employee deleted successfully",
    });
  },
);
