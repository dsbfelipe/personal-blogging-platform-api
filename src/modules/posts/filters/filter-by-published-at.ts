import type { Prisma } from '../../../../generated/prisma/client'

export const filterByPublishedAt = (
  from?: Date,
  to?: Date,
): Prisma.PostWhereInput => {
  if (!from && !to) {
    return {}
  }

  return {
    published_at: {
      ...(from && { gte: from }),
      ...(to && { lte: to }),
    },
  }
}
