// services-tests/schemas/member.activate-email.schema.js
export const activateEmailSchema = {
  type: 'object',
  properties: {
    success: { type: 'boolean' },
    message: { type: 'string' },
    data: {
      type: 'object',
      properties: {
        activationCode: { type: 'string' }
      },
      required: ['activationCode']
    }
  },
  required: ['success', 'message', 'data']
};
