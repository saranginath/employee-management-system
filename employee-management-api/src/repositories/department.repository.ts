import { CreatedepartmentData, IDepartment } from "../interfaces/department.interface";
import { Department } from "../models/department.model";

import { Types } from "mongoose";



export const createDepartment = async (
    data: Partial<IDepartment>
) => {

    return Department.create(data);
};

export const getDepartment = () => {
    return Department.find().populate("manager")
}

export const getDepartmentById = (id: string) => {
    return Department.findById(id).populate("manager");
}

export const updateDepartment = (id: string, data: Partial<IDepartment>) => {
    return Department.findByIdAndUpdate(id, data, { new: true, runValidators: true })
}

export const deleteDepartment = (id: string) => {
    return Department.findByIdAndDelete(id)
}

export const getDepartmentByName = (name: string) => {
    return Department.findOne({ name })
}
export const getDepartmentByCode = (code: string) => {
    return Department.findOne({ code })
}
export const getDepartmentByManager = (
    managerId: Types.ObjectId
) => {
    return Department.findOne({
        manager: managerId,
    });
};