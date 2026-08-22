import { z } from 'zod'

export const findManyPostsSchema = z.object({
  page: z.coerce.number().int().positive().default(1),
  limit: z.coerce.number().int().positive().max(30).default(10),
  search: z.string().optional(),
  tag: z.string().optional(),
  publishedAtFrom: z.coerce.date().optional(),
  publishedAtTo: z.coerce.date().optional(),
})

export const postPayloadSchema = z.object({
  title: z
    .string()
    .trim()
    .min(1, 'Title is required')
    .max(100, 'Title must be at most 100 characters long'),
  content: z.string().trim().min(1, 'Content is required'),
  tags: z
    .array(z.string().trim().min(1))
    .refine((tags) => new Set(tags).size === tags.length, {
      message: 'Tags must not contain duplicates',
    })
    .default([]),
})

export type PostPayload = z.infer<typeof postPayloadSchema>
export type FindManyPostsOptions = z.infer<typeof findManyPostsSchema>
