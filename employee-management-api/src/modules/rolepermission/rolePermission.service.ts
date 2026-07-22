import {
  createRolePermissionRepo,
  getRolesRepo,
  getRoleByIdRepo,
  getRoleByNameRepo,
  updateRolePermissionRepo,
  deleteRolePermissionRepo,
} from "./rolePermission.repository";

export const createRolePermissionService = async (data: any) => {
  const existing = await getRoleByNameRepo(data.role);

  if (existing) {
    throw new Error("Role already exists");
  }

  return createRolePermissionRepo(data);
};

export const getRolesService = () => {
  return getRolesRepo();
};

export const getRoleByIdService = (id: string) => {
  return getRoleByIdRepo(id);
};

export const updateRolePermissionService = (id: string, data: any) => {
  return updateRolePermissionRepo(id, data);
};

export const deleteRolePermissionService = (id: string) => {
  return deleteRolePermissionRepo(id);
};
