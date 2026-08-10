# 🧪 QA Automation Framework – Playwright Enterprise Archetype

Framework de automatización diseñado bajo principios de arquitectura limpia, escalabilidad por dominio y separación clara de responsabilidades.

Este arquetipo soporta pruebas de:

- ✅ Servicios (API REST)
- ✅ Validación de contratos (JSON Schema)
- ✅ Flujos de integración
- ✅ UI (E2E con Playwright)
- ✅ Validaciones estructurales
- ✅ Validaciones opcionales en base de datos
- ✅ Ejecución CI/CD basada en etiquetas

---

# 🖥 Requisitos del Entorno

## ✅ Node.js 22.23.2

Este proyecto está validado para ejecutarse con **Node.js 22.23.2**.  
Se recomienda mantener esta versión en todos los entornos locales y de CI/CD para asegurar consistencia y evitar discrepancias entre ejecuciones.

Verificar instalación:

```bash
node -v 

Debe mostrar: v22.23.2

✅ npm
Verificar versión: npm -v

✅ TypeScript
El proyecto utiliza TypeScript como soporte para pruebas, utilerías y configuración.

Verificar: npx tsc -v

✅ Instalación del Proyecto
Después de clonar el repositorio:

npm install
npx playwright install
Ejecutar pruebas:

npm run test

⚠ Consideraciones Importantes
No actualizar Node sin validar compatibilidad con Playwright y TypeScript.
No modificar la versión de Playwright sin revisar impacto en la suite.
No subir reportes, videos ni artefactos generados (reports/, test-results/, *.webm, *.zip).
Las dependencias críticas deben manejarse preferentemente con versión fija para evitar cambios inesperados.
Validar siempre la versión instalada de @types/node, ya que no necesariamente coincide con la versión de Node runtime.

---

# 🏗 Estructura General del Proyecto

El framework está organizado bajo una arquitectura limpia basada en:

- Separación por capas técnicas
- Organización por dominio funcional
- Componentes compartidos centralizados
- Escalabilidad multi-equipo

---

qa-automation/
│
├── package.json                 # Dependencias y scripts de ejecución
├── package-lock.json            # Versiones exactas de dependencias
├── playwright.config.ts         # Configuración global de Playwright (UI)
├── tsconfig.json                # Configuración TypeScript
├── .env                         # Variables de entorno (API / WEB / DB)
├── .gitignore                   # Archivos excluidos del repositorio
│
├── core/                        # Componentes reutilizables transversales
│
│   ├── config/                  # Configuración global del framework
│   │   ├── environments.ts      # Gestión de entornos (DEV / QA / UAT)
│   │   ├── constants.ts         # Constantes globales
│   │   └── globalSetup.ts       # Setup inicial antes de ejecutar la suite
│   │
│   ├── api/                     # Cliente HTTP centralizado
│   │   ├── apiClient.ts         # Manejo de request context y headers
│   │   └── authClient.ts        # Manejo de autenticación API (opcional)
│   │
│   ├── db/                      # Validaciones en base de datos (opcional)
│   │   ├── dbClient.ts          # Conexión a base de datos
│   │   └── queries.ts           # Queries reutilizables
│   │
│   ├── contracts/               # Validación estructural de respuestas/eventos
│   │   ├── schemaValidator.ts   # Validador AJV para JSON Schema
│   │   └── schemas/             # Contratos JSON
│   │       ├── usuario.schema.json
│   │       ├── factura.schema.json
│   │       └── promocion.schema.json
│   │
│   ├── utils/                   # Utilidades generales
│   │   ├── helpers.ts           # Funciones auxiliares reutilizables
│   │   ├── waitUtils.ts         # Esperas personalizadas / polling
│   │   └── dataGenerator.ts     # Generación de datos dinámicos únicos
│   │
│   ├── fixtures/                # Extensiones de Playwright
│   │   ├── baseFixture.ts       # Fixture base compartido
│   │   ├── authFixture.ts       # Fixture con usuario autenticado
│   │   └── usuario.fixture.ts   # Fixture específico de dominio (ejemplo)
│   │
│   └── test-data/               # Datos globales compartidos
│       ├── users.data.ts        # Usuarios estándar del sistema
│       ├── roles.data.ts        # Roles del sistema
│       └── global.data.ts       # Configuración base reutilizable
│
├── domains/                     # Organización por módulo funcional
│
│   ├── usuarios/                # Dominio: Usuarios
│   │   ├── api/                 # Pruebas API del módulo
│   │   │   ├── create-user.spec.ts
│   │   │   ├── get-user-by-name.spec.ts
│   │   │   ├── update-user.spec.ts
│   │   │   ├── delete-user.spec.ts
│   │   │   ├── login-user.spec.ts
│   │   │   ├── logout-user.spec.ts
│   │   │   ├── create-users-with-list.spec.ts
│   │   │   └── create-users-with-array.spec.ts
│   │   │
│   │   ├── services/            # Capa intermedia para llamadas API
│   │   │   └── usuarios.services.ts
│   │   │
│   │   ├── test-data/           # Datos específicos del dominio
│   │   │   └── usuarios.data.ts
│   │   │
│   │   ├── pages/               # Page Objects (UI)
│   │   │   └── login.page.ts
│   │   │
│   │   ├── ui/                  # Pruebas UI del módulo
│   │   │   └── login.spec.ts
│   │   │
│   │   └── events/              # Validaciones de eventos (opcional)
│   │
│   ├── finanzas/                # Dominio: Finanzas
│   │   ├── api/
│   │   ├── events/
│   │   ├── ui/
│   │   ├── pages/
│   │   ├── services/
│   │   └── test-data/
│   │
│   ├── compras/
│   ├── ventas/
│   ├── capital-humano/
│   ├── facturacion/
│   └── cadena-suministro/
│
├── reports/                     # Reportes generados (HTML, traces, videos)
│
└── pipelines/                   # Configuración CI/CD
    └── azure-pipeline.yml

---

# 🏷 Estrategia de Etiquetas
Todos los tests deben incluir:

### 🔹 Por Dominio
@usuarios
@finanzas
@compras


### 🔹 Por Tipo Técnico
@api
@ui
@event
@contract


### 🔹 Por Nivel de Ejecución
@smoke
@integration
@regression
@e2e
@critical


---

# 🚀 Estrategia de Ejecución

## Ejecutar todo
npm run test
## Smoke
npm run test:smoke
## Integration
npm run test:integration
## Regression
npm run test:regression

## Solo API
npm run test:api


## Solo UI
npm run test:ui

## Solo módulo usuarios
npm run test:usuarios


---

# 🧪 Flujo Correcto de Construcción de Datos

Regla principal:

1️⃣ Datos globales → core/test-data  
2️⃣ Factory del dominio → domains/{modulo}/test-data  
3️⃣ Valores dinámicos → core/utils/dataGenerator  
4️⃣ Orquestación → spec  

---

# 📊 CI/CD – Azure DevOps

Ejemplo de ejecución:

| Escenario | Comando |
|-----------|----------|
| Post Deploy | `--grep @smoke` |
| Pull Request | `--grep @integration` |
| Nightly | `--grep @regression` |
| Dominio específico | `--grep @usuarios` |

---

# 📈 Buenas Prácticas Incluidas

✔ Separación por dominio  
✔ Core compartido  
✔ Sin carpetas por tipo de ejecución  
✔ Etiquetas combinables  
✔ Validación de contratos  
✔ API prioritaria sobre UI  
✔ E2E solo críticos  
✔ Compatible CI/CD  
✔ Soporta múltiples células  
✔ Arquitectura escalable  

---

# 🎯 Nivel de Madurez del Arquetipo

Este framework:

- Escala a múltiples equipos
- Permite gobernanza central
- Reduce deuda técnica
- Mantiene separación clara de responsabilidades
- Está alineado a arquitectura cloud-native

---

# 👤 Autor

**Jesús Manuel González Zamudio**

---
