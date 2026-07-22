"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getDepartments = exports.createDepartment = void 0;
const department_model_1 = __importDefault(require("../models/department.model"));
const createDepartment = async (data) => {
    return await department_model_1.default.create(data);
};
exports.createDepartment = createDepartment;
const getDepartments = async () => {
    return await department_model_1.default.find()
        .populate("manager", "firstName lastName email");
};
exports.getDepartments = getDepartments;
const getDepartmentById = async (id) => {
    return await department_model_1.default.findById(id)
        .populate("manager", "firstName lastName email");
};
exports.getDepartmentById = getDepartmentById;
const updateDepartment = async (id, data) => {
    return await department_model_1.default.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true
    });
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = async (id) => {
    return await department_model_1.default.findByIdAndDelete(id);
};
exports.deleteDepartment = deleteDepartment;
