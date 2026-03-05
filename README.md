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

arquetipoplaywright/
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
│   │   ├── member.flow.js
│   │   └── validateSchema.js
│   │
│   ├── schemas/                   # JSON Schemas por servicio
│   │   ├── catalogs.schema.js
│   │   ├── member.activate-email.schema.js
│   │   ├── member.check-nip.schema.js
│   │   ├── member.nip.schema.js
│   │   └── member.register.schema.js
│   │
│   ├── smoke/                     # Validaciones mínimas críticas
│   │   ├── auth.smoke.spec.js
│   │   ├── catalogs.smoke.spec.js
│   │   ├── member.activate-email.smoke.spec.js
│   │   ├── member.check-nip.smoke.spec.js
│   │   └── member.nip.smoke.spec.js
│   │
│   ├── contracts/                 # Validación estructural
│   │   ├── catalogs.contract.spec.js
│   │   ├── member.activate-email.contract.spec.js
│   │   ├── member.check-nip.contract.spec.js
│   │   ├── member.nip.contract.spec.js
│   │   └── member.register.contract.spec.js
│   │
│   ├── regression/                # Validación funcional profunda
│   │   ├── catalogs.regression.spec.js
│   │   ├── member.activate-email.regression.spec.js
│   │   ├── member.check-nip.regression.spec.js
│   │   ├── member.nip.regression.spec.js
│   │   ├── member.register.regression.spec.js
│   │   └── member.registerpass.regression.spec.js
│   │
│   ├── integration/               # Flujos multi-endpoint
│   │   └── member.full-registration.integration.spec.js
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

Regla de Oro, automatiza lo que:

✅ Se ejecuta frecuentemente
✅ Es crítico
✅ Es estable
✅ Es repetible
✅ Tiene alto riesgo

# 🕒 Cuándo Automatizar Servicios vs. UI

## Servicios (API)
- Cuando necesitas validar la lógica de negocio y reglas de validación.
- Para pruebas de regresión rápidas y confiables.
- Cuando la interfaz de usuario no está lista o es inestable.
- Para validar contratos y estructuras de datos.
- **Flujos repetitivos:** Automatizar procesos que se ejecutan frecuentemente y requieren consistencia.
- **Flujos de negocio críticos:** Asegurar que las operaciones clave del negocio funcionen correctamente.

## UI
- Cuando necesitas validar la experiencia del usuario final.
- Para pruebas de flujo de usuario completo.
- Cuando la interfaz de usuario es estable y representa el flujo real del usuario.
- Para validar interacciones visuales y de navegación.
- **Interacciones complejas:** Automatizar escenarios donde la interacción del usuario es crítica.
- **Validaciones visuales:** Asegurar que la interfaz se muestre correctamente en diferentes dispositivos y navegadores.

---

# Autor

**Jesús Manuel González Zamudio**
