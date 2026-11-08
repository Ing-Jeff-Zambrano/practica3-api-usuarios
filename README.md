# API REST Usuarios - Practica 3

API REST desarrollada con **Node.js**, **Express** y **PostgreSQL** para la asignatura Desarrollo Web (UNEMI).

## Tecnologias

- Node.js
- Express
- PostgreSQL
- pg (cliente de PostgreSQL)
- dotenv
- Postman (pruebas)

## Funcionalidades (CRUD)

| Metodo | Endpoint | Descripcion |
|--------|----------|-------------|
| POST | `/usuarios` | Registrar usuario |
| GET | `/usuarios` | Listar todos los usuarios |
| GET | `/usuarios/:id` | Consultar usuario por ID |
| PUT | `/usuarios/:id` | Actualizar usuario |
| DELETE | `/usuarios/:id` | Eliminar usuario |

## Estructura del proyecto

```
practica3-api-usuarios/
├── backend/
│   ├── sql/
│   │   └── init.sql
│   ├── src/
│   │   ├── config/
│   │   │   └── db.js
│   │   ├── controllers/
│   │   │   └── usuarios.controller.js
│   │   ├── routes/
│   │   │   └── usuarios.routes.js
│   │   ├── app.js
│   │   └── index.js
│   ├── .env.example
│   ├── .gitignore
│   └── package.json
├── .gitignore
└── README.md
```

## Requisitos previos

1. Node.js instalado
2. PostgreSQL en ejecucion
3. Navicat u otra herramienta para administrar la base de datos

## Configuracion

### 1. Crear la base de datos

En Navicat (o psql), ejecuta el script `backend/sql/init.sql`:

1. Crea la base `practica3_db`
2. Conectate a esa base
3. Crea la tabla `usuarios`

### 2. Configurar variables de entorno

Dentro de `backend`, copia `.env.example` a `.env` y ajusta tus credenciales:

```env
PORT=3000
DB_HOST=127.0.0.1
DB_PORT=5433
DB_USER=awr_user
DB_PASSWORD=tu_password
DB_NAME=practica3_db
```

### 3. Instalar dependencias

```bash
cd backend
npm install
```

### 4. Ejecutar el servidor

```bash
# desarrollo (recarga automatica)
npm run dev

# produccion
npm start
```

Servidor: `http://localhost:3000`

## Ejemplos para Postman

### Registrar usuario

`POST http://localhost:3000/usuarios`

Body (JSON):

```json
{
  "nombre": "Maria Gomez",
  "email": "maria.gomez@email.com",
  "telefono": "0999999999"
}
```

### Listar usuarios

`GET http://localhost:3000/usuarios`

### Consultar por ID

`GET http://localhost:3000/usuarios/1`

### Actualizar usuario

`PUT http://localhost:3000/usuarios/1`

```json
{
  "nombre": "Maria Gomez Actualizada",
  "email": "maria.gomez@email.com",
  "telefono": "0988888888"
}
```

### Eliminar usuario

`DELETE http://localhost:3000/usuarios/1`

## Autor

Ing-Jeff-Zambrano  
Universidad Estatal de Milagro (UNEMI)
