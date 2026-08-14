import fp from 'fastify-plugin'
import { PrismaPg } from '@prisma/adapter-pg'
import { PrismaClient } from '../../generated/prisma/client'
import { environment } from '../config/environment'
import type { FastifyPluginAsync } from 'fastify'

declare module 'fastify' {
  interface FastifyInstance {
    prisma: PrismaClient
  }
}

const prismaPlugin: FastifyPluginAsync = fp(async (server) => {
  const prisma = new PrismaClient({
    adapter: new PrismaPg({
      connectionString: environment.DATABASE_URL,
    }),
  })
  await prisma.$connect()
  server.decorate('prisma', prisma)
  server.addHook('onClose', async (server) => {
    await server.prisma.$disconnect()
  })
})

export default prismaPlugin
