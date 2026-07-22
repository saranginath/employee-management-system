import { z } from "zod";

export const createRecruitmentSchema = z.object({
  jobTitle: z.string().min(3),

  department: z.string(),

  description: z.string().min(10),

  requirements: z.array(z.string()).optional(),

  location: z.string(),

  employmentType: z.enum(["Full-Time", "Part-Time", "Contract", "Internship"]),

  salary: z.number().optional(),

  vacancies: z.number().positive(),

  applicationDeadline: z.coerce.date(),

  status: z.enum(["Open", "Closed"]).optional(),
});

export const updateRecruitmentSchema = createRecruitmentSchema.partial();
