"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeService = exports.updateEmployeeService = exports.getEmployeeByIdService = exports.getEmployeeService = exports.createEmployeeService = void 0;
const employee_repository_1 = require("../repositories/employee.repository");
const AppError_1 = require("../utils/AppError");
const department_repository_1 = require("../repositories/department.repository");
const createEmployeeService = async (data) => {
    const department = await (0, department_repository_1.getDepartmentById)(data.department.toString());
    if (!department) {
        throw new AppError_1.AppError("Department nor found", 404);
    }
    return await (0, employee_repository_1.createEmployee)(data);
};
exports.createEmployeeService = createEmployeeService;
const getEmployeeService = async () => {
    return await (0, employee_repository_1.getEmployees)();
};
exports.getEmployeeService = getEmployeeService;
const getEmployeeByIdService = async (id) => {
    const employee = await (0, employee_repository_1.getEmployeeById)(id);
    if (!employee) {
        throw new AppError_1.AppError("Empployee not found", 404);
    }
    return employee;
};
exports.getEmployeeByIdService = getEmployeeByIdService;
const updateEmployeeService = async (id, data) => {
    const employee = await (0, employee_repository_1.updateEmployee)(id, data);
    if (!employee) {
        throw new AppError_1.AppError("Employee not found", 404);
    }
    return employee;
};
exports.updateEmployeeService = updateEmployeeService;
const deleteEmployeeService = async (id) => {
    const employee = await (0, employee_repository_1.deleteEmployee)(id);
    if (!employee) {
        throw new AppError_1.AppError("Employee Not found", 404);
    }
    return;
};
exports.deleteEmployeeService = deleteEmployeeService;
