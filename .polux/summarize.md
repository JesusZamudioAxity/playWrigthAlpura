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
services-tests/contracts/catalogs.contract.spec.js
services-tests/core/api.client.js
services-tests/fixtures/api.fixture.js
services-tests/helpers/auth.manager.js
services-tests/helpers/validateSchema.js
services-tests/regression/catalogs.regression.spec.js
services-tests/schemas/catalogs.schema.js
services-tests/smoke/auth.smoke.spec.js
services-tests/smoke/catalogs.smoke.spec.js
ui-tests/tests/login/login.spec.js
```

# Files

## File: services-tests/core/api.client.js
```javascript
export class ApiClient {
⋮----
async get(path) {
return this.request.get(path, {
headers: this._headers()
⋮----
async post(path, body) {
return this.request.post(path, {
headers: this._headers(),
⋮----
async put(path, body) {
return this.request.put(path, {
⋮----
async delete(path) {
return this.request.delete(path, {
⋮----
_headers() {
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

## File: .gitignore
```
node_modules/
.env
playwright-report/
test-results/
```

## File: package.json
```json
{
  "name": "arquetipoplaywright",
  "version": "1.0.0",
  "description": "This project contains automated tests for both API and UI layers using Playwright.",
  "main": "index.js",
  "scripts": {
    "test": "echo \"Error: no test specified\" && exit 1"
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

## File: playwright.config.js
```javascript
export default defineConfig({
```

## File: README.md
```markdown
# README.md
# Project Title

This project contains automated tests for both API and UI layers using Karate and Playwright.

## Structure

- `services-tests/`: Contains API tests using Karate.
- `ui-tests/`: Contains UI tests using Playwright.
```

## File: services-tests/contracts/catalogs.contract.spec.js
```javascript
test('Contract - Validar contrato base de catalogs', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
const body = await response.json();
const valid = validateSchema(catalogsSchema, body);
expect(valid).toBe(true);
```

## File: services-tests/fixtures/api.fixture.js
```javascript
export const test = base.extend({
apiClient: async ({ request }, use) => {
const token = await getCachedToken(request);
const client = new ApiClient(request, token);
await use(client);
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

## File: services-tests/regression/catalogs.regression.spec.js
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

## File: services-tests/schemas/catalogs.schema.js
```javascript

```

## File: services-tests/smoke/auth.smoke.spec.js
```javascript
test('Smoke - Autenticación funcional', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
```

## File: services-tests/smoke/catalogs.smoke.spec.js
```javascript
test('Smoke - Obtener catalogs correctamente', async ({ apiClient }) => {
const response = await apiClient.get('/api/apex/catalogs');
expect(response.status()).toBe(200);
const body = await response.json();
expect(body.success).toBe(true);
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
