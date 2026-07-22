import { RolePermission } from "../models/rolePermission.mode";
export const createRolePermissionRepo = (data: any) => {
  return RolePermission.create(data);
};

export const getRolesRepo = () => {
  return RolePermission.find();
};

export const getRoleByIdRepo = (id: string) => {
  return RolePermission.findById(id);
};

export const getRoleByNameRepo = (role: string) => {
  return RolePermission.findOne({
    role,
  });
};

export const updateRolePermissionRepo = (id: string, data: any) => {
  return RolePermission.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteRolePermissionRepo = (id: string) => {
  return RolePermission.findByIdAndDelete(id);
};
