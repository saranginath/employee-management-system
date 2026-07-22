import * as recruitmentRepository from "../repositories/recruitment.repository";
import { AppError } from "../utils/AppError";

export const createRecruitmentService = (data: any) =>
    recruitmentRepository.createRecruitment(data);

export const getRecruitmentService = () =>
    recruitmentRepository.getRecruitments();

export const getRecruitmentByIdService = async (id: string) => {
    const recruitment =
        await recruitmentRepository.getRecruitmentById(id);

    if (!recruitment) {
        throw new AppError("Recruitment not found", 404);
    }

    return recruitment;
};

export const updateRecruitmentService = async (
    id: string,
    data: any
) => {
    const recruitment =
        await recruitmentRepository.updateRecruitment(id, data);

    if (!recruitment) {
        throw new AppError("Recruitment not found", 404);
    }

    return recruitment;
};

export const deleteRecruitmentService = async (
    id: string
) => {
    const recruitment =
        await recruitmentRepository.deleteRecruitment(id);

    if (!recruitment) {
        throw new AppError("Recruitment not found", 404);
    }
};