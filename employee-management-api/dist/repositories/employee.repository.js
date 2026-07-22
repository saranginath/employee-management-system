"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployee = exports.updateEmployee = exports.getEmployeeByPhone = exports.getEmployeeByEmail = exports.getEmployeeById = exports.getEmployees = exports.createEmployee = void 0;
const employee_model_1 = __importDefault(require("../models/employee.model"));
const createEmployee = async (data) => {
    return await employee_model_1.default.create(data);
};
exports.createEmployee = createEmployee;
const getEmployees = () => {
    return employee_model_1.default.find().populate("department").populate("user", "role email isActive");
};
exports.getEmployees = getEmployees;
const getEmployeeById = (id) => {
    return employee_model_1.default.findById(id).populate("department");
};
exports.getEmployeeById = getEmployeeById;
const getEmployeeByEmail = (email) => {
    return employee_model_1.default.findOne({ email });
};
exports.getEmployeeByEmail = getEmployeeByEmail;
const getEmployeeByPhone = (phone) => {
    return employee_model_1.default.findOne({ phone });
};
exports.getEmployeeByPhone = getEmployeeByPhone;
const updateEmployee = (id, data) => {
    return employee_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};
exports.updateEmployee = updateEmployee;
const deleteEmployee = (id) => {
    return employee_model_1.default.findByIdAndDelete(id);
};
exports.deleteEmployee = deleteEmployee;
