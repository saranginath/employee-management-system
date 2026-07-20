"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentService = exports.createDepartmentService = void 0;
const mongoose_1 = require("mongoose");
const department_repository_1 = require("../repositories/department.repository");
const createDepartmentService = async (data) => {
    const departmentExists = await (0, department_repository_1.getDepartmentByCode)(data.code);
    if (departmentExists) {
        throw new Error("Department code already exists");
    }
    const departmentData = {
        name: data.name,
        code: data.code,
        description: data.description,
        status: data.status ?? "active",
        manager: data.manager
            ? new mongoose_1.Types.ObjectId(data.manager)
            : null
    };
    return (0, department_repository_1.createDepartment)(departmentData);
};
exports.createDepartmentService = createDepartmentService;
const getDepartmentService = async () => {
    return await (0, department_repository_1.getDepartment)();
};
exports.getDepartmentService = getDepartmentService;
