import { z } from "zod";

export const employeeSchema = z.object({

    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters"),

    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters"),

    email: z
        .string()
        .email("Invalid email address"),

    phone: z
        .string({
            message: "Phone number is required",
        })
        .min(8, "Phone number must be at least 8 characters"),

    department: z
        .string()
        .min(1, "Department is required")
        .regex(
            /^[0-9a-fA-F]{24}$/,
            "Invalid department"
        ),

    designation: z
        .string()
        .min(2, "Designation is required"),

    role: z.enum([
        "admin",
        "manager",
        "employee"
    ]),

    salary: z
        .coerce
        .number({
            message: "Salary is required",
        })
        .positive(
            "Salary must be greater than zero"
        ),
});


export type EmployeeForm =
    z.infer<typeof employeeSchema>;