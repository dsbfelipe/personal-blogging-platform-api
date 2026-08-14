import Fastify from 'fastify'
import prismaPlugin from './plugins/prisma.js'
import { environment } from './config/environment.js'

const envToLogger = {
  development: {
    transport: {
      target: 'pino-pretty',
      options: {
        translateTime: 'HH:MM:ss Z',
        ignore: 'pid,hostname',
      },
    },
  },
  production: true,
  test: false,
}

const createServer = () => {
  const fastify = Fastify({
    logger: envToLogger[environment.NODE_ENV] ?? true,
  })

  fastify.register(prismaPlugin)

  return fastify
}

export default createServer
