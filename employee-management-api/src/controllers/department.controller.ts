import { Request, Response } from "express";

import {
  createDepartmentService,
  getDepartmentsService,
  getDepartmentByIdService,
  updateDepartmentService,
  deleteDepartmentService,
} from "../services/department.service";

import { asyncHandler } from "../middleware/asyncHandler";

// CREATE

export const createDepartmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const department = await createDepartmentService(req.body);

    res.status(201).json({
      success: true,

      message: "Department created successfully",

      data: department,
    });
  },
);

// GET ALL

export const getDepartmentsController = asyncHandler(
  async (req: Request, res: Response) => {
    const departments = await getDepartmentsService();

    res.status(200).json({
      success: true,

      data: departments,
    });
  },
);

export const getDepartmentByIdController = asyncHandler(
  async (req: Request, res: Response) => {
    const department = await getDepartmentByIdService(req.params.id as string);
    res.status(200).json({
      success: true,

      data: department,
    });
  },
);

export const updateDepartmentController = asyncHandler(
  async (req: Request, res: Response) => {
    const department = await updateDepartmentService(
      req.params.id as string,
      req.body,
    );

    res.status(200).json({
      success: true,

      message: "Department updated",

      data: department,
    });
  },
);

export const deleteDepartmentController = asyncHandler(
  async (req: Request, res: Response) => {
    await deleteDepartmentService(req.params.id as string);

    res.status(200).json({
      success: true,

      message: "Department deleted",
    });
  },
);
