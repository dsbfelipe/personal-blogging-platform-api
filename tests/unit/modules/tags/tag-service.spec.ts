import { beforeEach, describe, expect, test } from 'vitest'
import createTagRepositoryMock from '../../../mocks/create-tag-repository-mock'
import createTagService from '../../../../src/modules/tags/tag-service'
import { NotFoundError } from '../../../../src/errors/not-found-error'
import { tagFixture, tagFixturesArray } from '../../../fixtures/tag-fixture'

describe('tag-service', () => {
  let repository: ReturnType<typeof createTagRepositoryMock>
  let service: ReturnType<typeof createTagService>

  beforeEach(() => {
    repository = createTagRepositoryMock()
    service = createTagService(repository)
  })

  test('throws NotFoundError when tag does not exist', async () => {
    repository.findById.mockResolvedValue(null)

    const promise = service.findById(1)

    await expect(promise).rejects.toThrow(new NotFoundError('Tag not found'))
    expect(repository.findById).toHaveBeenCalledWith(1)
  })
  test('returns the tag when it exists', async () => {
    repository.findById.mockResolvedValue(tagFixture)

    const result = await service.findById(1)

    expect(result).toEqual(tagFixture)
    expect(repository.findById).toHaveBeenCalledWith(1)
  })
  test('returns all tags', async () => {
    repository.findMany.mockResolvedValue(tagFixturesArray)

    const result = await service.findMany()

    expect(result).toEqual(tagFixturesArray)
    expect(repository.findMany).toHaveBeenCalledOnce()
  })
  test('creates a tag through the repository', async () => {
    repository.create.mockResolvedValue(tagFixture)

    const result = await service.create({
      name: tagFixture.name,
    })

    expect(result).toEqual(tagFixture)
    expect(repository.create).toHaveBeenCalledWith({
      name: tagFixture.name,
    })
  })
  test('updates a tag through the repository', async () => {
    repository.update.mockResolvedValue(tagFixture)

    const result = await service.update(tagFixture.id, {
      name: tagFixture.name,
    })

    expect(result).toEqual(tagFixture)
    expect(repository.update).toHaveBeenCalledWith(tagFixture.id, {
      name: tagFixture.name,
    })
  })
  test('deletes a tag through the repository', async () => {
    repository.destroy.mockResolvedValue(undefined)

    const result = await service.destroy(tagFixture.id)

    expect(result).toBeUndefined()
    expect(repository.destroy).toHaveBeenCalledWith(tagFixture.id)
  })
})
