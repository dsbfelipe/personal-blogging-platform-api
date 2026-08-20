import Fastify, { type FastifyPluginAsync } from 'fastify'
import { errorHandler } from '../../src/errors/error-handler.js'
import {
  serializerCompiler,
  validatorCompiler,
} from '@fastify/type-provider-zod'

const createTestServer = async (...plugins: FastifyPluginAsync[]) => {
  const server = Fastify({
    logger: false,
  })
  server.setErrorHandler(errorHandler)

  server.setValidatorCompiler(validatorCompiler)
  server.setSerializerCompiler(serializerCompiler)

  for (const plugin of plugins) {
    await server.register(plugin)
  }

  await server.ready()
  return server
}

export default createTestServer
