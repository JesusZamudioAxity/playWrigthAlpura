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
├── package.json
├── playwright.config.ts
├── tsconfig.json
├── .env
│
├── core/                         # Componentes compartidos
│   ├── config/
│   │   ├── environments.ts
│   │   └── globalSetup.ts
│   │
│   ├── api/
│   │   └── apiClient.ts
│   │
│   ├── db/
│   │   └── dbClient.ts
│   │
│   ├── contracts/
│   │   └── schemaValidator.ts
│   │
│   ├── utils/
│   │   ├── helpers.ts
│   │   └── dataGenerator.ts
│   │
│   └── fixtures/
│       └── baseFixture.ts
│
├── domains/                      # Organización por módulo funcional
│
│   ├── finanzas/
│   │   ├── api/
│   │   │   ├── crear-factura.spec.ts
│   │   │   └── cancelar-factura.spec.ts
│   │   │
│   │   ├── events/
│   │   │   └── factura.event.spec.ts
│   │   │
│   │   ├── ui/
│   │   │   └── flujo-facturacion.spec.ts
│   │   │
│   │   ├── pages/
│   │   │   └── FacturaPage.ts
│   │   │
│   │   └── services/
│   │       └── finanzas.service.ts
│
│   ├── compras/
│   │   ├── api/
│   │   ├── events/
│   │   ├── ui/
│   │   ├── pages/
│   │   └── services/
│
│   ├── ventas/
│   ├── capital-humano/
│   ├── facturacion/
│   └── cadena-suministro/
│
└── reports/

---
# Instalación y Configuración

## 1️⃣ Clonar el repositorio
git clone <repo-url>
cd arquetipoplaywright

## 2️⃣ Instalar dependencias
npm install
### Instalar Playwright (si es la primera vez)
npx playwright install

## 3️⃣
npm run verify

# 🛠 Scripts Disponibles

| Comando | Descripción |
|----------|------------|
| `npm run verify` | Verifica que el entorno esté correctamente configurado (ejecuta smoke) |
| `npm run smoke` | Ejecuta pruebas Smoke |
| `npm run contracts` | Ejecuta pruebas de contrato |
| `npm run regression` | Ejecuta pruebas de regresión |
| `npm run integration` | Ejecuta pruebas de integración |
---
# Autor

**Jesús Manuel González Zamudio**


 Explicación de Cada Sección
🔷 core/
Contiene todo lo reutilizable y transversal.

Aquí vive:

Cliente HTTP base
Conexión a base de datos
Validación de contratos (JSON Schema)
Helpers comunes
Configuración por entorno
Fixtures globales
🔹 Solo el equipo QA central modifica esta parte.

🔷 domains/
Aquí vive el trabajo por célula.

Cada dominio tiene:

api/ → pruebas de servicios
events/ → validación comportamiento asíncrono
ui/ → E2E del módulo
pages/ → Page Objects
services/ → lógica API del módulo
🔹 Cada célula es dueña de su carpeta.


🏷 Etiquetas Estándar del Arquetipo
Todos los tests deben incluir:

Por dominio:
@finanzas
@compras
@ventas

Por tipo técnico:
@api
@event
@ui

Por tipo de ejecución:
@smoke
@integration
@regression
@e2e
@critical

 Qué significa cada etiqueta
@finanzas → Dominio
@api → Tipo técnico
@integration → Nivel de prueba
@smoke → Se ejecuta post deploy
@regression → Forma parte de regresión completa

✅ 🚀 Ejecución en Azure DevOps
Post Deploy:    --grep @smoke
Pull Request:   --grep "@integration"
Nightly:        --grep @regression
Dominio específico:  --grep @finanzas

Cómo se ejecuta después
Smoke:   npx playwright test --grep @smoke
Solo finanzas:  npx playwright test --grep @finanzas
Integración de compras:   npx playwright test --grep "@compras.*@integration"
Regresión completa:  npx playwright test --grep @regression

 Buena práctica recomendada
Un .spec.ts puede contener varios test() relacionados.

Ejemplo:   crear-factura.api.spec.ts
Dentro:
test('@finanzas @api @smoke Crear factura válida', async () => { ... });

test('@finanzas @api @regression Crear factura con impuesto', async () => { ... });

test('@finanzas @api @regression Validar error sin cliente', async () => { ... });

¿Cuándo sí hacer un archivo por caso?
Solo cuando:

El flujo es muy complejo
Es un E2E grande
Tiene setup muy particular
Requiere aislamiento completo

