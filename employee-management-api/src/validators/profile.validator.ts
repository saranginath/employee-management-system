import { z } from "zod";

export const updateProfileSchema = z.object({
  firstName: z
    .string()
    .trim()
    .min(2, "First name must be at least 2 characters")
    .optional(),

  lastName: z
    .string()
    .trim()
    .min(2, "Last name must be at least 2 characters")
    .optional(),

  phone: z
    .string()
    .trim()
    .regex(/^[+]?[\d\s-]{8,15}$/, "Invalid phone number")
    .optional(),

  address: z
    .string()
    .trim()
    .min(5, "Address must be at least 5 characters")
    .optional(),

  profileImage: z.string().url("Invalid profile image URL").optional(),
});

export const changePasswordSchema = z.object({
  currentPassword: z.string().min(8, "Current password is required"),

  newPassword: z
    .string()
    .min(8, "Password must contain minimum 8 characters")
    .regex(
      /^(?=.*[A-Z])(?=.*[a-z])(?=.*\d).+$/,
      "Password must contain uppercase, lowercase and number",
    ),
});
