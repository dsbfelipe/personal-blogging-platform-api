import createServer from './server.js'
import { environment } from './config/environment.js'

const server = createServer()

server.listen({ port: environment.PORT }, function (err) {
  if (err) {
    server.log.error(err)
    process.exit(1)
  }
})
