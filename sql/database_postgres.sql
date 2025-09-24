-- sql/schema_postgres.sql
-- Crear BD 
CREATE DATABASE productos_db WITH ENCODING 'UTF8';

-- Tablas de catálogo
CREATE TABLE IF NOT EXISTS bodegas (
  id SERIAL PRIMARY KEY,
  nombre VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS sucursales (
  id SERIAL PRIMARY KEY,
  bodega_id INT NOT NULL REFERENCES bodegas(id) ON DELETE CASCADE,
  nombre VARCHAR(80) NOT NULL
);

CREATE TABLE IF NOT EXISTS monedas (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(10) NOT NULL UNIQUE,
  nombre VARCHAR(50) NOT NULL
);

-- Productos
CREATE TABLE IF NOT EXISTS productos (
  id SERIAL PRIMARY KEY,
  codigo VARCHAR(15) NOT NULL UNIQUE,
  nombre VARCHAR(50) NOT NULL,
  bodega_id INT NOT NULL REFERENCES bodegas(id),
  sucursal_id INT NOT NULL REFERENCES sucursales(id),
  moneda_id INT NOT NULL REFERENCES monedas(id),
  precio NUMERIC(12,2) NOT NULL CHECK (precio > 0),
  descripcion TEXT NOT NULL,
  creado_en TIMESTAMP NOT NULL DEFAULT NOW()
);

-- Materiales
CREATE TABLE IF NOT EXISTS producto_materiales (
  id SERIAL PRIMARY KEY,
  producto_id INT NOT NULL REFERENCES productos(id) ON DELETE CASCADE,
  material VARCHAR(30) NOT NULL
);


-- Datos de ejemplo

INSERT INTO bodegas (nombre) VALUES
  ('Bodega 1'), ('Bodega 2')
ON CONFLICT DO NOTHING;

-- sucursales ligadas a bodegas
INSERT INTO sucursales (bodega_id, nombre) VALUES
  (1, 'Sucursal 1'), (1, 'Sucursal 2'),
  (2, 'Sucursal A'), (2, 'Sucursal B')
ON CONFLICT DO NOTHING;

INSERT INTO monedas (codigo, nombre) VALUES
  ('USD', 'DOLAR'),
  ('CLP', 'PESO CHILENO'),
  ('PEN', 'SOL PERUANO')
ON CONFLICT (codigo) DO NOTHING;
