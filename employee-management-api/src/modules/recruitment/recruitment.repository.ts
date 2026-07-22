import { Recruitment } from "../models/recruitment.model";
import { IRecruitment } from "../interfaces/recruitment.interface";

export const createRecruitment = (
    data: Partial<IRecruitment>
) => Recruitment.create(data);

export const getRecruitments = () =>
    Recruitment.find().sort({ createdAt: -1 });

export const getRecruitmentById = (id: string) =>
    Recruitment.findById(id);

export const updateRecruitment = (
    id: string,
    data: Partial<IRecruitment>
) =>
    Recruitment.findByIdAndUpdate(id, data, {
        new: true,
        runValidators: true,
    });

export const deleteRecruitment = (id: string) =>
    Recruitment.findByIdAndDelete(id);