# Librarian

Sistema de biblioteca con backend en Node.js, Express 5 y MySQL, y frontend en HTML, CSS y JavaScript. Tiene dos roles: **administrador**, que gestiona libros, préstamos, ventas y clientes, y **usuario**, que se registra, administra su perfil y consulta sus préstamos y compras.

## Características

**Administrador**
- Crear, editar, listar, buscar y eliminar libros, con control de stock.
- Registrar préstamos y devoluciones. Cada préstamo descuenta o devuelve un ejemplar.
- Registrar ventas de uno o varios libros. El total se calcula en el servidor.
- Crear y consultar clientes.

**Usuario**
- Registrarse. Al crear la cuenta se crea también su registro de cliente.
- Editar su perfil sin cambiar su ID.
- Ver su historial de préstamos y de compras.

## Tecnologías

- Node.js 18 o superior
- Express 5
- MySQL 8 con mysql2
- JWT para autenticación
- bcryptjs para cifrar contraseñas
- express-validator para validar datos
- nodemon para desarrollo

## Requisitos

- Node.js 18 o superior
- npm 9 o superior
- MySQL 8.0 o superior

## Instalación

1. Instala las dependencias:

   ```bash
   npm install
   ```

2. Crea la base de datos y sus tablas:

   ```bash
   mysql -u root -p < sql/schema.sql
   ```

3. Copia la plantilla de variables de entorno y ajústala:

   ```bash
   cp .env.example .env
   ```

   Como mínimo, cambia `DB_PASSWORD` y `JWT_SECRET`.

4. Crea el administrador inicial:

   ```bash
   npm run crear-admin
   ```

5. Inicia el servidor:

   ```bash
   npm run dev
   ```

6. Abre http://localhost:3000 en el navegador.

## Variables de entorno

| Variable | Descripción | Ejemplo |
|----------|-------------|---------|
| `PORT` | Puerto del servidor | `3000` |
| `DB_HOST` | Servidor de MySQL | `localhost` |
| `DB_PORT` | Puerto de MySQL | `3306` |
| `DB_USER` | Usuario de MySQL | `root` |
| `DB_PASSWORD` | Contraseña de MySQL | `tu_password` |
| `DB_NAME` | Nombre de la base de datos | `biblioteca` |
| `JWT_SECRET` | Clave para firmar los tokens | `una_clave_larga_y_aleatoria` |
| `JWT_EXPIRA` | Duración del token | `8h` |
| `ADMIN_NOMBRE` | Nombre del administrador inicial | `Administrador` |
| `ADMIN_EMAIL` | Correo del administrador inicial | `admin@biblioteca.com` |
| `ADMIN_PASSWORD` | Contraseña del administrador inicial | `admin123` |

## Scripts

| Comando | Descripción |
|---------|-------------|
| `npm start` | Inicia el servidor |
| `npm run dev` | Inicia el servidor y lo reinicia al guardar cambios |
| `npm run crear-admin` | Crea el administrador a partir del `.env` |

## Estructura del proyecto

```
librarian/
├── docs/            Documentación técnica completa
├── public/          Frontend: pantallas, estilos y scripts del navegador
├── sql/             Script de creación de la base de datos
├── src/
│   ├── config/      Conexión a MySQL
│   ├── controllers/ Recibe las peticiones y responde
│   ├── dtos/        Formato de los datos que salen de la API
│   ├── middlewares/ Autenticación, roles, validación y errores
│   ├── models/      Consultas SQL
│   ├── routes/      Definición de las rutas
│   ├── services/    Reglas de negocio
│   ├── utils/       JWT, errores propios, transacciones y script de administrador
│   └── validators/  Reglas de validación de cada petición
├── .env.example
└── package.json
```

## API

Todas las rutas empiezan con `/api`. Las rutas protegidas requieren la cabecera `Authorization: Bearer <token>`.

| Método | Ruta | Acceso | Descripción |
|--------|------|--------|-------------|
| POST | `/auth/registro` | Público | Crear cuenta de usuario |
| POST | `/auth/login` | Público | Iniciar sesión |
| GET, PUT | `/usuario/perfil` | Usuario | Ver y editar el perfil |
| GET | `/usuario/prestamos` | Usuario | Historial de préstamos |
| GET | `/usuario/compras` | Usuario | Historial de compras |
| GET | `/usuario/todos` | Admin | Listar usuarios |
| GET | `/libros?busqueda=` | Usuario | Listar o buscar libros |
| GET | `/libros/:id` | Usuario | Ver un libro |
| POST | `/libros` | Admin | Crear libro |
| PUT | `/libros/:id` | Admin | Editar libro |
| DELETE | `/libros/:id` | Admin | Eliminar libro |
| GET, POST | `/prestamos` | Admin | Listar y registrar préstamos |
| PATCH | `/prestamos/:id/devolver` | Admin | Registrar devolución |
| GET, POST | `/ventas` | Admin | Listar y registrar ventas |
| GET, POST | `/clientes` | Admin | Listar y crear clientes |

## Documentación

La documentación técnica completa está en [`docs/DOCUMENTACION.md`](docs/DOCUMENTACION.md). Incluye el modelo de datos, la referencia detallada de la API con ejemplos, los flujos de negocio, las pruebas con curl, la solución de problemas y las limitaciones conocidas.

## Seguridad

- Cambia `ADMIN_PASSWORD` y `JWT_SECRET` antes de usar el sistema fuera de tu equipo.
- No subas `.env` a un repositorio. Ya está incluido en `.gitignore`.
- En producción usa HTTPS y un usuario de MySQL con permisos solo sobre la base `biblioteca`.