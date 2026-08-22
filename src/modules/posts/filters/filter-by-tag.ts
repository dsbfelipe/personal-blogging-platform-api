import type { Prisma } from '../../../../generated/prisma/client'

export const filterByTag = (tag?: string): Prisma.PostWhereInput => {
  if (!tag) {
    return {}
  }

  return {
    tags: {
      some: {
        tag: {
          name: tag,
        },
      },
    },
  }
}
