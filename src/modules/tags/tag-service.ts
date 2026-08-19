import { NotFoundError } from '../../errors/not-found-error.js'
import { withPrismaErrorHandling } from '../../helpers/prisma/with-prisma-error-handling.js'
import type { TagRepository } from './tag-repository.js'
import type { TagPayload } from './tag-schemas.js'

const createTagService = (repository: TagRepository) => {
  const findById = (id: number) => {
    const result = repository.findById(id)
    if (!result) {
      throw new NotFoundError('Tag not found')
    }
    return result
  }

  const findMany = () => repository.findMany()

  const create = (body: TagPayload) =>
    withPrismaErrorHandling(() => repository.create(body), {
      conflict: 'A tag with this name already exists',
    })

  const update = (id: number, body: TagPayload) =>
    withPrismaErrorHandling(() => repository.update(id, body), {
      conflict: 'A tag with this name already exists',
      notFound: 'Tag not found',
    })

  const destroy = (id: number) =>
    withPrismaErrorHandling(() => repository.destroy(id), {
      notFound: 'Tag not found',
    })

  return {
    findById,
    findMany,
    create,
    update,
    destroy,
  }
}

export type TagService = ReturnType<typeof createTagService>
export default createTagService
