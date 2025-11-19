import type { FastifyPluginCallback } from 'fastify'
import { createUser } from '../../../controllers/admin/userController'

const createUserRoute: FastifyPluginCallback = (app, _opts, done) => {
  app.post('/', {
    schema: {
      body: {
        type: 'object',
        required: ['name', 'email'],
        additionalProperties: false,
        properties: {
          name: { type: 'string', minLength: 1 },
          email: { type: 'string', minLength: 3 }
        }
      }
    }
  }, createUser)
  done()
}

export default createUserRoute