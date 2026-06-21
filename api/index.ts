import { router } from '../app/router.ts'

export const config = { runtime: 'nodejs22.x' }

export default (request: Request) => router.fetch(request)
