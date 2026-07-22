"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentService = exports.updateDepartmentService = exports.getDepartmentByIdService = exports.getDepartmentsService = exports.createDepartmentService = void 0;
const department_repository_1 = require("../repositories/department.repository");
const createDepartmentService = async (data) => {
    return await (0, department_repository_1.createDepartment)(data);
};
exports.createDepartmentService = createDepartmentService;
const getDepartmentsService = async () => {
    return await (0, department_repository_1.getDepartments)();
};
exports.getDepartmentsService = getDepartmentsService;
const getDepartmentByIdService = async (id) => {
    return await (0, department_repository_1.getDepartmentById)(id);
};
exports.getDepartmentByIdService = getDepartmentByIdService;
const updateDepartmentService = async (id, data) => {
    return await (0, department_repository_1.updateDepartment)(id, data);
};
exports.updateDepartmentService = updateDepartmentService;
const deleteDepartmentService = async (id) => {
    return await (0, department_repository_1.deleteDepartment)(id);
};
exports.deleteDepartmentService = deleteDepartmentService;
