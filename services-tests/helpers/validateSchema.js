import Ajv from 'ajv';

const ajv = new Ajv({ allErrors: true });

export function validateSchema(schema, data) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid) {
    console.error('Schema validation errors:', validate.errors);
  }

  return valid;
}