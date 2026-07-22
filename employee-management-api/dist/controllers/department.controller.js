"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartmentController = exports.updateDepartmentController = exports.getDepartmentByIdController = exports.getDepartmentsController = exports.createDepartmentController = void 0;
const department_service_1 = require("../services/department.service");
const asyncHandler_1 = require("../middleware/asyncHandler");
// CREATE
exports.createDepartmentController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const department = await (0, department_service_1.createDepartmentService)(req.body);
    res.status(201).json({
        success: true,
        message: "Department created successfully",
        data: department
    });
});
// GET ALL
exports.getDepartmentsController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const departments = await (0, department_service_1.getDepartmentsService)();
    res.status(200).json({
        success: true,
        data: departments
    });
});
exports.getDepartmentByIdController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const department = await (0, department_service_1.getDepartmentByIdService)(req.params.id);
    res.status(200).json({
        success: true,
        data: department
    });
});
exports.updateDepartmentController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    const department = await (0, department_service_1.updateDepartmentService)(req.params.id, req.body);
    res.status(200).json({
        success: true,
        message: "Department updated",
        data: department
    });
});
exports.deleteDepartmentController = (0, asyncHandler_1.asyncHandler)(async (req, res) => {
    await (0, department_service_1.deleteDepartmentService)(req.params.id);
    res.status(200).json({
        success: true,
        message: "Department deleted"
    });
});
