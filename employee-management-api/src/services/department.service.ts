import {
  createDepartment,
  getDepartments,
  getDepartmentById,
  updateDepartment,
  deleteDepartment,
} from "../repositories/department.repository";

export const createDepartmentService = async (data: any) => {
  return await createDepartment(data);
};

export const getDepartmentsService = async () => {
  return await getDepartments();
};

export const getDepartmentByIdService = async (id: string) => {
  return await getDepartmentById(id);
};

export const updateDepartmentService = async (id: string, data: any) => {
  return await updateDepartment(id, data);
};

export const deleteDepartmentService = async (id: string) => {
  return await deleteDepartment(id);
};
