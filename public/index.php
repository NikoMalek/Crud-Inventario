<?php 
  // Formulario de Producto
?>
<!DOCTYPE html>
<html lang="es">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <link rel="stylesheet" href="assets/styles.css">
  <title>Formulario de Producto</title>
</head>
<body>
  <div class="container">
    <h1>Formulario de Producto</h1>
    <form id="productForm">
      <div class="grid">
        <div class="field">
          <label for="codigo">Código</label>
          <input id="codigo" type="text" name="codigo" placeholder="Ingrese el código" maxlength="15">
        </div>

        <div class="field">
          <label for="nombre">Nombre</label>
          <input id="nombre" type="text" name="nombre" placeholder="Ingrese el nombre" maxlength="50">
        </div>

        <div class="field">
          <label for="bodega">Bodega</label>
          <select id="bodega" name="bodega">
            <option value="">Seleccione una bodega</option>
          </select>
        </div>

        <div class="field">
          <label for="sucursal">Sucursal</label>
          <select id="sucursal" name="sucursal" disabled>
            <option value="">Seleccione una sucursal</option>
          </select>
        </div>


        <div class="field">
          <label for="moneda">Moneda</label>
          <select id="moneda" name="moneda">
            <option value="">Seleccione una moneda</option>
          </select>
        </div>

        <div class="field">
          <label for="precio">Precio</label>
          <input id="precio" type="number" name="precio" placeholder="Ingrese el precio">
        </div>
      </div>

      <fieldset class="materiales">
        <legend>Material del producto</legend>
        <label><input type="checkbox" name="material[]" value="Plástico"> Plástico</label>
        <label><input type="checkbox" name="material[]" value="Metal"> Metal</label>
        <label><input type="checkbox" name="material[]" value="Madera"> Madera</label>
        <label><input type="checkbox" name="material[]" value="Vidrio"> Vidrio</label>
        <label><input type="checkbox" name="material[]" value="Textil"> Textil</label>
      </fieldset>

      <div class="field">
        <label for="descripcion">Descripción</label>
        <textarea id="descripcion" name="descripcion" rows="4" placeholder="Ingrese una descripción" maxlength="1000"></textarea>
      </div>

      <button type="button" id="submitBtn">Guardar Producto</button>
    </form>

    <p id="message" class="hidden"></p>

  </div>
  <script src="assets/app.js"></script>
</body>
</html>