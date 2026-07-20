"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentController = exports.createDepartmentController = void 0;
const department_service_1 = require("../services/department.service");
const department_validator_1 = require("../validators/department.validator");
const asyncHandler_1 = require("../middleware/asyncHandler");
exports.createDepartmentController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const data = department_validator_1.createDepartmentSchema.parse(req.body);
    const department = await (0, department_service_1.createDepartmentService)(data);
    res.status(201).json({
        sucess: true,
        message: "Created department successfully",
        data: department
    });
});
exports.getDepartmentController = (0, asyncHandler_1.asyncHanlder)(async (req, res) => {
    const department = await (0, department_service_1.getDepartmentService)();
    res.status(200).json({
        success: true,
        data: department
    });
});
