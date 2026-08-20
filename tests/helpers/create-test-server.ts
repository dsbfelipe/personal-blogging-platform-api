import Fastify, { type FastifyPluginAsync } from 'fastify'

const createTestServer = async (...plugins: FastifyPluginAsync[]) => {
  const server = Fastify({
    logger: false,
  })

  for (const plugin of plugins) {
    await server.register(plugin)
  }

  await server.ready()
  return server
}

export default createTestServer
