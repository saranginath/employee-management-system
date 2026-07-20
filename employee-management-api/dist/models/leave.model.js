"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Leave = void 0;
const mongoose_1 = require("mongoose");
const constants_1 = require("../constants");
const leaveSchema = new mongoose_1.Schema({
    employee: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Employee",
        required: true
    },
    startDate: {
        type: Date,
        required: true
    },
    endDate: {
        type: Date,
        required: true
    },
    type: {
        type: String,
        enum: Object.values(constants_1.LEAVE_TYPES),
        required: true
    },
    reason: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: Object.values(constants_1.LEAVE_STATUS),
        default: constants_1.LEAVE_STATUS.PENDING
    },
    approvedBy: {},
    rejectionReason: {
        type: String,
        trim: true,
        default: null
    }
}, {
    timestamps: true
});
exports.Leave = (0, mongoose_1.model)("Leave", leaveSchema);
