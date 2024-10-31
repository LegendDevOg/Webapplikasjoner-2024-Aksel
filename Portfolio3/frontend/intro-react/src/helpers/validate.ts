import { z } from 'zod';

export const projectSchema = z.object({
    id: z.number(),
    name: z.string(),
    description: z.string(),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    status: z.string(),
    goals: z.array(
        z.object({
            id: z.number(),
            description: z.string()
        })
    )
});

export const projectsSchema = z.array(projectSchema);