"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.asyncHanlder = void 0;
const asyncHanlder = (fn) => (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
};
exports.asyncHanlder = asyncHanlder;
