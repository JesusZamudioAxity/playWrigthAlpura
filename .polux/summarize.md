This file is a merged representation of a subset of the codebase, containing files not matching ignore patterns, combined into a single document by Repomix.
The content has been processed where comments have been removed, empty lines have been removed, content has been compressed (code blocks are separated by ⋮---- delimiter).

# File Summary

## Purpose
This file contains a packed representation of a subset of the repository's contents that is considered the most important context.
It is designed to be easily consumable by AI systems for analysis, code review,
or other automated processes.

## File Format
The content is organized as follows:
1. This summary section
2. Repository information
3. Directory structure
4. Repository files (if enabled)
5. Multiple file entries, each consisting of:
  a. A header with the file path (## File: path/to/file)
  b. The full contents of the file in a code block

## Usage Guidelines
- This file should be treated as read-only. Any changes should be made to the
  original repository files, not this packed version.
- When processing this file, use the file path to distinguish
  between different files in the repository.
- Be aware that this file may contain sensitive information. Handle it with
  the same level of security as you would the original repository.

## Notes
- Some files may have been excluded based on .gitignore rules and Repomix's configuration
- Binary files are not included in this packed representation. Please refer to the Repository Structure section for a complete list of file paths, including binary files
- Files matching these patterns are excluded: **/.polux/**
- Files matching patterns in .gitignore are excluded
- Files matching default ignore patterns are excluded
- Code comments have been removed from supported file types
- Empty lines have been removed from all files
- Content has been compressed - code blocks are separated by ⋮---- delimiter
- Long base64 data strings (e.g., data:image/png;base64,...) have been truncated to reduce token count
- Files are sorted by Git change count (files with more changes are at the bottom)

# Directory Structure
```
.gitignore
package.json
playwright.config.js
README.md
services-tests/catalogs/contracts/catalogs.contract.spec.js
services-tests/catalogs/regression/catalogs.regression.spec.js
services-tests/catalogs/smoke/catalogs.moke.spec.js
services-tests/core/api.client.js
services-tests/fixtures/api.fixture.js
services-tests/helpers/auth.manager.js
services-tests/helpers/member.flow.js
services-tests/helpers/validateSchema.js
services-tests/member/contracts/member.activate-email.contract.spec.js
services-tests/member/contracts/member.check-nip.contract.spec.js
services-tests/member/contracts/member.nip.contract.spec.js
services-tests/member/contracts/member.register.contract.spec.js
services-tests/member/integration/member.full-registration.integration.spec.js
services-tests/member/regression/member.activate-email.regression.spec.js
services-tests/member/regression/member.check-nip.regression.spec.js
services-tests/member/regression/member.nip.regression.spec.js
services-tests/member/regression/member.register.regression.spec.js
services-tests/member/regression/member.registerpass.regression.spec.js
services-tests/member/smoke/auth.smoke.spec.js
services-tests/member/smoke/member.activate-email.smoke.spec.js
services-tests/member/smoke/member.check-nip.smoke.spec.js
services-tests/member/smoke/member.nip.smoke.spec.js
services-tests/schemas/catalogs.schema.js
services-tests/schemas/member.activate-email.schema.js
services-tests/schemas/member.check-nip.schema.js
services-tests/schemas/member.nip.schema.js
services-tests/schemas/member.register.schema.js
ui-tests/tests/login/login.spec.js
```

# Files

## File: services-tests/member/regression/member.registerpass.regression.spec.js
```javascript
test('Register - válido', async ({ apiClient }) => {
const payloads = buildRegistrationFlowPayload();
⋮----
await generateNip(apiClient, payloads.nip, expect);
await checkNip(apiClient, payloads.checkNip, expect);
const response = await registerAttempt(apiClient, payloads.register, expect, 200);
expect(response.status()).toBe(200);
const body = await response.json();
console.log('Response Body:', body);
expect(body.success).toBe(true);
expect(body.code).toBe(200);
expect(body.userError).toBe('');
expect(body.exceptionMessage).toBe('');
expect(body.response).toBe('Código enviado');
expect(body.message).toBeNull();
⋮----
console.error('Error during registration flow:', error);
⋮----
function buildRegistrationFlowPayload() {
⋮----
async function registerAttempt(apiClient, payload, expect, expectedStatus) {
⋮----
const response = await apiClient.post('/api/identity/register-attempt', payload);
if (response.status() !== expectedStatus) {
console.error('Failed to register attempt:', await response.text());
throw new Error('Failed to register attempt');
⋮----
console.log('Register Attempt Response Body:', body);
expect(body.success).toBe(expectedStatus === 200);
⋮----
console.error('Error during register attempt:', error);
```

## File: .gitignore
```
node_modules/
.env
playwright-report/
test-results/
```

## File: services-tests/catalogs/contracts/catalogs.contract.spec.js
```javascript
test('Contract - Validar contrato base de catalogs', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
const body = await response.json();
const valid = validateSchema(catalogsSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/catalogs/regression/catalogs.regression.spec.js
```javascript
test('Regression - Validar estructura interna de catalogs', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.response.length).toBeGreaterThan(0);
⋮----
expect(typeof item.id).toBe('number');
expect(typeof item.channel_id).toBe('number');
expect(typeof item.channel).toBe('string');
expect(typeof item.type).toBe('string');
expect(typeof item.exposed).toBe('string');
```

## File: services-tests/catalogs/smoke/catalogs.moke.spec.js
```javascript
test('Smoke - Obtener catalogs correctamente', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.success).toBe(true);
```

## File: services-tests/helpers/validateSchema.js
```javascript
const ajv = new Ajv({ allErrors: true });
export function validateSchema(schema, data) {
const validate = ajv.compile(schema);
const valid = validate(data);
⋮----
console.error('Schema validation errors:', validate.errors);
```

## File: services-tests/member/contracts/member.activate-email.contract.spec.js
```javascript
test('Contract - Validar contrato de respuesta de activación de email', async ({ apiClient }) => {
const response = await apiClient.get('/api/support/client/activation-code/testnuevoregistro@test.com', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
const valid = validateSchema(activateEmailSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/member/contracts/member.check-nip.contract.spec.js
```javascript
test('Contract - Validar contrato de respuesta de Check NIP', async ({ apiClient }) => {
const response = await apiClient.post('/api/support/recovery/nip', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
const valid = validateSchema(checkNipSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/member/contracts/member.nip.contract.spec.js
```javascript
test('Contract - Validar contrato de respuesta de NIP', async ({ apiClient }) => {
const response = await apiClient.post('/api/outsider/register/sms/nip', {
⋮----
const status = response.status();
const headers = response.headers();
const raw = await response.text();
console.log('Status:', status);
console.log('Headers:', headers);
console.log('Raw response:', raw);
expect(status).toBe(200);
const body = JSON.parse(raw);
const valid = validateSchema(nipSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/member/contracts/member.register.contract.spec.js
```javascript
test('Contract - Validar contrato de respuesta de registro', async ({ apiClient }) => {
const response = await apiClient.post('/api/identity/register-attempt', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
const valid = validateSchema(registerSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/member/regression/member.check-nip.regression.spec.js
```javascript
test('Regression - Verificar NIP con diferentes escenarios', async ({ apiClient }) => {
⋮----
const response = await apiClient.post('/api/support/recovery/nip', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.success).toBe(true);
expect(body.code).toBe(200);
expect(body.exceptionMessage).toBe('');
expect(typeof body.response).toBe('string');
expect(body.response).toMatch(/^\d{4}$/);
```

## File: services-tests/member/regression/member.nip.regression.spec.js
```javascript
test('Regression - NIP falla cuando el número ya está registrado', async ({ apiClient }) => {
const response = await apiClient.post('/api/outsider/register/sms/nip', {
⋮----
const status = response.status();
const raw = await response.text();
console.log('Status:', status);
console.log('Raw:', raw);
expect(status).toBe(400);
const body = JSON.parse(raw);
expect(body.Success).toBe(false);
expect(body.Response).toBeNull();
expect(body.ExceptionMessage).toContain('ya está asociado');
expect(body.Code).toBeLessThan(0);
```

## File: services-tests/member/smoke/auth.smoke.spec.js
```javascript
test('Smoke - Autenticación funcional', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
```

## File: services-tests/member/smoke/member.activate-email.smoke.spec.js
```javascript
test('Smoke - Activar email correctamente', async ({ apiClient }) => {
const response = await apiClient.get('/api/support/client/activation-code/testnuevoregistro@test.com', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.success).toBe(true);
expect(body.code).toBe(200);
expect(body.userError).toBe('');
expect(body.exceptionMessage).toBe('');
```

## File: services-tests/member/smoke/member.check-nip.smoke.spec.js
```javascript
test('Smoke - Verificar NIP correctamente', async ({ apiClient }) => {
const response = await apiClient.post('/api/support/recovery/nip', {
⋮----
const status = response.status();
const body = await response.json();
expect(status).toBe(200);
```

## File: services-tests/member/smoke/member.nip.smoke.spec.js
```javascript
test('Smoke - Enviar NIP correctamente', async ({ apiClient }) => {
const response = await apiClient.post('/api/outsider/register/sms/nip', {
⋮----
const status = response.status();
const body = await response.json();
expect(response.status()).toBe(200);
console.log(body);
expect(body.success).toBe(true);
expect(body.code).toBe(201);
expect(body.userError).toBe('AddPhone');
expect(body.exceptionMessage).toBe('');
```

## File: services-tests/schemas/catalogs.schema.js
```javascript

```

## File: services-tests/schemas/member.activate-email.schema.js
```javascript

```

## File: services-tests/schemas/member.check-nip.schema.js
```javascript

```

## File: services-tests/schemas/member.nip.schema.js
```javascript

```

## File: services-tests/schemas/member.register.schema.js
```javascript

```

## File: ui-tests/tests/login/login.spec.js
```javascript
test('User can login successfully', async ({ page }) => {
await page.goto('/');
await page.fill('#username', 'testuser');
await page.fill('#password', 'password123');
await page.click('button[type="submit"]');
await expect(page).toHaveURL('/dashboard');
```

## File: package.json
```json
{
  "name": "arquetipoplaywright",
  "version": "1.0.0",
  "description": "This project contains automated tests for both API and UI layers using Playwright.",
  "main": "index.js",
  "scripts": {
     "test": "playwright test",
     "smoke": "playwright test --project=smoke",
     "contracts": "playwright test --project=contracts",
     "regression": "playwright test --project=regression",
     "integration": "playwright test --project=integration",

     "nip" : "npx playwright test services-tests/member/smoke/member.nip.smoke.spec.js"

  },
  "keywords": [],
  "author": "",
  "license": "ISC",
   "type": "module",
  "devDependencies": {
    "@playwright/test": "^1.58.2"
  },
  "dependencies": {
    "ajv": "^8.18.0"
  }
}
```

## File: services-tests/core/api.client.js
```javascript
export class ApiClient {
⋮----
async get(path, additionalHeaders = {}) {
const headers = { ...this._headers(), ...additionalHeaders };
return this.request.get(path, {
⋮----
async post(path, body, additionalHeaders = {}) {
⋮----
return this.request.post(path, {
⋮----
async put(path, body, additionalHeaders = {}) {
⋮----
console.log('PUT Request Headers:', headers);
return this.request.put(path, {
⋮----
async delete(path, additionalHeaders = {}) {
⋮----
console.log('DELETE Request Headers:', headers);
return this.request.delete(path, {
⋮----
_headers() {
```

## File: services-tests/helpers/auth.manager.js
```javascript
export async function getCachedToken(request) {
const now = Date.now();
⋮----
const response = await request.post(
⋮----
if (response.status() !== 200) {
throw new Error(`Error obteniendo token: ${response.status()}`);
⋮----
const body = await response.json();
⋮----
throw new Error('No se encontró access_token en la respuesta');
```

## File: services-tests/helpers/member.flow.js
```javascript
export async function generateNip(apiClient, payload, expect) {
const response = await apiClient.post('/api/outsider/register/sms/nip', payload);
if (response.status() !== 200) {
console.error('Failed to generate NIP:', await response.text());
throw new Error('Failed to generate NIP');
⋮----
const body = await response.json();
console.log('NIP Response Body:', body);
expect(body.success).toBe(true);
⋮----
export async function checkNip(apiClient, payload, expect) {
const response = await apiClient.post('/api/support/recovery/nip', payload, {
⋮----
console.error('Failed to check NIP:', await response.text());
throw new Error('Failed to check NIP');
⋮----
console.log('Check NIP Response Body:', body);
```

## File: services-tests/member/integration/member.full-registration.integration.spec.js
```javascript
test('Full Flow - Registro completo con activación de email', async ({ apiClient }) => {
const payloads = buildFullFlowPayload();
⋮----
await generateNip(apiClient, payloads.nip, expect);
await checkNip(apiClient, payloads.checkNip, expect);
await registerAttempt(apiClient, payloads.register, expect);
await activateEmail(apiClient, payloads.activateEmail, expect);
console.log('Flujo integral completado exitosamente.');
⋮----
console.error('Error during full flow:', error);
⋮----
function buildFullFlowPayload() {
⋮----
async function registerAttempt(apiClient, payload, expect) {
⋮----
const response = await apiClient.post('/api/identity/register-attempt', payload);
if (response.status() !== 200) {
console.error('Failed to register attempt:', await response.text());
throw new Error('Failed to register attempt');
⋮----
const body = await response.json();
console.log('Register Attempt Response Body:', body);
expect(body.success).toBe(true);
⋮----
console.error('Error during register attempt:', error);
⋮----
async function activateEmail(apiClient, payload, expect) {
⋮----
const response = await apiClient.get(`/api/support/client/activation-code/${payload.email}`, {
⋮----
console.error('Failed to activate email:', await response.text());
throw new Error('Failed to activate email');
⋮----
console.log('Activate Email Response Body:', body);
⋮----
expect(body.code).toBe(200);
expect(body.userError).toBe('');
expect(body.exceptionMessage).toBe('');
// Validar que la respuesta contenga un array de códigos de validación
expect(Array.isArray(body.response)).toBe(true);
expect(body.response.length).toBeGreaterThan(0);
// Validar el primer elemento del array
⋮----
expect(typeof firstValidation.id).toBe('number');
expect(typeof firstValidation.validationCode).toBe('string');
expect(typeof firstValidation.creationDate).toBe('string');
expect(typeof firstValidation.updateDate).toBe('string');
expect(firstValidation.email).toBe(payload.email);
expect(firstValidation.channel).toBe('APP');
⋮----
console.error('Error during email activation:', error);
```

## File: services-tests/member/regression/member.activate-email.regression.spec.js
```javascript
test('Smoke - Activar email correctamente', async ({ apiClient }) => {
const response = await apiClient.get('/api/support/client/activation-code/testnuevoregistro@test.com', {
⋮----
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.success).toBe(true);
expect(body.code).toBe(200);
expect(body.userError).toBe('');
expect(body.exceptionMessage).toBe('');
// Validar que la respuesta contenga un array de códigos de validación
expect(Array.isArray(body.response)).toBe(true);
expect(body.response.length).toBeGreaterThan(0);
// Validar el primer elemento del array
⋮----
expect(typeof firstValidation.id).toBe('number');
expect(typeof firstValidation.validationCode).toBe('string');
expect(typeof firstValidation.creationDate).toBe('string');
expect(typeof firstValidation.updateDate).toBe('string');
expect(firstValidation.email).toBe('testnuevoregistro@test.com');
expect(firstValidation.channel).toBe('APP');
```

## File: services-tests/member/regression/member.register.regression.spec.js
```javascript
test('Register - correo electrónico ya utilizado', async ({ apiClient }) => {
const payloads = buildDuplicateEmailPayload();
⋮----
const response = await registerAttempt(apiClient, payloads.register, expect, 404);
expect(response.status()).toBe(404);
const body = await response.json();
console.log('Response Body:', body);
expect(body.Success).toBe(false);
expect(body.Code).toBe(-2146233088);
expect(body.UserError).toBe('');
expect(body.ExceptionMessage).toBe('Este correo ya ha sido utilizado');
expect(body.Response).toBeNull();
expect(body.Message.Content).toBe('Este correo ya ha sido utilizado');
expect(body.Message.Title).toBe('Details');
⋮----
console.error('Error during registration flow:', error);
⋮----
function buildDuplicateEmailPayload() {
⋮----
async function registerAttempt(apiClient, payload, expect, expectedStatus) {
⋮----
const response = await apiClient.post('/api/identity/register-attempt', payload);
if (response.status() !== expectedStatus) {
console.error('Failed to register attempt:', await response.text());
throw new Error('Failed to register attempt');
⋮----
console.log('Register Attempt Response Body:', body);
⋮----
console.error('Error during register attempt:', error);
```

## File: README.md
```markdown
# QA Automation – Estructura del Proyecto npm run smoke

Este proyecto está diseñado bajo una arquitectura limpia y escalable para pruebas de:

- ✅ Servicios (API)
- ✅ Contratos
- ✅ Flujos de integración
- ✅ UI (Playwright)
- ✅ Validaciones estructurales (JSON Schema)

La estructura está organizada por capas de responsabilidad. Exposicón de las API por swagger o documentacion OPEN API

---

# 📂 Estructura General

qa-automation/
│
├── .gitignore
├── package.json
├── playwright.config.js
├── README.md
│
├── services-tests/                # 🔹 Pruebas API
│   │
│   ├── core/                      # Infraestructura técnica
│   │   └── api.client.js
│   │
│   ├── fixtures/                  # Fixtures personalizados
│   │   └── api.fixture.js
│   │
│   ├── helpers/                   # Utilidades reutilizables
│   │   ├── auth.manager.js
│   │   └── validateSchema.js
│   │
│   ├── schemas/                   # JSON Schemas por servicio
│   │   ├── catalogs.schema.js
│   │   ├── member.schema.js
│   │   └── invoice.schema.js
│   │
│   ├── smoke/                     # Validaciones mínimas críticas
│   │   ├── auth.smoke.spec.js
│   │   └── catalogs.smoke.spec.js
│   │
│   ├── contracts/                 # Validación estructural
│   │   └── catalogs.contract.spec.js
│   │
│   ├── regression/                # Validación funcional profunda
│   │   └── catalogs.regression.spec.js
│   │
│   ├── integration/               # Flujos multi-endpoint
│   │   └── catalogs.integration.spec.js
│   │
│   └── test-data/                 # Datos reutilizables
│       ├── members.json
│       └── invoices.json
│
├── ui-tests/                      # 🔹 Pruebas UI
│   │
│   ├── pages/                     # Page Object Model
│   │   ├── LoginPage.js
│   │   └── CatalogPage.js
│   │
│   ├── flows/                     # Flujos de negocio UI
│   │   └── login.flow.js
│   │
│   ├── tests/
│   │   └── login/login.spec.js
│   │
│   └── fixtures/
│       └── ui.fixture.js
│
└── reports/                       # Reportes generados

---

---

# 🔹 Raíz del Proyecto

## package.json
Contiene dependencias:
- @playwright/test
- ajv (validación de contratos)

Define el runtime del framework.

---

## playwright.config.js
Configura:
- baseURL
- timeout
- proyectos (smoke → contracts → regression → integration)
- orden de ejecución

Define la estrategia de ejecución por capas.

---

# 📂 services-tests/

Contiene TODAS las pruebas de API.

Está organizada por tipo de validación, no por endpoint.

---

# 📂 services-tests/core/

Infraestructura técnica del framework.

## api.client.js

Responsabilidad:
- Centralizar llamadas HTTP
- Agregar automáticamente headers (Authorization)
- Evitar repetir lógica en tests

Aquí NO van pruebas.
Aquí NO va lógica de negocio.

Solo infraestructura.

---

# 📂 services-tests/fixtures/

Contiene fixtures personalizados de Playwright.

## api.fixture.js

Responsabilidad:
- Obtener token
- Inyectar apiClient
- Centralizar autenticación

Los tests NO deben:
- Obtener token manualmente
- Pasar headers manualmente

---

# 📂 services-tests/helpers/

Contiene utilidades reutilizables.

## auth.manager.js

Responsabilidad:
- Generar token
- Cachear token
- Manejar expiración

## validateSchema.js

Responsabilidad:
- Validar contratos JSON Schema usando AJV
- Centralizar validación estructural

Aquí NO van validaciones funcionales.

---

# 📂 services-tests/contracts/

Validación estructural del API.

Objetivo:
- Detectar cambios en el contrato del backend.
- Proteger estructura JSON.

Tipos de casos:

✅ Validación de tipos
✅ Validación de campos requeridos
✅ Validación de arrays
✅ Validación de nullables

No se valida:
❌ Reglas de negocio
❌ Comportamiento funcional

Se apoya en: scmehas/

---

# 📂 services-tests/schemas/

Contiene JSON Schema por servicio.

Ejemplo:
- catalogs.schema.js

Define:
- type
- properties
- required
- estructura completa del response

No contiene lógica.

---

# 📂 services-tests/smoke/

Pruebas mínimas críticas.

Objetivo:
- Validar que el sistema está disponible.
- Detectar fallos graves rápidamente.

Tipos de casos:

✅ Endpoint responde 200  
✅ Autenticación funciona  
✅ Servicio principal responde  

No se valida:
❌ Lógica compleja  
❌ Edge cases  
❌ Validaciones profundas  


# 📂 services-tests/regression/

Validación funcional profunda.

Aquí se validan:

✅ Reglas de negocio  
✅ Valores esperados  
✅ Comportamiento de datos  
✅ Casos positivos  
✅ Casos negativos  
✅ Validaciones de campos  

---

# 📂 services-tests/integration/  ✅ (Debe agregarse)

Responsabilidad:
- Validar flujos completos entre servicios.
- Simular procesos reales backend.

Ejemplos:

1. Crear usuario
2. Generar factura
3. Cancelar factura
4. Validar estado final

Aquí se prueban:

✅ Flujos multi-endpoint  
✅ Dependencias entre servicios  
✅ Impacto de operaciones encadenadas  

No se valida:
❌ UI
❌ Solo estructura (eso es contracts)

---

# 📂 ui-tests/

Contiene pruebas E2E de interfaz.

Ejemplo:payclub


Aquí se validan:

✅ Flujos reales del usuario
✅ Interacción con frontend
✅ Validaciones visuales
✅ Navegación

No se valida:
❌ Estructura JSON
❌ Contratos API internos

---

# 🧠 Influencia del CRUD en la estrategia

CRUD impacta directamente en:

## 🟢 Smoke
- Validar que GET principal responde.

## 🟡 Contracts
- Validar estructura de:
  - GET
  - POST response
  - PUT response
  - DELETE response

## 🔵 Regression
- Validar reglas de negocio por operación:
  - POST crea correctamente
  - PUT actualiza correctamente
  - DELETE elimina correctamente
  - GET refleja cambios

## 🟣 Integration
- Validar flujo completo CRUD:
  - Crear → Consultar → Actualizar → Validar → Eliminar → Validar eliminación

---

# 📊 Estrategia de Ejecución

Orden correcto:

1️⃣ Smoke  
2️⃣ Contracts  
3️⃣ Regression  
4️⃣ Integration  

Si Smoke falla → se detiene ejecución.

---

# ✅ Tipos de Casos por Capa

| Capa | Tipo de Validación | Ejemplo |
|------|--------------------|----------|
| Smoke | Disponibilidad | Status 200 |
| Contracts | Estructura | Validar schema |
| Regression | Lógica | Validar reglas |
| Integration | Flujo | Crear + Actualizar + Eliminar |
| UI | Experiencia | Login exitoso |

---

# 🎯 Objetivo Arquitectónico

Separar responsabilidades:

- Infraestructura → core/
- Autenticación → helpers/
- Estructura → contracts/
- Lógica → regression/
- Flujo → integration/
- Experiencia → ui-tests/

Esto permite:

✅ Escalabilidad  
✅ Mantenibilidad  
✅ Bajo acoplamiento  
✅ Reutilización  
✅ Orden claro de ejecución  

---

# 🚀 Próximos pasos recomendados

- Crear carpeta integration/
- Separar por dominio (member, invoice, etc.)
- Implementar multi‑ambiente
- Implementar multi‑usuario
- npx playwright test services-tests/member/smoke/member.check-nip.smoke.spec.js
npx playwright test services-tests/member/contracts/member.check-nip.contract.spec.js
npx playwright test services-tests/member/regression/member.check-nip.regression.spec.js

npx playwright test services-tests/member/smoke/member.nip.smoke.spec.js
npx playwright test services-tests/member/regression/member.register.regression.spec.js
```

## File: services-tests/fixtures/api.fixture.js
```javascript
export const test = base.extend({
apiClient: async ({ request }, use) => {
const token = await getCachedToken(request);
const client = new ApiClient(request, token);
await use(client);
```

## File: playwright.config.js
```javascript
export default defineConfig({
```
