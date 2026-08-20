import type { ZodTypeProvider } from '@fastify/type-provider-zod'
import type { FastifyPluginAsync } from 'fastify'
import type { TagController } from './tag-controller.js'
import { tagParamsSchema, tagPayloadSchema, tagSchema } from './tag-schemas.js'
import { errorSchema } from '../../errors/error-schema.js'
import { z } from 'zod'

type TagRouteOptions = {
  controller: TagController
}

const tagRoutes: FastifyPluginAsync<TagRouteOptions> = async (server, opts) => {
  const fastify = server.withTypeProvider<ZodTypeProvider>()

  fastify.get('/tags/:id', {
    schema: {
      params: tagParamsSchema,
      response: {
        200: tagSchema,
        default: errorSchema,
      },
    },
    handler: opts.controller.findById,
  })

  fastify.get('/tags', {
    schema: {
      response: {
        200: z.array(tagSchema),
        default: errorSchema,
      },
    },
    handler: opts.controller.findMany,
  })

  fastify.post('/tags', {
    schema: {
      body: tagPayloadSchema,
      response: {
        201: tagSchema,
        default: errorSchema,
      },
    },
    handler: opts.controller.create,
  })

  fastify.patch('/tags/:id', {
    schema: {
      params: tagParamsSchema,
      body: tagPayloadSchema,
      response: {
        200: tagSchema,
        default: errorSchema,
      },
    },
    handler: opts.controller.update,
  })

  fastify.delete('/tags/:id', {
    schema: {
      params: tagParamsSchema,
      response: {
        204: z.void(),
        default: errorSchema,
      },
    },
    handler: opts.controller.destroy,
  })
}

export default tagRoutes
