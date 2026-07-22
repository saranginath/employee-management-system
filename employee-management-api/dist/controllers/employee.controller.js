"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteEmployeeController = exports.updateEmployeeController = exports.getEmployeeByIdController = exports.getEmployeeController = exports.createEmployeeController = void 0;
const asyncHandler_1 = require("../middleware/asyncHandler");
const employee_service_1 = require("../services/employee.service");
const employee_validator_1 = require("../validators/employee.validator");
const mongoose_1 = require("mongoose");
exports.createEmployeeController = (0, asyncHandler_1.asyncHandler)(async (req, res, next) => {
    const employee = await (0, employee_service_1.createEmployeeService)(req.body);
    res.status(201).json({
        succes: true,
        message: "Employee created successfully",
        data: employee
    });
});
exports.getEmployeeController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const employee = await (0, employee_service_1.getEmployeeService)();
    res.json({
        success: true,
        data: employee
    });
});
exports.getEmployeeByIdController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const employee = await (0, employee_service_1.getEmployeeByIdService)(req.params.id);
    res.json({
        success: true,
        data: employee
    });
});
exports.updateEmployeeController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const data = employee_validator_1.updateEmployeeSchema.parse(req.body);
    const employeeData = {
        ...data,
        department: data.department ? new mongoose_1.Types.ObjectId(data.department) : undefined
    };
    const employee = await (0, employee_service_1.updateEmployeeService)(req.params.id, employeeData);
    res.json({
        success: true,
        message: "Employee updated successfully",
        data: employee
    });
});
exports.deleteEmployeeController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await (0, employee_service_1.deleteEmployeeService)(req.params.id);
    res.json({
        success: true,
        message: "Employee deleted successfully"
    });
});
