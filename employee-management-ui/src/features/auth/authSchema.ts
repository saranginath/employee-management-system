import { z } from "zod";

export const loginSchema = z.object({
    email: z.string().email("Invalid email address"),
    password: z.string().min(6, "Password must be minimum 8 character")
})

export const registerSchema = z.object({

})

export type LoginSchema = z.infer<typeof loginSchema>