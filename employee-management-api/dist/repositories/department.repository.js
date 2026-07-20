"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.getDepartmentByManager = exports.getDepartmentByCode = exports.getDepartmentByName = exports.deleteDepartment = exports.updateDepartment = exports.getDepartmentById = exports.getDepartment = exports.createDepartment = void 0;
const department_model_1 = require("../models/department.model");
const createDepartment = async (data) => {
    return department_model_1.Department.create(data);
};
exports.createDepartment = createDepartment;
const getDepartment = () => {
    return department_model_1.Department.find().populate("manager");
};
exports.getDepartment = getDepartment;
const getDepartmentById = (id) => {
    return department_model_1.Department.findById(id).populate("manager");
};
exports.getDepartmentById = getDepartmentById;
const updateDepartment = (id, data) => {
    return department_model_1.Department.findByIdAndUpdate(id, data, { new: true, runValidators: true });
};
exports.updateDepartment = updateDepartment;
const deleteDepartment = (id) => {
    return department_model_1.Department.findByIdAndDelete(id);
};
exports.deleteDepartment = deleteDepartment;
const getDepartmentByName = (name) => {
    return department_model_1.Department.findOne({ name });
};
exports.getDepartmentByName = getDepartmentByName;
const getDepartmentByCode = (code) => {
    return department_model_1.Department.findOne({ code });
};
exports.getDepartmentByCode = getDepartmentByCode;
const getDepartmentByManager = (managerId) => {
    return department_model_1.Department.findOne({
        manager: managerId,
    });
};
exports.getDepartmentByManager = getDepartmentByManager;
