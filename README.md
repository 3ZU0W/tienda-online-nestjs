# Tienda Online API — Práctica TAW-251

API REST para gestionar una tienda online (clientes, categorías, productos y órdenes),
construida con **NestJS + TypeORM + PostgreSQL** siguiendo arquitectura en N-capas
(Controller → Service → Repository).

## Tecnologías

- NestJS 11
- TypeORM 0.3
- PostgreSQL
- class-validator / class-transformer (validación de DTOs)
- Scalar + @nestjs/swagger (documentación en `/api`)

## Estructura (un módulo por entidad)

```
src/
├── clientes/        # módulo Cliente
├── categorias/      # módulo Categoria
├── productos/       # módulo Producto
├── ordenes/         # módulo Orden
├── orden-producto/  # módulo intermedio (relación N:M con cantidad y precio)
├── app.module.ts
└── main.ts
```

Cada módulo contiene su `controller`, `service`, `entity` y sus DTOs
(`CreateXxxDto` y `UpdateXxxDto` con `PartialType`).

## Relaciones implementadas (TypeORM)

| Relación | Entidades | Decoradores |
|----------|-----------|-------------|
| 1 : N | Categoría → Producto | `@OneToMany` / `@ManyToOne` + `@JoinColumn` |
| 1 : N | Cliente → Orden | `@OneToMany` / `@ManyToOne` + `@JoinColumn` |
| N : M | Orden ↔ Producto | tabla intermedia `orden_producto` con dos `@ManyToOne` |

> La relación N:M se implementa con una **entidad intermedia explícita**
> (`orden_producto`) porque guarda datos adicionales (`cantidad` y
> `precio_unitario`). Es el patrón recomendado por TypeORM cuando la tabla
> de unión necesita columnas propias.

## Requisitos previos

- Node.js 18+ (recomendado 20 o 22)
- PostgreSQL instalado y corriendo
- npm

## Ejecutar localmente

1. Clonar el repositorio:
   ```bash
   git clone <URL-de-tu-repo>
   cd tienda-online-nestjs
   ```

2. Instalar dependencias:
   ```bash
   npm install
   ```

3. Crear la base de datos en PostgreSQL:
   ```sql
   CREATE DATABASE tienda_online;
   ```

4. Crear el archivo `.env` a partir del ejemplo y poner tus credenciales:
   ```bash
   cp .env.example .env
   ```
   ```env
   DB_HOST=localhost
   DB_PORT=5432
   DB_USERNAME=postgres
   DB_PASSWORD=tu_password
   DB_NAME=tienda_online
   PORT=3000
   ```

5. Arrancar el servidor:
   ```bash
   npm run start:dev
   ```

Como `synchronize: true`, TypeORM crea las tablas automáticamente al iniciar.

- API: `http://localhost:3000`
- Documentación Scalar: `http://localhost:3000/api`
- JSON OpenAPI: `http://localhost:3000/openapi.json`

## Endpoints

### Clientes — `/clientes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/clientes` | Listar todos |
| GET | `/clientes/:id` | Obtener por id |
| POST | `/clientes` | Crear |
| PATCH | `/clientes/:id` | Actualizar |
| DELETE | `/clientes/:id` | Eliminar |

### Categorías — `/categorias`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/categorias` | Listar todas |
| GET | `/categorias/:id` | Obtener por id (incluye sus productos) |
| POST | `/categorias` | Crear |
| PATCH | `/categorias/:id` | Actualizar |
| DELETE | `/categorias/:id` | Eliminar |

### Productos — `/productos`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/productos` | Listar todos |
| GET | `/productos/:id` | Obtener por id (incluye su categoría) |
| POST | `/productos` | Crear (requiere `idCategoria` existente) |
| PATCH | `/productos/:id` | Actualizar |
| DELETE | `/productos/:id` | Eliminar |

### Órdenes — `/ordenes`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/ordenes` | Listar todas |
| GET | `/ordenes/:id` | Obtener por id con todos sus productos |
| POST | `/ordenes` | Crear (asociada a un cliente existente) |
| PATCH | `/ordenes/:id` | Actualizar el estado |
| DELETE | `/ordenes/:id` | Eliminar |

### Orden-Producto — `/orden_producto`
| Método | Ruta | Descripción |
|--------|------|-------------|
| GET | `/orden_producto` | Listar todas |
| GET | `/orden_producto/:id` | Obtener por id |
| POST | `/orden_producto` | Crear (incluye `idOrden`) |
| PATCH | `/orden_producto/:id` | Actualizar cantidad o precio unitario |
| DELETE | `/orden_producto/:id/productos/:productId` | Quitar un producto de la orden |

## Ejemplos de body (POST)

Crear cliente:
```json
{
  "nombres": "Juan Carlos",
  "paterno": "Pérez",
  "materno": "Gómez",
  "email": "juan.perez@email.com"
}
```

Crear categoría:
```json
{ "nombre": "Electrónica", "descripcion": "Productos electrónicos" }
```

Crear producto:
```json
{
  "idCategoria": 1,
  "nombre": "Laptop Lenovo",
  "descripcion": "14 pulgadas, 16GB RAM",
  "precio": 1200.50,
  "stock": 25
}
```

Crear orden:
```json
{ "idCliente": 1, "estado": "pendiente" }
```

Agregar producto a una orden:
```json
{ "idOrden": 1, "idProducto": 1, "cantidad": 2, "precio_unitario": 1200.50 }
```

## Despliegue en Render (Práctica 2)

Ver la sección de pasos en la entrega. En resumen:

1. Crear una base de datos **PostgreSQL** en Render.
2. Crear un **Web Service** apuntando a este repositorio.
   - Build Command: `npm install && npm run build`
   - Start Command: `npm run start:prod`
3. Configurar las variables de entorno (`DB_HOST`, `DB_PORT`, `DB_USERNAME`,
   `DB_PASSWORD`, `DB_NAME`) con los datos de la base de Render, más `DB_SSL=true`.
4. La URL pública quedará como `https://<tu-app>.onrender.com` y la documentación
   en `https://<tu-app>.onrender.com/api`.
