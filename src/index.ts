import Fastify from 'fastify';
import { environment } from './config/environment.js';

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
  test: false
};

const fastify = Fastify({
  logger: envToLogger[environment.NODE_ENV] ?? true,
});

fastify.listen({ port: environment.PORT }, function (err) {
  if (err) {
    fastify.log.error(err);
    process.exit(1)
  }
});