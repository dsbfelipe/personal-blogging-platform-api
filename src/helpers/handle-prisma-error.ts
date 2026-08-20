import { Prisma } from '../../generated/prisma/client'
import { ConflictError } from '../errors/conflict-error.js'
import { NotFoundError } from '../errors/not-found-error.js'

type PrismaErrorMessages = {
  conflict?: string
  notFound?: string
}

const handlePrismaError = (
  error: unknown,
  messages: PrismaErrorMessages = {},
): never => {
  if (!(error instanceof Prisma.PrismaClientKnownRequestError)) {
    throw error
  }

  switch (error.code) {
    case 'P2002':
      throw new ConflictError(messages.conflict ?? 'Resource already exists')
    case 'P2025':
      throw new NotFoundError(messages.notFound ?? 'Resource not found')
    default:
      throw error
  }
}

export default handlePrismaError
