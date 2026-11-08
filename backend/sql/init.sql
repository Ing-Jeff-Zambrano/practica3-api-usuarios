-- Practica 3 - API REST Usuarios
-- Ejecutar en Navicat conectado a PostgreSQL

-- PASO 1: Ejecutar esto conectado a la base "postgres"
CREATE DATABASE practica3_db;

-- PASO 2: Abrir una conexion/consulta a la base "practica3_db"
-- y ejecutar lo siguiente:

CREATE TABLE IF NOT EXISTS usuarios (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  email VARCHAR(150) NOT NULL UNIQUE,
  telefono VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

INSERT INTO usuarios (nombre, email, telefono) VALUES
  ('Ana Lopez', 'ana.lopez@email.com', '0991112233'),
  ('Carlos Perez', 'carlos.perez@email.com', '0987654321')
ON CONFLICT (email) DO NOTHING;
