import { z } from "zod";

export const companySchema = z.object({
    name: z
        .string()
        .min(2, "Name must be at least 2 character "),
    website: z
        .string()
        .url("Invalid URL")
        .optional(),
    industry: z
        .string()
        .optional(),
    location: z
        .string()
        .optional()
});