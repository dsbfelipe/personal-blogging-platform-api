import { Prisma } from '../../../generated/prisma/client'

const isRecordNotFoundError = (
  error: unknown,
): error is Prisma.PrismaClientKnownRequestError => {
  return (
    error instanceof Prisma.PrismaClientKnownRequestError &&
    error.code === 'P2025'
  )
}

export default isRecordNotFoundError
