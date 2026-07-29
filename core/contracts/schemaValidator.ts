import Ajv from 'ajv';
import addFormats from 'ajv-formats';

const ajv = new Ajv({ allErrors: true });
addFormats(ajv);

export function validateSchema(schema: object, data: any) {
  const validate = ajv.compile(schema);
  const valid = validate(data);

  if (!valid && validate.errors) {
    const formattedErrors = validate.errors.map(err => {
      const field = err.instancePath || 'root';

      switch (err.keyword) {
        case 'required':
          return `❌ Falta propiedad requerida: ${(err.params as any).missingProperty}`;

        case 'additionalProperties':
          return `❌ Propiedad no permitida: ${(err.params as any).additionalProperty}`;

        case 'type':
          return `❌ Tipo inválido en ${field}. Esperado: ${(err.params as any).type}`;

        default:
          return `❌ ${field} ${err.message}`;
      }
    });

    throw new Error(`Contract validation failed:\n${formattedErrors.join('\n')}`);
  }
  
  return true;
}