import { IPayroll } from "../interfaces/payroll.interface";
import { Payroll } from "../models/payroll.model";

export const createPayroll = (data: Partial<IPayroll>) => {
    return Payroll.create(data);
};

export const getPayroll = () => {
    return Payroll.find().populate("employee");
};

export const getPayrollById = (id: string) => {
    return Payroll.findById(id).populate("employee");
};

export const updatePayroll = (
    id: string,
    data: Partial<IPayroll>
) => {
    return Payroll.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deletePayroll = (id: string) => {
    return Payroll.findByIdAndDelete(id);
};