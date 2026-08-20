import { test, expect, afterAll } from 'vitest'
import createTestServer from '../../helpers/create-test-server.js'
import healthRoutes from '../../../src/routes/health-routes.js'

const server = await createTestServer(healthRoutes)

afterAll(async () => {
  await server.close()
})

test('GET /health should return status OK', async () => {
  const response = await server.inject({
    method: 'GET',
    url: '/health',
  })

  expect(response.statusCode).toBe(200)
  expect(response.json()).toEqual({ status: 'ok' })
})
