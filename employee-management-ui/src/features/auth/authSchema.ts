import { z } from "zod";


// Login Schema

export const loginSchema = z.object({

    email: z
        .string()
        .email("Invalid email address"),

    password: z
        .string()
        .min(8, "Password must be minimum 8 characters")
        .max(100, "Password cannot exceed 100 characters"),
    rememberMe: z.boolean().optional()

});


// Register Schema

export const registerSchema = z.object({

    firstName: z
        .string()
        .min(2, "First name must be at least 2 characters")
        .max(50, "First name cannot exceed 50 characters"),


    lastName: z
        .string()
        .min(2, "Last name must be at least 2 characters")
        .max(50, "Last name cannot exceed 50 characters"),


    email: z
        .string()
        .email("Invalid email address"),


    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),

});



// Reset Password Schema

export const resetPasswordSchema = z.object({

    password: z
        .string()
        .min(8, "Password must be at least 8 characters")
        .max(100, "Password cannot exceed 100 characters")
        .regex(
            /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/,
            "Password must contain at least one uppercase letter, one lowercase letter, and one number"
        ),


    confirmPassword: z
        .string()
        .min(1, "Please confirm your password")

})
    .refine(
        (data) => data.password === data.confirmPassword,
        {
            message: "Passwords do not match",
            path: ["confirmPassword"]
        }
    );



// Types

export type LoginSchema = z.infer<typeof loginSchema>;

export type RegisterSchema = z.infer<typeof registerSchema>;

export type ResetPasswordForm = z.infer<typeof resetPasswordSchema>;