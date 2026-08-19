import type { PrismaClient } from '../../../generated/prisma/client'
import type { TagPayload } from './tag-schemas.js'

const createTagRepository = (prisma: PrismaClient) => {
  const findById = (id: number) =>
    prisma.tag.findUnique({
      where: { id },
    })

  const findMany = () => prisma.tag.findMany()

  const create = (body: TagPayload) =>
    prisma.tag.create({
      data: {
        name: body.name,
      },
    })

  const update = (id: number, body: TagPayload) =>
    prisma.tag.update({
      where: {
        id: id,
      },
      data: {
        name: body.name,
      },
    })

  const destroy = (id: number) =>
    prisma.tag.delete({
      where: {
        id: id,
      },
    })

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
