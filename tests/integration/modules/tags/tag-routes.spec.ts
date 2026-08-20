import { afterAll, beforeEach, describe, expect, test } from 'vitest'
import tagsModule from '../../../../src/modules/tags'
import prismaPlugin from '../../../../src/plugins/prisma'
import createTestServer from '../../../helpers/create-test-server'

const server = await createTestServer(prismaPlugin, tagsModule)

beforeEach(async () => {
  await server.prisma.tag.deleteMany()
})

afterAll(async () => {
  await server.close()
})

describe('tag-routes', () => {
  test('creates a tag', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/tags',
      payload: {
        name: 'tag_name',
      },
    })
    expect(response.statusCode).toBe(201)
    expect(response.json()).toMatchObject({
      name: 'tag_name',
    })

    const tag = await server.prisma.tag.findUnique({
      where: {
        name: 'tag_name',
      },
    })
    expect(tag).not.toBeNull()
  })
  test('returns a tag', async () => {
    const tag = await server.prisma.tag.create({
      data: {
        name: 'tag_name',
      },
    })

    const response = await server.inject({
      method: 'GET',
      url: `/tags/${tag.id}`,
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      id: tag.id,
      name: tag.name,
    })
  })
  test('returns all tags', async () => {
    await server.prisma.tag.create({
      data: {
        name: 'tag_name',
      },
    })

    const response = await server.inject({
      method: 'GET',
      url: '/tags',
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toHaveLength(1)
  })
  test('updates a tag', async () => {
    const tag = await server.prisma.tag.create({
      data: {
        name: 'tag_name',
      },
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/tags/${tag.id}`,
      payload: {
        name: 'tag_new_name',
      },
    })

    expect(response.statusCode).toBe(200)
    expect(response.json()).toEqual({
      id: tag.id,
      name: 'tag_new_name',
    })
  })
  test('deletes a tag', async () => {
    const tag = await server.prisma.tag.create({
      data: {
        name: 'tag_name',
      },
    })

    const response = await server.inject({
      method: 'DELETE',
      url: `/tags/${tag.id}`,
    })

    expect(response.statusCode).toBe(204)
    expect(response.body).toBe('')
  })
  test('returns 400 when creating a tag with >100 characters', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/tags',
      payload: {
        name: 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLM',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toEqual({
      message: 'Invalid request',
      details: [
        {
          field: '/name',
          message: 'Name must be at most 100 characters long',
        },
      ],
    })
  })
  test('returns 400 when creating a tag with <1 characters', async () => {
    const response = await server.inject({
      method: 'POST',
      url: '/tags',
      payload: {
        name: '',
      },
    })

    expect(response.statusCode).toBe(400)
    expect(response.json()).toEqual({
      message: 'Invalid request',
      details: [
        {
          field: '/name',
          message: 'Name is required',
        },
      ],
    })
  })
  test('returns 404 when getting a missing tag', async () => {
    const response = await server.inject({
      method: 'GET',
      url: '/tags/999',
    })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({
      message: 'Tag not found',
    })
  })
  test('returns 404 when updating a missing tag', async () => {
    const response = await server.inject({
      method: 'PATCH',
      url: '/tags/999',
      payload: {
        name: 'tag_new_name',
      },
    })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({
      message: 'Tag not found',
    })
  })
  test('returns 404 when deleting a missing tag', async () => {
    const response = await server.inject({
      method: 'DELETE',
      url: '/tags/999',
    })

    expect(response.statusCode).toBe(404)
    expect(response.json()).toEqual({
      message: 'Tag not found',
    })
  })
  test('returns 409 when creating a duplicated tag', async () => {
    await server.prisma.tag.create({
      data: {
        name: 'tag_name',
      },
    })

    const response = await server.inject({
      method: 'POST',
      url: '/tags',
      payload: {
        name: 'tag_name',
      },
    })

    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual({
      message: 'A tag with this name already exists',
    })
  })
  test('returns 409 when updating a tag with an already existing name', async () => {
    await server.prisma.tag.create({
      data: {
        name: 'tag_name_1',
      },
    })
    const tag2 = await server.prisma.tag.create({
      data: {
        name: 'tag_name_2',
      },
    })

    const response = await server.inject({
      method: 'PATCH',
      url: `/tags/${tag2.id}`,
      payload: {
        name: 'tag_name_1',
      },
    })

    expect(response.statusCode).toBe(409)
    expect(response.json()).toEqual({
      message: 'A tag with this name already exists',
    })
  })
})
