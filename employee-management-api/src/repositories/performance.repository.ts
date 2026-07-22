import { Performance } from "../models/performance.model";
import { IPerformance } from "../interfaces/performance.interface";

export const createPerformance = (data: Partial<IPerformance>) => {
  return Performance.create(data);
};

export const getPerformance = () => {
  return Performance.find()
    .populate("employee")
    .populate("reviewer", "firstName lastName")
    .sort({ createdAt: -1 });
};

export const getPerformanceById = (id: string) => {
  return Performance.findById(id)
    .populate("employee")
    .populate("reviewer", "firstName lastName");
};

export const updatePerformance = (id: string, data: Partial<IPerformance>) => {
  return Performance.findByIdAndUpdate(id, data, {
    new: true,
    runValidators: true,
  });
};

export const deletePerformance = (id: string) => {
  return Performance.findByIdAndDelete(id);
};
