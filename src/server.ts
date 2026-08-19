import Fastify from 'fastify'
import {
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod'
import prismaPlugin from './plugins/prisma.js'
import { environment } from './config/environment.js'
import { errorHandler } from './errors/error-handler.js'
import tagsModule from './modules/tags/index.js'

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
  fastify.setErrorHandler(errorHandler)

  fastify.setValidatorCompiler(validatorCompiler)
  fastify.setSerializerCompiler(serializerCompiler)

  fastify.register(prismaPlugin)
  fastify.register(tagsModule)

  return fastify
}

export default createServer
