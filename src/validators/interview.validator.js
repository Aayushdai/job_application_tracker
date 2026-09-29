import { z } from "zod";

export const createInterviewSchema = z.object({
    type: z.enum([
        "phone",
        "technical",  
        "behavioral",
        "hr",
        "final",
        "other"
    ]),
    scheduledAt: z.string().datetime(),
    location: z.string().optional(),

    meetingUrl: z.string().url("Invalid meeting URL").optional(),

    notes: z.string().optional(),

    status: z.enum([
        "scheduled",
        "completed",
        "cancelled"
    ]).optional(),

})