# Carpeta de Precios - Documentación Completa

## 🔗 Alineación con Microservicio Backend (Spring Boot + PostgreSQL)

Esta carpeta frontend está **100% alineada** con el Microservicio Pricing Service del backend.

### Correspondencia Exacta

| Backend (Java/Spring)                | Frontend (Angular) | Descripción |
|--------------------------------------|--------|---|
| `amount`                             | `amount` | Precio base del producto |
| `productName`                        | `productName` | Nombre del producto |
| `REGULAR`                            | `REGULAR` | Cliente Regular (5% descuento) |
| `EXECUTIVE`                          | `EXECUTIVE` | Ejecutivo (15% descuento) |
| `ADMINISTRATIVE`                     | `ADMINISTRATIVE` | Administrativo (10% descuento) |
| `19%`                                | `19%` | IVA fijo |
| `@PrePersist` → `calculatePricing()` | `completeProductData()` | Cálculos automáticos |

---

## 🏗️ Estructura de la Carpeta

```
precios/
├── precios.component.ts        ← Lógica UI + CRUD (Angular)
├── precios.component.html      ← Interfaz de usuario
├── precios.component.css       ← Estilos Dark Mode
├── precios.component.spec.ts   ← Tests unitarios
├── precio.service.ts           ← Capa HTTP + cálculos preview
├── precio-producto.ts          ← Modelo (DTO) coincide con backend
└── README.md                   ← Esta documentación
```

---

## 📊 Flujo Completo: Frontend ↔ Backend

### 1️⃣ Usuario Ingresa Datos (Frontend)
```typescript
Usuario crea/edita producto:
  productName: "Laptop"
  amount: 1000
  customerType: "EXECUTIVE"
```

### 2️⃣ Frontend Calcula Preview Local
```typescript
// En PreciosComponent.selectCustomerType()
completeProductData() es llamado:
  
  descuento = 1000 × 15% = 150
  precio con desc = 850
  iva = 850 × 19% = 161.50
  precio final = 1011.50
```

### 3️⃣ Frontend Envía al Backend
```http
POST http://localhost:8081/api/v1/pricing-service/prices
{
  "productName": "Laptop",
  "amount": 1000,
  "customerType": "EXECUTIVE",
  "discountPercentage": 15,
  "taxPercentage": 19,
  "finalPrice": 1011.50
}
```

### 4️⃣ Backend Recibe y Valida (Spring Boot)
```java
// PriceRequestDto valida:
- productName no sea vacío
- amount sea > 0
- customerType exista (ENUM)
```

### 5️⃣ Backend Recalcula con @PrePersist
```java
@PrePersist
private void calculatePricing() {
  // Valida tipos de cliente:
  // EXECUTIVE → 15%
  // ADMINISTRATIVE → 10%
  // REGULAR → 5%
  
  discountPercentage = 15;
  taxPercentage = 19;
  finalPrice = 1011.50;
  createdAt = now;
}
```

### 6️⃣ Backend Persiste en PostgreSQL
```sql
INSERT INTO price (
  productName, amount, customerType,
  discountPercentage, taxPercentage, finalPrice, createdAt
) VALUES (
  'Laptop', 1000, 'EXECUTIVE',
  15, 19, 1011.50, 2026-05-27
);
```

### 7️⃣ Backend Devuelve Respuesta (REST API)
```json
{
  "id": 1,
  "productName": "Laptop",
  "amount": 1000,
  "customerType": "EXECUTIVE",
  "discountPercentage": 15,
  "taxPercentage": 19,
  "finalPrice": 1011.50,
  "createdAt": "2026-05-27T10:30:00"
}
```

### 8️⃣ Frontend Actualiza UI
```typescript
// PreciosComponent.cargarProductos()
this.precioProductos = [
  {
    id: 1,
    productName: "Laptop",
    amount: 1000,
    customerType: "EXECUTIVE",
    discountPercentage: 15,
    taxPercentage: 19,
    finalPrice: 1011.50,
    createdAt: 2026-05-27
  }
];
```

---

## 📝 Archivos Principales

### `precio-producto.ts` - Modelo (DTO)
```typescript
export class PrecioProducto {
  id?: number;                    // Auto-generado por BD
  productName: string = '';       // Nombre del producto
  amount!: number;                // Precio base (NO basePrice)
  customerType: string = 'REGULAR'; // Tipo cliente
  discountPercentage!: number;    // Calculado por backend
  taxPercentage: number = 19;     // Siempre 19%
  finalPrice!: number;            // Calculado por backend
  createdAt?: Date;               // Calculado por backend
}
```

