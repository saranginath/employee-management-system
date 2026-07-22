import { Document } from "mongoose";

export interface IRecruitment extends Document {
    jobTitle: string;
    department: string;
    description: string;
    requirements: string[];
    location: string;
    employmentType: "Full-Time" | "Part-Time" | "Contract" | "Internship";
    salary?: number;
    vacancies: number;
    applicationDeadline: Date;
    status: "Open" | "Closed";
}