import { z } from 'zod'

export const tagParamsSchema = z.object({
  id: z.coerce.number().int().positive(),
})

export const tagSchema = z.object({
  id: z.number().int().positive(),
  name: z.string(),
})

export const tagPayloadSchema = z.object({
  name: z
    .string()
    .trim()
    .min(1, 'Name is required')
    .max(100, 'Name must be at most 100 characters long'),
})

export type TagPayload = z.infer<typeof tagPayloadSchema>
export type TagParams = z.infer<typeof tagParamsSchema>