### `precio.service.ts` - Servicio HTTP + Cálculos
```typescript
// Descuentos alineados con backend
DISCOUNTS = {
  'REGULAR': 5,        // ← Backend: REGULAR
  'EXECUTIVE': 15,     // ← Backend: EXECUTIVE
  'ADMINISTRATIVE': 10 // ← Backend: ADMINISTRATIVE
};

TAX_RATE = 19;  // ← Backend: siempre 19%

// Métodos HTTP
getProductos()     → GET /api/v1/pricing-service/prices
getProducto(id)    → GET /api/v1/pricing-service/prices/{id}
createProducto()   → POST /api/v1/pricing-service/prices
updateProducto()   → PUT /api/v1/pricing-service/prices/{id}
deleteProducto()   → DELETE /api/v1/pricing-service/prices/{id}
getProductosPaginados() → GET /api/v1/pricing-service/prices/page/{pageNumber}

// Método de preview (cálculo local)
completeProductData()
  → Calcula locally el descuento e impuesto para preview
  → Backend siempre recalculará (@PrePersist)
```

### `precios.component.ts` - Lógica UI
```typescript
// Tipos de cliente con etiquetas y descuentos
CUSTOMER_TYPES = [
  { code: 'REGULAR', label: 'Cliente Regular', discount: 5 },
  { code: 'EXECUTIVE', label: 'Ejecutivo', discount: 15 },
  { code: 'ADMINISTRATIVE', label: 'Administrativo', discount: 10 },
];

// Métodos principales
cargarProductos()    → Obtiene lista del backend
selectProduct()      → Selecciona para ver detalle
selectCustomerType() → Cambia tipo y muestra preview
addProducto()        → Crea nuevo (SweetAlert2)
editProducto()       → Edita existente (SweetAlert2)
confirmDelete()      → Elimina con confirmación

// Helper
getCustomerTypeLabel(code) → Convierte "EXECUTIVE" → "Ejecutivo (15%)"
```

### `precios.component.html` - UI
- **Panel de Detalle**: Muestra producto seleccionado
- **Selector de Tipo Customer**: Cambia entre REGULAR/EXECUTIVE/ADMINISTRATIVE
- **Preview de Cálculos**: Muestra descuento, IVA y precio final
- **Lista de Productos**: Cards clicables con resumen
- **Botones**: Editar, Eliminar, Crear Nuevo

---

## 🎯 Tipos de Cliente: Backend vs Frontend

### Backend (Java Enum)
```java
public enum CustomerType {
  REGULAR,
  EXECUTIVE,
  ADMINISTRATIVE
}
```

### Frontend (TypeScript)
```typescript
const CUSTOMER_TYPES = [
  { code: 'REGULAR', label: 'Cliente Regular', discount: 5 },
  { code: 'EXECUTIVE', label: 'Ejecutivo', discount: 15 },
  { code: 'ADMINISTRATIVE', label: 'Administrativo', discount: 10 },
];
```

### En Desplegable
```html
<select>
  <option value="REGULAR">Cliente Regular (5% descuento)</option>
  <option value="EXECUTIVE">Ejecutivo (15% descuento)</option>
  <option value="ADMINISTRATIVE">Administrativo (10% descuento)</option>
</select>
```

---

## 🔄 Descuentos Alineados

| Tipo Cliente | Backend | Frontend | URL API |
|---|---|---|---|
| REGULAR | 5% | 5% | /api/v1/pricing-service/prices |
| EXECUTIVE | 15% | 15% | /api/v1/pricing-service/prices |
| ADMINISTRATIVE | 10% | 10% | /api/v1/pricing-service/prices |
| IVA (Todos) | 19% | 19% | /api/v1/pricing-service/prices |

---

## 📚 Ejemplo Real: Paso a Paso

### Entrada (Usuario)
```json
{
  "productName": "Monitor ASUS 27\"",
  "amount": 300,
  "customerType": "EXECUTIVE"
}
```

### Cálculo Frontend (Preview)
```typescript
// completeProductData()
descuento = 300 × 15% = 45
base con desc = 255
iva = 255 × 19% = 48.45
FINAL = 303.45
```

### Cálculo Backend (Definitivo)
```java
// calculatePricing()
descuento = 300 × 15% = 45
base con desc = 255
iva = 255 × 19% = 48.45
FINAL = 303.45
```

