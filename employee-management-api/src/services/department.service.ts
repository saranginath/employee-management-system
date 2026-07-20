import { Types } from "mongoose";
import { createDepartment, getDepartment, getDepartmentByCode } from "../repositories/department.repository";


import { CreateDepartmentInput } from "../validators/department.validator";


export const createDepartmentService = async (
    data: CreateDepartmentInput
) => {
    const departmentExists =
        await getDepartmentByCode(data.code);

    if (departmentExists) {
        throw new Error("Department code already exists");
    }
    const departmentData = {
        name: data.name,
        code: data.code,
        description: data.description,
        status: data.status ?? "active",
        manager: data.manager
            ? new Types.ObjectId(data.manager)
            : null
    };
    return createDepartment(departmentData);
};

export const getDepartmentService = async () => {
    return await getDepartment()
}