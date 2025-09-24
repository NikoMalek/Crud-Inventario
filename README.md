# Crud Inventario

Proyecto: Sistema de Registro de Productos (HTML + CSS + JS + PHP + PostgreSQL)

Requisitos
- PHP
- PostgreSQL
- Extensión pdo_pgsql habilitada

Instalación
1) Crear BD y tablas:
   - Edite, si desea, el nombre de la BD en sql/database_postgres.sql.
   - Importe el archivo:
     psql -U postgres -h localhost -f sql/database_postgres.sql

2) Configurar conexión:
   - En public/api/db.php ajuste variables:
     DB_HOST, DB_PORT, DB_NAME, DB_USER, DB_PASS

3) Servir la app:
   - Con servidor embebido de PHP:
     cd public
     php -S localhost:8080
   - Abra http://localhost:8080

Uso
- El formulario carga Bodega, Sucursal (dependiente) y Moneda desde la BD.
- Valida en JavaScript (sin "required"), muestra alertas personalizadas.
- Verifica por AJAX la unicidad de "Código".
- Envía vía AJAX a PHP y guarda (productos + materiales).

Estructura
- public/index.php          -> interfaz HTML
- public/assets/styles.css  -> estilos (Arial 16px, botón #1aab8a)
- public/assets/app.js      -> lógica JS y AJAX
- public/api/*.php          -> endpoints PHP (sin framework)
- sql/schema_postgres.sql   -> tablas y datos base