📌 Buenas Prácticas Incluidas
✔ Separación por dominio
✔ Core compartido
✔ Sin carpetas por tipo de ejecución
✔ Etiquetas combinables
✔ Contratos para eventos
✔ API prioritaria sobre UI
✔ E2E solo críticos
✔ Compatible CI/CD

🎯 Ventajas de Este Arquetipo
Escalable a múltiples células
Evita duplicación
Gobernanza clara
Fácil mantenimiento
Enterprise-ready
Alineado a arquitectura cloud-native


------
1️⃣ Regla Principal
El test data debe dividirse en:

1️⃣ Datos compartidos globales
2️⃣ Datos específicos por dominio
3️⃣ Datos dinámicos generados en tiempo de ejecución

📁 Estructura Recomendada para Test Data
core/
   test-data/
      global.data.ts
      users.data.ts

domains/
   finanzas/
      test-data/
         facturas.data.ts
         clientes.data.ts
   compras/
      test-data/
         ordenes.data.ts

🔹 core/test-data/
Contiene datos compartidos globales:

Usuarios base
Roles
Configuraciones comunes
Datos estándar reutilizables
Ejemplo:

Usuario administrador
Usuario estándar
Configuración de moneda
👉 Son datos estables y reutilizables entre dominios.

✅ 🔹 domains/{modulo}/test-data/
Contiene datos específicos del dominio.

Ejemplo en finanzas:

facturaValida
facturaConImpuesto
clienteActivo
Solo el módulo Finanzas usa estos datos.

👉 Evita contaminación entre dominios.

--------------------------------
✅ 📦 Estructura General del Core
El directorio core/ contiene todos los componentes reutilizables y transversales del framework de automatización.

Su objetivo es:
Evitar duplicación
Centralizar configuraciones
Mantener consistencia entre dominios
Facilitar mantenimiento y escalabilidad

✅ 🔧 core/config/
Contiene la configuración global del framework.
📄 environments.ts

Responsable de:
Leer variables del archivo .env
Centralizar URLs por entorno (DEV / QA / UAT)
Manejar configuraciones dinámicas

Ejemplo de responsabilidad:
baseURL
credenciales
timeouts
flags de ejecución

📄 globalSetup.ts
Archivo que se ejecuta antes del inicio de la suite.

Responsable de:
Generar token global
Preparar datos base
Validar disponibilidad del ambiente
Inicializar configuración compartida
👉 Solo se usa para configuraciones iniciales, no para lógica de negocio.

✅ 🌐 core/api/
Contiene la configuración base para consumo de APIs.

📄 apiClient.ts
Responsable de:
Crear contexto HTTP de Playwright
Centralizar headers comunes
Manejar autenticación (Bearer token)
Manejar configuración baseURL
Ejemplo de uso:
Todos los dominios llaman al apiClient en vez de crear su propio request.
👉 Evita duplicar lógica HTTP en cada módulo.

✅ 🗄 core/db/
Contiene la configuración para validaciones en base de datos.
📄 dbClient.ts
Responsable de:
Configurar conexión a BD
Ejecutar queries de validación
Manejar conexión segura
Uso recomendado:
Solo para validaciones necesarias.
No para preparar datos complejos.
👉 Permite validar comportamiento observable después de eventos.

✅ 📑 core/contracts/
Contiene la validación estructural de eventos y respuestas.
📄 schemaValidator.ts
Responsable de:
Validar JSON contra esquema
Usar librerías como AJV
Centralizar lógica de validación de contratos
Uso:
Validar que un payload cumpla con el contrato esperado.
👉 Mitiga cambios incompatibles en eventos.

✅ 🛠 core/utils/
Contiene utilidades genéricas reutilizables.
📄 helpers.ts
Funciones auxiliares:
Formateo de fechas
Esperas personalizadas
Conversión de datos
Validaciones comunes
📄 dataGenerator.ts
Responsable de generar datos dinámicos:
IDs únicos
Correos electrónicos únicos
Nombres aleatorios
Fechas dinámicas
👉 Reduce dependencia de datos estáticos.
👉 Minimiza colisiones en pruebas paralelas.

✅ 🧩 core/fixtures/
Extiende Playwright para crear fixtures personalizadas.
📄 baseFixture.ts
Responsable de:
Crear contexto autenticado
Inyectar usuario logueado
Compartir datos comunes entre tests
Configurar setup por prueba


