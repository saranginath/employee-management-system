import { IEmployee } from "../interfaces/employee.interface";
import Employee from '../models/employee.model'
import { getDepartmentById, updateDepartment } from "./department.repository";
export const createEmployee = async (
    data: Partial<IEmployee>
) => {

    const employee = await Employee.create(data);

    if (employee.role === "manager") {

        await updateDepartment(
            employee.department.toString(),
            {
                manager: employee._id
            }
        );

    }

    return employee;
};

export const getEmployees = () => {
    return Employee.find().populate("department");
};

export const getEmployeeById = (id: string) => {
    return Employee.findById(id)
};

export const updateEmployee = (id: string, data: any) => {
    return Employee.findByIdAndUpdate(id, data, { new: true })
};

export const deleteEmployee = (id: string) => {
    return Employee.findByIdAndDelete(id);
}