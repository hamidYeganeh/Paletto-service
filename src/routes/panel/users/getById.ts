import type { FastifyPluginCallback } from 'fastify'
import { getUser } from '../../../controllers/admin/userController'

const getUserRoute: FastifyPluginCallback = (app, _opts, done) => {
  app.get('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }
        }
      }
    }
  }, getUser)
  done()
}

export default getUserRoute