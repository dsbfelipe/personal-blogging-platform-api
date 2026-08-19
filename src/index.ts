import createServer from './server.js'
import { environment } from './config/environment.js'

const server = createServer()

const closeServer = async (signal: string) => {
  server.log.info(`Received ${signal}, closing server`)
  try {
    await server.close()
    process.exit(0)
  } catch (error) {
    server.log.error(error)
    process.exit(1)
  }
}
process.on('SIGINT', () => closeServer('SIGINT'))
process.on('SIGTERM', () => closeServer('SIGTERM'))

server.listen({ port: environment.PORT }, function (error) {
  if (error) {
    server.log.error(error)
    process.exit(1)
  }
})
