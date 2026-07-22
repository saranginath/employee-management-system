import * as holidayRepository from "../repositories/holiday.repository";
import { AppError } from "../utils/AppError";

export const createHolidayService = async (data: any) => {
  return holidayRepository.createHoliday(data);
};

export const getHolidayService = () => {
  return holidayRepository.getHoliday();
};

export const getHolidayByIdService = async (id: string) => {
  const holiday = await holidayRepository.getHolidayById(id);

  if (!holiday) {
    throw new AppError("Holiday not found", 404);
  }

  return holiday;
};

export const updateHolidayService = async (id: string, data: any) => {
  const holiday = await holidayRepository.updateHoliday(id, data);

  if (!holiday) {
    throw new AppError("Holiday not found", 404);
  }

  return holiday;
};

export const deleteHolidayService = async (id: string) => {
  const holiday = await holidayRepository.deleteHoliday(id);

  if (!holiday) {
    throw new AppError("Holiday not found", 404);
  }

  return holiday;
};
