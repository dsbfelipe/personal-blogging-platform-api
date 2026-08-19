import { ConflictError } from '../../errors/conflict-error.js'
import { NotFoundError } from '../../errors/not-found-error.js'
import isRecordNotFoundError from './is-record-not-found-error.js'
import isUniqueConstraintError from './is-unique-constraint-error.js'

type PrismaErrorMessages = {
  conflict?: string
  notFound?: string
}

export const withPrismaErrorHandling = async <T>(
  operation: () => Promise<T>,
  messages: PrismaErrorMessages,
): Promise<T> => {
  try {
    return await operation()
  } catch (error) {
    if (isUniqueConstraintError(error)) {
      throw new ConflictError(messages.conflict ?? 'Resource already exists')
    }
    if (isRecordNotFoundError(error)) {
      throw new NotFoundError(messages.notFound ?? 'Resource not found')
    }
    throw error
  }
}
