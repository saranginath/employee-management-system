"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const auth_middleware_1 = require("../middleware/auth.middleware");
const employee_controller_1 = require("../controllers/employee.controller");
const authorize_middleare_1 = require("../middleware/authorize.middleare");
const role_1 = require("../constants/role");
const router = (0, express_1.default)();
router.post('/', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(role_1.ROLES.ADMIN, role_1.ROLES.MANAGER), employee_controller_1.createEmployeeController);
router.get('/', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(role_1.ROLES.ADMIN, role_1.ROLES.MANAGER), employee_controller_1.getEmployeeController);
router.get('/:id', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(role_1.ROLES.ADMIN, role_1.ROLES.MANAGER), employee_controller_1.getEmployeeByIdController);
router.patch('/:id', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(role_1.ROLES.ADMIN, role_1.ROLES.MANAGER), employee_controller_1.updateEmployeeController);
router.delete('/:id', auth_middleware_1.authenticate, (0, authorize_middleare_1.authorize)(role_1.ROLES.ADMIN, role_1.ROLES.MANAGER), employee_controller_1.deleteEmployeeController);
exports.default = router;
