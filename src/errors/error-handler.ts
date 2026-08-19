import type { FastifyError, FastifyReply, FastifyRequest } from 'fastify'
import { NotFoundError } from './not-found-error.js'
import { ConflictError } from './conflict-error.js'

export const errorHandler = (
  error: FastifyError,
  request: FastifyRequest,
  reply: FastifyReply,
) => {
  if (error.validation) {
    return reply.status(400).send({
      message: 'Invalid request',
      details: error.validation.map((validationError) => ({
        field:
          validationError.instancePath ||
          validationError.params?.missingProperty,
        message: validationError.message,
      })),
    })
  }

  if (error instanceof NotFoundError || error.statusCode === 404) {
    return reply.status(404).send({
      message: error.message || 'Resource not found',
    })
  }

  if (error instanceof ConflictError) {
    return reply.status(409).send({
      message: error.message,
    })
  }

  request.log.error(error)

  return reply.status(500).send({
    message: 'Internal server error',
  })
}
