import type { Prisma, PrismaClient } from '../../../generated/prisma/client'
import handlePrismaError from '../../helpers/handle-prisma-error'
import { filterByPublishedAt, filterBySearch, filterByTag } from './filters'
import type { FindManyPostsOptions } from './post-schemas'

type CreatePostData = {
  title: string
  content: string
  tagIds: number[]
}

type UpdatePostData = {
  title?: string
  content?: string
}

const createPostRepository = (prisma: PrismaClient) => {
  const findById = (id: number) =>
    prisma.post.findUnique({
      where: { id },
    })

  const findMany = (options: FindManyPostsOptions) => {
    const { page, limit, search, tag, publishedAtFrom, publishedAtTo } = options

    const where: Prisma.PostWhereInput = {
      ...filterByTag(tag),
      ...filterByPublishedAt(publishedAtFrom, publishedAtTo),
      ...filterBySearch(search),
    }

    return prisma.post.findMany({
      skip: (page - 1) * limit,
      take: limit,
      where,
      orderBy: {
        published_at: 'desc',
      },
    })
  }

  const create = (data: CreatePostData) => {
    return prisma.$transaction(async (tx) => {
      const createdPost = await tx.post.create({
        data: {
          title: data.title,
          content: data.content,
        },
      })
      await tx.tagsOnPosts.createMany({
        data: data.tagIds.map((tagId) => ({
          postId: createdPost.id,
          tagId,
        })),
      })
      return createdPost
    })
  }

  const updatePostFields = async (id: number, data: UpdatePostData) => {
    try {
      return await prisma.post.update({
        where: { id },
        data,
      })
    } catch (error) {
      handlePrismaError(error, {
        notFound: 'Post not found',
      })
    }
  }

  const updatePostTags = async (id: number, tagIds: number[]) => {
    try {
      return await prisma.$transaction(async (tx) => {
        await tx.post.findUniqueOrThrow({
          where: { id },
        })
        await tx.tagsOnPosts.deleteMany({
          where: {
            postId: id,
          },
        })
        await tx.tagsOnPosts.createMany({
          data: tagIds.map((tagId) => ({
            postId: id,
            tagId,
          })),
        })
      })
    } catch (error) {
      handlePrismaError(error, {
        notFound: 'Post not found',
      })
    }
  }

  const destroy = async (id: number) => {
    try {
      return await prisma.post.delete({
        where: { id },
      })
    } catch (error) {
      handlePrismaError(error, {
        notFound: 'Post not found',
      })
    }
  }

  return {
    findById,
    findMany,
    create,
    updatePostFields,
    updatePostTags,
    destroy,
  }
}

export default createPostRepository
