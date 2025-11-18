import type { FastifyPluginCallback } from 'fastify'
import { createUser, getUser, updateUser, deleteUser } from '../../controllers/admin/userController'

const panelUsersRoutes: FastifyPluginCallback = (app, _opts, done) => {
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

export default panelUsersRoutes