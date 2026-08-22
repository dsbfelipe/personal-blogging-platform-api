import type { Prisma } from '../../../../generated/prisma/client'

export const filterBySearch = (search?: string): Prisma.PostWhereInput => {
  if (!search) {
    return {}
  }

  return {
    title: {
      contains: search,
      mode: 'insensitive',
    },
  }
}
