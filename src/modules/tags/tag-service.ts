import { NotFoundError } from '../../errors/not-found-error.js'
import type { TagRepository } from './tag-repository.js'
import type { TagPayload } from './tag-schemas.js'

const createTagService = (repository: TagRepository) => {
  const findById = async (id: number) => {
    const result = await repository.findById(id)
    if (!result) {
      throw new NotFoundError('Tag not found')
    }
    return result
  }
  const findMany = () => repository.findMany()
  const create = (body: TagPayload) => repository.create(body)
  const update = (id: number, body: TagPayload) => repository.update(id, body)
  const destroy = (id: number) => repository.destroy(id)

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
