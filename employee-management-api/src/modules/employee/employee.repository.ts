import { IEmployee } from "./employee.types";
import Employee from "./employee.model";

export const createEmployee = async (data: Partial<IEmployee>) => {
  return await Employee.create(data);
};

export const getEmployees = () => {
  return Employee.find()
    .populate("department")
    .populate("user", "role email isActive");
};

export const getEmployeeById = (id: string) => {
  return Employee.findById(id).populate("department");
};

export const getEmployeeByEmail = (email: string) => {
  return Employee.findOne({ email });
};

export const getEmployeeByPhone = (phone: string) => {
  return Employee.findOne({ phone });
};

export const updateEmployee = (id: string, data: Partial<IEmployee>) => {
  return Employee.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteEmployee = (id: string) => {
  return Employee.findByIdAndDelete(id);
};
