import { vi } from 'vitest'

const createTagRepositoryMock = () => ({
  findById: vi.fn(),
  findMany: vi.fn(),
  create: vi.fn(),
  update: vi.fn(),
  destroy: vi.fn(),
})

export default createTagRepositoryMock
