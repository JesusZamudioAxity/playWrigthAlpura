# FRAMEWORK_GUIDELINES.md
## Playwright Enterprise QA Automation Framework

Este documento define las reglas, estándares y lineamientos obligatorios para el uso y expansión del arquetipo de automatización.

### Objetivos

- Garantizar consistencia entre dominios
- Evitar deuda técnica
- Mantener escalabilidad
- Facilitar gobernanza técnica
- Alinear ejecución con CI/CD

---

# 1. Principios del Framework

| Principio | Descripción |
|-----------|------------|
| Separación por dominio | Cada dominio es autónomo |
| Core compartido | Reutilización obligatoria |
| API First | Priorizar validaciones por API |
| Validación estructural | JSON Schema en servicios críticos |
| Ejecución por etiquetas | Control total desde CLI |
| Arquitectura desacoplada | Diseño escalable y mantenible |

---

# 2. Reglas de Organización

## 2.1 Separación de Responsabilidades

| Capa | Debe hacer | No debe hacer |
|------|------------|---------------|
| spec | Orquestar pruebas | Llamar `request` directamente |
| services | Consumir API | Tener lógica de validación |
| test-data | Construir datos | Ejecutar lógica HTTP |
| dataGenerator | Generar valores dinámicos | Contener lógica de negocio |
| fixtures | Manejar lifecycle | Validar reglas de negocio |

---

## 2.2 Uso Obligatorio de Services

### Incorrecto
```ts
await request.post('/endpoint');
```

### Correcto
```ts
await crearEntidad(data);
```

---

## 2.3 Separación de Test Data

| Nivel | Ubicación | Propósito |
|-------|-----------|-----------|
| Global | `core/test-data` | Datos reutilizables |
| Dominio | `domains/{modulo}/test-data` | Datos específicos |
| Dinámico | `core/utils/dataGenerator` | Valores únicos |

Regla obligatoria: Nunca hardcodear datos dinámicos dentro del `spec`.

---

# 3. Estándar de Creación de Tests

## 3.1 Convención de nombres

Formato obligatorio:

```
accion-entidad.spec.ts
```

Ejemplos:

- `create-user.spec.ts`
- `update-order.spec.ts`

---

## 3.2 Uso Obligatorio de Etiquetas

Cada test debe incluir:

| Tipo | Ejemplo |
|------|----------|
| Dominio | `@usuarios` |
| Tipo técnico | `@api` / `@ui` |
| Nivel | `@smoke`, `@integration`, `@regression` |

Ejemplo:

```ts
test('@usuarios @api @smoke Crear usuario válido', async () => {});
```

---

# 4. Uso Correcto de Fixtures

Los fixtures deben utilizarse cuando:

- Hay setup repetitivo
- Se necesita usuario autenticado
- Se requiere lifecycle automático

Ejemplo:

```ts
test('...', async ({ usuario }) => {
  // usar usuario inyectado
});
```

Ubicación obligatoria:

```
core/fixtures/
```

---

# 5. Validación de Contratos

| Elemento | Ubicación |
|----------|----------|
| Schemas | `core/contracts/schemas/` |
| Validación | `validateSchema(schema, body)` |

Cuando el endpoint sea crítico:

- Validar contra JSON Schema
- Crear prueba `@contract-negative` cuando aplique

---

# 6. Estándar UI

| Regla | Descripción |
|-------|------------|
| Page Object obligatorio | Toda interacción vive en `pages/` |
| Tests declarativos | No contienen selectores |
| Sin lógica repetida | Reutilizar métodos |

Incorrecto:

```ts
await page.click('button');
```

Correcto:

```ts
await loginPage.clickLogin();
```

---

# 7. CI/CD Guidelines

| Escenario | Ejecución |
|------------|------------|
| Pull Request | `@integration` |
| Post Deploy | `@smoke` |
| Nightly | `@regression` |
| Dominio específico | `--grep @dominio` |

---

# 8. Anti‑Patrones Prohibidos

- Hardcodear URLs
- Hardcodear datos dinámicos
- Llamar `request` directamente desde `spec`
- Duplicar lógica HTTP en dominios
- Mezclar UI y API en el mismo test
- Crear scripts específicos por combinación dominio+nivel

---

# 9. Nivel de Madurez

Este framework está diseñado para:

- Multi-dominio
- Multi-equipo
- CI/CD continuo
- Ejecución paralela
- Escalabilidad horizontal
- Gobernanza central

---

# 10. Objetivo Final

Mantener un framework:

- Limpio
- Modular
- Escalable
- Predecible
- Enterprise-ready

---

# Autor

Jesús Manuel González Zamudio