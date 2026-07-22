"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeService = exports.updateEmployeeService = exports.getEmployeeByIdService = exports.getEmployeeService = exports.createEmployeeService = void 0;
const employee_repository_1 = require("../repositories/employee.repository");
const AppError_1 = require("../utils/AppError");
const department_repository_1 = require("../repositories/department.repository");
const user_respository_1 = require("../repositories/user.respository");
const password_1 = require("../utils/password");
const role_constant_1 = require("../constants/role.constant");
const createEmployeeService = async (data) => {
    // Check department
    const department = await (0, department_repository_1.getDepartmentById)(data.department.toString());
    if (!department) {
        throw new AppError_1.AppError("Department not found", 404);
    }
    // Check duplicate email in User
    const emailExists = await (0, user_respository_1.findUserByEmail)(data.email);
    if (emailExists) {
        throw new AppError_1.AppError("Email already exists", 409);
    }
    // Check duplicate phone in Employee
    const phoneExists = await (0, employee_repository_1.getEmployeeByPhone)(data.phone);
    if (phoneExists) {
        throw new AppError_1.AppError("Phone number already exists", 409);
    }
    const password = "Temp@1234";
    const hashedPassword = await (0, password_1.hashedpassword)(password);
    // Create User
    const user = await (0, user_respository_1.createUser)({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        password: hashedPassword,
        role: data.role,
        isFirstLogin: true,
        isActive: true
    });
    // Create Employee
    const employee = await (0, employee_repository_1.createEmployee)({
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
    if (data.role === role_constant_1.ROLES.MANAGER) {
        await (0, department_repository_1.updateDepartment)(data.department.toString(), {
            manager: employee._id
        });
    }
    return employee;
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
    const employee = await (0, employee_repository_1.getEmployeeById)(id);
    if (!employee) {
        throw new AppError_1.AppError("Employee not found", 404);
    }
    const updatedEmployee = await (0, employee_repository_1.updateEmployee)(id, data);
    return updatedEmployee;
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
