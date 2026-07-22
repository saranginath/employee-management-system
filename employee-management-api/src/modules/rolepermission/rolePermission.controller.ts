import { Request, Response } from "express";

import {
  createRolePermissionService,
  getRolesService,
  getRoleByIdService,
  updateRolePermissionService,
  deleteRolePermissionService,
} from "./rolePermission.service";

export const createRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  const role = await createRolePermissionService(req.body);

  res.status(201).json({
    success: true,
    data: role,
  });
};

export const getRolesController = async (req: Request, res: Response) => {
  const roles = await getRolesService();

  res.json({
    success: true,
    data: roles,
  });
};

export const getRoleByIdController = async (req: Request, res: Response) => {
  const role = await getRoleByIdService(req.params.id as string);

  res.json({
    success: true,
    data: role,
  });
};

export const updateRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  const role = await updateRolePermissionService(
    req.params.id as string,
    req.body,
  );

  res.json({
    success: true,
    data: role,
  });
};

export const deleteRolePermissionController = async (
  req: Request,
  res: Response,
) => {
  await deleteRolePermissionService(req.params.id as string);

  res.json({
    success: true,
    message: "Role deleted",
  });
};