### Salida (BD + API)
```json
{
  "id": 5,
  "productName": "Monitor ASUS 27\"",
  "amount": 300,
  "customerType": "EXECUTIVE",
  "discountPercentage": 15,
  "taxPercentage": 19,
  "finalPrice": 303.45,
  "createdAt": "2026-06-04T15:30:00"
}
```

### Lo que Ve el Usuario
```
Nombre: Monitor ASUS 27"
Precio base: $300
Tipo cliente: Ejecutivo (15% descuento)

Descuento: 15%
IVA: 19%
PRECIO FINAL: $303.45

[Editar] [Eliminar] [Cerrar]
```

---

## 🚀 Cómo Probar Localmente

### 1. Requisitos
- Backend corriendo: `http://localhost:8081` (Spring Boot)
- PostgreSQL disponible
- Frontend corriendo: `http://localhost:4200` (Angular)

### 2. Iniciar Frontend
```powershell
npm install
npm start
```

### 3. Navegar a Precios
- Navbar → clic en "Precios"
- URL: `http://localhost:4200/precios`

### 4. Crear Producto
```
Nombre: Laptop
Precio: 1000
Tipo: EXECUTIVE
```

### 5. Verificar Frontend
- Muestra preview: 15% descuento, 19% IVA, $1011.50 final

### 6. Verificar Backend
```bash
# Consultar API
curl http://localhost:8081/api/v1/pricing-service/prices

# Resultado
[
  {
    "id": 1,
    "productName": "Laptop",
    "amount": 1000,
    "customerType": "EXECUTIVE",
    "discountPercentage": 15,
    "taxPercentage": 19,
    "finalPrice": 1011.50,
    "createdAt": "2026-06-04T..."
  }
]
```

---

## 🔗 Endpoints Backend (REST API)

Base URL: `http://localhost:8081/api/v1/pricing-service/prices`

| Endpoint | Método | Descripción |
|----------|--------|-------------|
| `/` | GET | Obtener todos |
| `/{id}` | GET | Obtener por ID |
| `/` | POST | Crear nuevo |
| `/{id}` | PUT | Actualizar |
| `/{id}` | DELETE | Eliminar |
| `/page/{pageNumber}` | GET | Paginado |

---

## ✅ Checklist de Alineación

- ✅ Campo `amount` (no `basePrice`)
- ✅ Tipos: `REGULAR`, `EXECUTIVE`, `ADMINISTRATIVE`
- ✅ Descuentos: 5%, 15%, 10%
- ✅ IVA: 19% (siempre)
- ✅ Cálculos alineados (preview local = backend)
- ✅ API URLs correctas
- ✅ DTOs coinciden
- ✅ Validaciones sincronizadas
- ✅ Mensajes de error uniformes (SweetAlert2)
- ✅ Documentación completa

---

## 🎓 Tecnologías Demostradas

### Backend (Java)
- ✅ Spring Boot
- ✅ REST API
- ✅ DTO Pattern
- ✅ Validaciones (@NotNull, @Positive, etc.)
- ✅ JPA/Hibernate
- ✅ PostgreSQL
- ✅ Paginación
- ✅ Swagger/OpenAPI
- ✅ @PrePersist (Reglas automáticas)
- ✅ Architecture: Controller → Service → Repository

### Frontend (Angular)
- ✅ Reactive Programming (Observables, RxJS)
- ✅ HTTP Client (CRUD)
- ✅ Two-Way Data Binding ([ngModel])
- ✅ Component-Based Architecture
- ✅ Services & Dependency Injection
- ✅ FormsModule & Validation
- ✅ Standalone Components
- ✅ TypeScript (Type Safety)
- ✅ CSS Modern (Flexbox, Grid)
- ✅ SweetAlert2 (Modal Interactions)

---

## 📎 Integración Completa

La carpeta de precios **NO** funciona de forma aislada. Requiere:

1. **Backend Microservicio** corriendo en puerto 8081
2. **PostgreSQL** con tabla `price`
3. **Rutas Angular** configuradas (✅ ya está)
4. **Navbar** integrado (✅ ya está)
5. **HTTP Client** en AppModule (✅ ya está)

---

## 🎉 Conclusión

Ahora tienes un **sistema completo de gestión de precios** que demuestra:
- Comunicación Frontend ↔ Backend
- Reglas de negocio automatizadas
- Validaciones en capas
- Preview en tiempo real
- CRUD completo
- Clean Architecture
- Best Practices en ambos lados

**¡Listo para producción!** 🚀


