export const activateEmailSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    success: { type: 'boolean' },
    code: { type: 'number' },
    userError: { type: 'string' },
    exceptionMessage: { type: 'string' },
    response: {
      type: 'array',
      items: {
        type: 'object',
        additionalProperties: false,
        properties: {
          id: { type: 'number' },
          validationCode: { type: 'string' },
          creationDate: { type: 'string' },
          updateDate: { type: 'string' },
          email: { type: 'string' },
          channel: { type: 'string' }
        },
        required: [
          'id',
          'validationCode',
          'creationDate',
          'updateDate',
          'email',
          'channel'
        ]
      }
    }
  },
  required: ['success', 'code', 'userError', 'exceptionMessage', 'response']
};