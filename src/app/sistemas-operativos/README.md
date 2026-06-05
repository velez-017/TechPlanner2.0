# Carpeta sistemas-operativos - Frontend alineado con OS Service

Este directorio contiene la implementación frontend (Angular) alineada con el microservicio "OS Service" descrito en la documentación del backend.

Estructura creada (paralela a `precios`):

```
sistemas-operativos/
├── sistemas-operativos.component.ts       ← UI + lógica CRUD + verificación compatibilidad
├── sistemas-operativos.component.html     ← Template (lista + detalle + acciones)
├── sistemas-operativos.component.css      ← Estilos (dark mode)
├── sistemas-operativos.component.spec.ts  ← Test básico del componente
├── sistema.service.ts                     ← Servicio HTTP alineado con OS Service
├── operating-system.ts                    ← Modelos: OperatingSystem, DTOs de compatibilidad
└── README.md                              ← Esta documentación
```

Resumen de correspondencia con el backend (OS Service):

- Base URL backend: `http://localhost:8084/api/v1/os-service/operating-systems`
- Endpoints soportados por el servicio frontend:
  - `GET /operating-systems` → `getAll()`
  - `GET /operating-systems/{id}` → `getById(id)`
  - `POST /operating-systems` → `create(os)`
  - `PUT /operating-systems/{id}` → `update(os)`
  - `DELETE /operating-systems/{id}` → `delete(id)`
  - `GET /operating-systems/active` → `findActive()`
  - `GET /operating-systems/architecture/{arch}` → `findByArchitecture(arch)`
  - `POST /operating-systems/compatibility` → `checkCompatibility(request)`

Modelos TypeScript:

- `OperatingSystem` → campos alineados con la entidad JPA del backend:
  - `id`, `name`, `version`, `architecture`, `minRamGb`, `minStorageGb`, `requiresTpm`, `requiresSecureBoot`, `active`, `estimatedPrice`

- DTOs:
  - `HardwareCompatibilityRequest` (ramGb, storageGb, tpm, secureBoot, architecture, cpu, gpu)
  - `OperatingSystemCompatibilityResponse` (operatingSystem, compatible, reason)

UX y helpers:

- El componente permite:
  - Listar sistemas operativos
  - Seleccionar para ver detalle
  - Crear / Editar / Eliminar vía SweetAlert2 (formularios emergentes)
  - Verificar compatibilidad de hardware: envía request al endpoint `/compatibility`. Si hay error de conexión, se ofrece un "preview local" usando una comprobación heurística en `sistema.service.checkCompatibilityPreview()`.

Notas de implementación:

- El servicio usa `HttpClient` para comunicarse con el backend. Las rutas y el formato JSON están alineados con la especificación que me proporcionaste.
- Validaciones básicas en el frontend: campos obligatorios y tipos mínimos (ram, storage ≥ 1).
- El componente es `standalone: true` y sigue el patrón mostrado en `precios`.

Cómo probar localmente:

1. Asegúrate de que el OS Service backend esté en `http://localhost:8084` (según tu especificación ajustada para evitar colisión de puertos).
2. Inicia frontend: `npm install` y `npm start` o `ng serve`.
3. Navega a la ruta que mapea el componente (ej: `/sistemas-operativos` si está configurada la ruta).

Si quieres que también genere archivos HTTP de prueba o una colección Postman basada en los endpoints, dime y los creo.

