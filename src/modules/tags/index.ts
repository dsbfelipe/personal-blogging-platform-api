import type { FastifyPluginAsync } from 'fastify'

import createTagRepository from './tag-repository.js'
import createTagService from './tag-service.js'
import createTagController from './tag-controller.js'
import tagRoutes from './tag-routes.js'

const tagsModule: FastifyPluginAsync = async (fastify) => {
  const repository = createTagRepository(fastify.prisma)
  const service = createTagService(repository)
  const controller = createTagController(service)

  await fastify.register(tagRoutes, {
    controller,
  })
}

export default tagsModule
