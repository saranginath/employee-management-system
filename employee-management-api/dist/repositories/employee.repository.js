"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const department_repository_1 = require("./department.repository");
const createEmployee = async (data) => {
    const employee = await employee_model_1.default.create(data);
    if (employee.role === "manager") {
        await (0, department_repository_1.updateDepartment)(employee.department.toString(), {
            manager: employee._id
        });
    }
    return employee;
};
exports.createEmployee = createEmployee;
const getEmployees = () => {
    return employee_model_1.default.find().populate("department");
};
exports.getEmployees = getEmployees;
const getEmployeeById = (id) => {
    return employee_model_1.default.findById(id);
};
exports.getEmployeeById = getEmployeeById;
const updateEmployee = (id, data) => {
    return employee_model_1.default.findByIdAndUpdate(id, data, { new: true });
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => {
    return employee_model_1.default.findByIdAndDelete(id);
};
exports.deleteEmployee = deleteEmployee;
