import { z } from 'zod'

export const errorSchema = z.object({
  message: z.string(),
  details: z
    .array(
      z.object({
        field: z.string().optional(),
        message: z.string().optional(),
      }),
    )
    .optional(),
})
