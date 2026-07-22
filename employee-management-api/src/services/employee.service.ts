import { CreateEmployeeDTO, IEmployee } from "../interfaces/employee.interface";

import { createEmployee, deleteEmployee, getEmployeeById, getEmployeeByPhone, getEmployees, updateEmployee } from "../repositories/employee.repository";
import { AppError } from "../utils/AppError";
import { getDepartmentById, updateDepartment } from "../repositories/department.repository";


import mongoose from "mongoose";

import { createUser, findUserByEmail } from "../repositories/user.respository";
import { hashedpassword } from "../utils/password";
import { ROLES } from "../constants/role.constant";


export const createEmployeeService = async (
    data: CreateEmployeeDTO
) => {

    // Check department
    const department = await getDepartmentById(
        data.department.toString()
    );

    if (!department) {
        throw new AppError(
            "Department not found",
            404
        );
    }


    // Check duplicate email in User
    const emailExists = await findUserByEmail(data.email);

    if (emailExists) {
        throw new AppError(
            "Email already exists",
            409
        );
    }


    // Check duplicate phone in Employee
    const phoneExists = await getEmployeeByPhone(data.phone);

    if (phoneExists) {
        throw new AppError(
            "Phone number already exists",
            409
        );
    }


    const password = "Temp@1234";

    const hashedPassword = await hashedpassword(password);



    // Create User
    const user = await createUser({

        firstName: data.firstName,

        lastName: data.lastName,

        email: data.email,

        password: hashedPassword,

        role: data.role,

        isFirstLogin: true,

        isActive: true

    });



    // Create Employee
    const employee = await createEmployee({

        firstName: data.firstName,

        lastName: data.lastName,

        email: data.email,

        phone: data.phone,

        department: data.department,

        designation: data.designation,

        salary: data.salary,

        user: user._id

    });



    // Assign manager
    if (data.role === ROLES.MANAGER) {

        await updateDepartment(
            data.department.toString(),
            {
                manager: employee._id
            }
        );

    }


    return employee;
};



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

export const updateEmployeeService = async (
    id: string,
    data: Partial<IEmployee> & {
        email?: string;
        role?: string;
    }
) => {

    const employee = await getEmployeeById(id);

    if (!employee) {
        throw new AppError(
            "Employee not found",
            404
        );
    }
    const updatedEmployee = await updateEmployee(
        id,
        data
    );
    return updatedEmployee;
};

export const deleteEmployeeService = async (id: string) => {
    const employee = await deleteEmployee(id);
    if (!employee) {
        throw new AppError("Employee Not found", 404)
    }
    return;
}