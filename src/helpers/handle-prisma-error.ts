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
  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2002'
  ) {
    throw new ConflictError(messages.conflict ?? 'Resource already exists')
  }

  if (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  ) {
    throw new NotFoundError(messages.notFound ?? 'Resource not found')
  }

  throw error
}

export default handlePrismaError
