export const nipSchema = {
  type: 'object',
  additionalProperties: false,
  properties: {
    code: { type: 'number' },
    userError: { type: 'string' },
    exceptionMessage: { type: 'string' },
    success: { type: 'boolean' },
    response: {
      type: 'object',
      additionalProperties: false,
      properties: {
        shippingChannel: { type: 'string' },
        operatorPhone: { type: 'string' },
        api: { type: 'string' }
      },
      required: ['shippingChannel', 'operatorPhone', 'api']
    }
  },
  required: ['code', 'userError', 'exceptionMessage', 'success', 'response']
};