# QA Automation – Estructura del Proyecto

Este proyecto está diseñado bajo una arquitectura limpia y escalable para pruebas de:

- ✅ Servicios (API)
- ✅ Contratos
- ✅ Flujos de integración
- ✅ UI (Playwright)
- ✅ Validaciones estructurales (JSON Schema)

La estructura está organizada por capas de responsabilidad.

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
- Agregar logging estructurado