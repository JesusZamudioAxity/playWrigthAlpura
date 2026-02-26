// services-tests/schemas/member.check-nip.schema.js
export const checkNipSchema = {
  type: 'object',
  properties: {
    code: { type: 'number' },
    userError: { type: 'string' },
    exceptionMessage: { type: 'string' },
    success: { type: 'boolean' },
    response: { type: 'string' }
  },
  required: ['code', 'userError', 'exceptionMessage', 'success', 'response']
};
