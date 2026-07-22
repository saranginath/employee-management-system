import { Holiday } from "../models/holiday.model";
import { IHoliday } from "../interfaces/holiday.interface";

export const createHoliday = (data: Partial<IHoliday>) => {
    return Holiday.create(data);
};

export const getHoliday = () => {
    return Holiday.find().sort({ date: 1 });
};

export const getHolidayById = (id: string) => {
    return Holiday.findById(id);
};

export const updateHoliday = (
    id: string,
    data: Partial<IHoliday>
) => {
    return Holiday.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });
};

export const deleteHoliday = (id: string) => {
    return Holiday.findByIdAndDelete(id);
};