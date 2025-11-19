import type { FastifyPluginCallback } from 'fastify'
import { updateUser } from '../../../controllers/admin/userController'

const updateUserRoute: FastifyPluginCallback = (app, _opts, done) => {
  app.put('/:id', {
    schema: {
      params: {
        type: 'object',
        required: ['id'],
        properties: {
          id: { type: 'string', pattern: '^[a-fA-F0-9]{24}$' }
        }
      },
      body: {
        type: 'object',
        additionalProperties: false,
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', minLength: 3 }
        },
        minProperties: 1
      }
    }
  }, updateUser)
  done()
}

export default updateUserRoute