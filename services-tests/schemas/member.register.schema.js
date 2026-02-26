
// services-tests/schemas/member.register.schema.js
export const registerSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        userId: { type: 'string' },
        username: { type: 'string' },
        email: { type: 'string' }
      },
      required: ['userId', 'username', 'email']
    }
  },
  required: ['success', 'message', 'data']
};
