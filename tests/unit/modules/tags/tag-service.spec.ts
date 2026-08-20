import { beforeEach, describe, expect, test } from 'vitest'
import createTagRepositoryMock from '../../../mocks/create-tag-repository-mock'
import createTagService from '../../../../src/modules/tags/tag-service'
import { NotFoundError } from '../../../../src/errors/not-found-error'
import tagFixture from '../../../fixtures/tag-fixture'

describe('tag-service', () => {
  let repository: ReturnType<typeof createTagRepositoryMock>
  let service: ReturnType<typeof createTagService>

  beforeEach(() => {
    repository = createTagRepositoryMock()
    service = createTagService(repository)
  })

  test('throws NotFoundError when tag does not exist', async () => {
    repository.findById.mockResolvedValue(null)
    await expect(service.findById(1)).rejects.toThrow(
      new NotFoundError('Tag not found'),
    )
    expect(repository.findById).toHaveBeenCalledWith(1)
  })

  test('returns the tag when it exists', async () => {
    repository.findById.mockResolvedValue(tagFixture)
    await expect(service.findById(1)).resolves.toEqual(tagFixture)
  })

  test('creates a tag through the repository', async () => {
    repository.create.mockResolvedValue(tagFixture)
    await expect(service.create({ name: tagFixture.name })).resolves.toEqual(
      tagFixture,
    )
    expect(repository.create).toHaveBeenCalledWith({
      name: tagFixture.name,
    })
  })
})
