import type { FastifyReply, FastifyRequest } from 'fastify'
import type { TagService } from './tag-service.js'
import { type TagParams, type TagPayload } from './tag-schemas.js'

type FindByIdRequest = FastifyRequest<{
  Params: TagParams
}>

type CreateTagRequest = FastifyRequest<{
  Body: TagPayload
}>

type UpdateTagRequest = FastifyRequest<{
  Params: TagParams
  Body: TagPayload
}>

const createTagController = (service: TagService) => {
  const findById = async (request: FindByIdRequest, reply: FastifyReply) => {
    const result = await service.findById(request.params.id)
    return reply.status(200).send(result)
  }

  const findMany = async (_request: FastifyRequest, reply: FastifyReply) => {
    const result = await service.findMany()
    return reply.status(200).send(result)
  }

  const create = async (request: CreateTagRequest, reply: FastifyReply) => {
    const result = await service.create(request.body)
    return reply.status(201).send(result)
  }

  const update = async (request: UpdateTagRequest, reply: FastifyReply) => {
    const result = await service.update(request.params.id, request.body)
    return reply.status(200).send(result)
  }

  const destroy = async (request: FindByIdRequest, reply: FastifyReply) => {
    await service.destroy(request.params.id)
    return reply.status(204).send()
  }

  return {
    findById,
    findMany,
    create,
    update,
    destroy,
  }
}

export type TagController = ReturnType<typeof createTagController>
export default createTagController
