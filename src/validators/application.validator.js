import { z } from "zod";

export const createApplicationSchema = z.object({
    companyId: z
        .number()
        .int()
        .positive(),

    jobTitle: z
        .string()
        .min(2, "Job title must be at least 2 characters"),

    status: z
        .enum([
            "saved",
            "applied",
            "assessment",
            "interview",
            "offer",
            "rejected",
            "withdrawn"
        ])
        .optional(),

    jobUrl: z
        .string()
        .url("Invalid job URL")
        .optional(),

    location: z
        .string()
        .optional(),

    notes: z
        .string()
        .optional(),

    appliedAt: z
        .string()
        .datetime()
        .optional(),

    salary: z
        .number()
        .nonnegative()
        .optional()
});