import { IEmployee } from "../interfaces/employee.interface";
import { Department } from "../models/department.model";
import { createEmployee, deleteEmployee, getEmployeeById, getEmployees, updateEmployee } from "../repositories/employee.repository";
import { AppError } from "../utils/AppError";
import { getDepartmentById } from "../repositories/department.repository";

export const createEmployeeService = async (data: IEmployee) => {
    const department = await getDepartmentById(data.department.toString());
    if (!department) {
        throw new AppError("Department nor found", 404);
    }

    return await createEmployee(data)

}

export const getEmployeeService = async () => {
    return await getEmployees()
}

export const getEmployeeByIdService = async (id: string) => {
    const employee = await getEmployeeById(id);
    if (!employee) {
        throw new AppError("Empployee not found", 404)
    }
    return employee;
}

export const updateEmployeeService = async (id: string, data: Partial<IEmployee>) => {
    const employee = await updateEmployee(id, data);
    if (!employee) {
        throw new AppError("Employee not found", 404)
    }
    return employee;
}

export const deleteEmployeeService = async (id: string) => {
    const employee = await deleteEmployee(id);
    if (!employee) {
        throw new AppError("Employee Not found", 404)
    }
    return;
}