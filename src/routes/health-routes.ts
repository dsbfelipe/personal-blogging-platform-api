import type { FastifyPluginAsync } from 'fastify'

const healthRoutes: FastifyPluginAsync = async (server) => {
  server.get('/health', async () => ({
    status: 'ok',
  }))
}

export default healthRoutes
