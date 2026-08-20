import type { PrismaClient } from '../../../generated/prisma/client'
import handlePrismaError from '../../helpers/handle-prisma-error.js'
import type { TagPayload } from './tag-schemas.js'

const createTagRepository = (prisma: PrismaClient) => {
  const findById = (id: number) =>
    prisma.tag.findUnique({
      where: { id },
    })

  const findMany = () => prisma.tag.findMany()

  const create = async (body: TagPayload) => {
    try {
      return await prisma.tag.create({
        data: {
          name: body.name,
        },
      })
    } catch (error) {
      handlePrismaError(error, {
        conflict: 'A tag with this name already exists',
      })
    }
  }

  const update = async (id: number, body: TagPayload) => {
    try {
      return await prisma.tag.update({
        where: {
          id: id,
        },
        data: {
          name: body.name,
        },
      })
    } catch (error) {
      handlePrismaError(error, {
        conflict: 'A tag with this name already exists',
        notFound: 'Tag not found',
      })
    }
  }

  const destroy = async (id: number) => {
    try {
      await prisma.tag.delete({
        where: {
          id: id,
        },
      })
    } catch (error) {
      handlePrismaError(error, {
        notFound: 'Tag not found',
      })
    }
  }

  return {
    findById,
    findMany,
    create,
    update,
    destroy,
  }
}

export type TagRepository = ReturnType<typeof createTagRepository>
export default createTagRepository
