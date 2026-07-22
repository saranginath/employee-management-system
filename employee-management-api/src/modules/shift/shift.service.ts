import * as shiftRepository from "./shift.repository";
import { AppError } from "../../utils/AppError";

export const createShiftService = (data: any) => {
  return shiftRepository.createShift(data);
};

export const getShiftsService = () => {
  return shiftRepository.getShifts();
};

export const getShiftByIdService = async (id: string) => {
  const shift = await shiftRepository.getShiftById(id);

  if (!shift) {
    throw new AppError("Shift not found", 404);
  }

  return shift;
};

export const updateShiftService = async (id: string, data: any) => {
  const shift = await shiftRepository.updateShift(id, data);

  if (!shift) {
    throw new AppError("Shift not found", 404);
  }

  return shift;
};

export const deleteShiftService = async (id: string) => {
  const shift = await shiftRepository.deleteShift(id);

  if (!shift) {
    throw new AppError("Shift not found", 404);
  }
};
