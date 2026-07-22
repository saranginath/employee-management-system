import { IEmployee } from "../interfaces/employee.interface";
import Employee from "../models/employee.model";

export const createEmployee = async (data: Partial<IEmployee>) => {
  return await Employee.create(data);
};

export const getEmployees = async (page: number, limit: number) => {
  const skip = (page - 1) * limit;
  const employees = await Employee.find()
    .populate("department")
    .populate("user", "role email isActive")
    .skip(skip)
    .limit(limit)
    .sort({
      createdAt: -1,
    });
  const totalRecords = await Employee.countDocuments();
  return {
    employees,
    totalRecords,
  };
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
