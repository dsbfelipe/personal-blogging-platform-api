import { z } from 'zod'

process.loadEnvFile(process.env.NODE_ENV === 'test' ? '.env.test' : '.env')

const envSchema = z.object({
  NODE_ENV: z.enum(['development', 'production', 'test']),
  PORT: z.coerce.number().default(3000),
  POSTGRES_USER: z.string(),
  POSTGRES_PASSWORD: z.string(),
  POSTGRES_DB: z.string(),
  DATABASE_URL: z.string(),
})

export const environment = envSchema.parse(process.env)
export type Environment = z.infer<typeof envSchema>
