import * as performanceRepository from "../repositories/performance.repository";
import { AppError } from "../utils/AppError";

export const createPerformanceService = (data: any) => {
  return performanceRepository.createPerformance(data);
};

export const getPerformanceService = () => {
  return performanceRepository.getPerformance();
};

export const getPerformanceByIdService = async (id: string) => {
  const review = await performanceRepository.getPerformanceById(id);

  if (!review) {
    throw new AppError("Performance review not found", 404);
  }

  return review;
};

export const updatePerformanceService = async (id: string, data: any) => {
  const review = await performanceRepository.updatePerformance(id, data);

  if (!review) {
    throw new AppError("Performance review not found", 404);
  }

  return review;
};

export const deletePerformanceService = async (id: string) => {
  const review = await performanceRepository.deletePerformance(id);

  if (!review) {
    throw new AppError("Performance review not found", 404);
  }
};
