import type { ZodTypeProvider } from '@fastify/type-provider-zod'
import type { FastifyPluginAsync } from 'fastify'
import z from 'zod'

const postRoutes: FastifyPluginAsync = async (server) => {
  server.withTypeProvider<ZodTypeProvider>().get(
    '/posts/id',
    {
      schema: {
        params: z.object({
          id: z.coerce.number(),
        }),
      },
    },
    async (request) => {
      const { id } = request.params

      return {
        id,
      }
    },
  )
}

export default postRoutes
