import { Shift } from "./shift.model";
import { IShift } from "./shift.types";

export const createShift = (data: Partial<IShift>) => {
  return Shift.create(data);
};

export const getShifts = () => {
  return Shift.find().sort({ createdAt: -1 });
};

export const getShiftById = (id: string) => {
  return Shift.findById(id);
};

export const updateShift = (id: string, data: Partial<IShift>) => {
  return Shift.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deleteShift = (id: string) => {
  return Shift.findByIdAndDelete(id);
};