✅ 📌 Resumen del Core
| Carpeta | Responsabilidad |
|----------|----------------|
| config | Configuración global |
| api | Cliente HTTP centralizado |
| db | Validaciones de base de datos |
| contracts | Validación estructural de eventos |
| utils | Funciones auxiliares |
| fixtures | Extensiones reutilizables de Playwright |
| test-data | Datos compartidos globales |

✅ Nivel de Madurez del Arquetipo
Con esta estructura:

Soporta múltiples células
Permite gobernanza central
Escala por dominios
Reduce deuda técnica
Mantiene separación clara de responsabilidades


-----------
qa-automation/
│
├── package.json
├── package-lock.json
├── playwright.config.ts
├── tsconfig.json
├── .env
├── .gitignore
│
├── core/                                # Componentes compartidos
│
│   ├── config/                          # Configuración global
│   │   ├── environments.ts
│   │   ├── constants.ts
│   │   └── globalSetup.ts
│   │
│   ├── api/                             # Cliente HTTP centralizado
│   │   ├── apiClient.ts
│   │   └── authClient.ts
│   │
│   ├── db/                              # Conexión y utilidades BD
│   │   ├── dbClient.ts
│   │   └── queries.ts
│   │
│   ├── contracts/                       # Validación de contratos/eventos
│   │   ├── schemaValidator.ts
│   │   └── schemas/
│   │       ├── factura.schema.json
│   │       └── promocion.schema.json
│   │
│   ├── utils/                           # Utilidades generales
│   │   ├── helpers.ts
│   │   ├── waitUtils.ts
│   │   └── dataGenerator.ts
│   │
│   ├── fixtures/                        # Extensiones de Playwright
│   │   ├── baseFixture.ts
│   │   └── authFixture.ts
│   │
│   └── test-data/                       # Datos globales compartidos
│       ├── users.data.ts
│       ├── roles.data.ts
│       └── global.data.ts
│
├── domains/                             # Organización por módulo funcional
│
│   ├── finanzas/
│   │   ├── api/
│   │   │   ├── crear-factura.spec.ts
│   │   │   ├── cancelar-factura.spec.ts
│   │   │   └── consultar-factura.spec.ts
│   │   │
│   │   ├── events/
│   │   │   └── factura.event.spec.ts
│   │   │
│   │   ├── ui/
│   │   │   └── flujo-facturacion.spec.ts
│   │   │
│   │   ├── pages/
│   │   │   └── FacturaPage.ts
│   │   │
│   │   ├── services/
│   │   │   └── finanzas.service.ts
│   │   │
│   │   └── test-data/
│   │       ├── facturas.data.ts
│   │       └── clientes.data.ts
│
│   ├── compras/
│   │   ├── api/
│   │   ├── events/
│   │   ├── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   └── test-data/
│
│   ├── ventas/
│   │   ├── api/
│   │   ├── events/
│   │   ├── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   └── test-data/
│
│   ├── capital-humano/
│   ├── facturacion/
│   └── cadena-suministro/
│
├── reports/                             # Reportes generados
│
└── pipelines/                           # YAML o scripts CI/CD
    └── azure-pipeline.yml
    --------
    | Capa | Responsabilidad |
|------|-----------------|
| global.data | datos base reutilizables |
| usuarios.data | factory del dominio |
| dataGenerator | valores dinámicos |
| spec | solo orquesta |


 create-user.spec.ts
      │     get-user-by-name.spec.ts
      │     update-user.spec.ts
      │     delete-user.spec.ts
      │     login-user.spec.ts
      │     logout-user.spec.ts
      │     create-users-with-list.spec.ts
      │     create-users-with-array.spec.ts


| Si necesitas… | Va en… |
|---------------|--------|
| Crear usuario reusable | helper |
| Lifecycle automático | fixture |
| Validaciones | spec |
| Generar datos | dataGenerator |
| Constantes | global.data |

npx playwright test domains/usuarios/api/create-user.spec.ts
npx playwright test domains/usuarios/api/create-users-with-array.spec.ts
npx playwright test domains/usuarios/api/create-users-with-list.spec.ts
npx playwright test domains/usuarios/api/delete-user.spec.ts

npx playwright test domains/usuarios/api/get-user-by-name.spec.ts
npx playwright test domains/usuarios/api/login-user.spec.ts
npx playwright test domains/usuarios/api/logout-user.spec.ts
npx playwright test domains/usuarios/api/update-user.spec.ts