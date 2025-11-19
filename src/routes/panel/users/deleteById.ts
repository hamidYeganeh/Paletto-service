import type { FastifyPluginCallback } from 'fastify'
import { deleteUser } from '../../../controllers/admin/userController'

const deleteUserRoute: FastifyPluginCallback = (app, _opts, done) => {
  app.delete('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }
        }
      }
    }
  }, deleteUser)
  done()
}

export default deleteUserRoute