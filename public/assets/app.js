async function fetchBodegas() {
    const response = await fetch('/api/get_bodega.php');
    const bodegas = await response.json();
    const bodegaSelect = document.getElementById('bodega');
    bodegaSelect.innerHTML = '<option value="">Seleccione una bodega</option>';
    bodegas.forEach(bodega => {
        const option = document.createElement('option');
        option.value = bodega.id;
        option.textContent = bodega.nombre;
        bodegaSelect.appendChild(option);
    });
}

async function fetchSucursales(bodegaId) {
    const response = await fetch(`/api/get_sucursales.php?bodega_id=${bodegaId}`);
    const sucursales = await response.json();
    const sucursalSelect = document.getElementById('sucursal');
    sucursalSelect.innerHTML = '<option value="">Seleccione una sucursal</option>';
    sucursales.forEach(sucursal => {
        const option = document.createElement('option');
        option.value = sucursal.id;
        option.textContent = sucursal.nombre;
        sucursalSelect.appendChild(option);
    });
}

fetchBodegas();
document.getElementById('bodega').addEventListener('change', function() {
    const bodegaId = this.value;
    fetchSucursales(bodegaId);
    document.getElementById('sucursal').disabled = !bodegaId;
});

async function fetchMonedas() {
    const response = await fetch('/api/get_monedas.php');
    const monedas = await response.json();
    const monedaSelect = document.getElementById('moneda');
    monedaSelect.innerHTML = '<option value="">Seleccione una moneda</option>';
    monedas.forEach(moneda => {
        const option = document.createElement('option');
        option.value = moneda.id;
        option.textContent = moneda.nombre;
        monedaSelect.appendChild(option);
    });
}
fetchMonedas();

// Solo usamos el botón para guardar
document.getElementById('submitBtn').addEventListener('click', async function() {
    const datos = validarFormulario();
    if (!datos) return;
    const esUnico = await codigoEsUnico(datos.codigo);
    if (!esUnico) {
        alert("El código del producto ya existe. Por favor, elija otro código.");
        return;
    }
    try {
        const resp = await fetch('/api/save_producto.php', {
            method: 'POST',
            body: JSON.stringify(datos),
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const respJson = await resp.json();

        if (respJson.message && !respJson.error) {
            alert("Producto guardado exitosamente.");
            document.getElementById('productForm').reset();
        } else {
            alert("Error al guardar el producto: " + (respJson.error || respJson.message));
        }
    } catch (error) {
        console.error("Error:", error);
        alert("Error al guardar el producto.");
    }
});

// Validar formulario
function validarFormulario() {
  const codigo = document.getElementById('codigo').value.trim();
  const nombre = document.getElementById('nombre').value.trim();
  const precio = document.getElementById('precio').value.trim();
  const bodega_id = document.getElementById('bodega').value;
  const sucursal_id = document.getElementById('sucursal').value;
  const moneda_id = document.getElementById('moneda').value;
  const descripcion = document.getElementById('descripcion').value;

  // Código: obligatorio, 5-15, alfanumérico con al menos 1 letra y 1 número, sin otros chars
  if (!codigo) { alert("El código del producto no puede estar en blanco."); return false; }
  if (codigo.length < 5 || codigo.length > 15) {
    alert("El código del producto debe tener entre 5 y 15 caracteres."); return false;
  }
  // regex: solo letras y números, al menos 1 letra y 1 número
  const reCodigo = /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z0-9]+$/;
  if (!reCodigo.test(codigo)) {
    alert("El código del producto debe contener letras y números"); return false;
  }

  // Nombre: obligatorio, 2-50
  if (!nombre) { alert("El nombre del producto no puede estar en blanco."); return false; }
  if (nombre.length < 2 || nombre.length > 50) {
    alert("El nombre del producto debe tener entre 2 y 50 caracteres."); return false;
  }

  // Precio: obligatorio, número positivo con hasta dos decimales
  if (!precio) { alert("El precio del producto no puede estar en blanco."); return false; }
  const rePrecio = /^(?:\d+)(?:\.\d{1,2})?$/; // 0, 1, 2 decimales
  if (!rePrecio.test(precio) || Number(precio) <= 0) {
    alert("El precio del producto debe ser un número positivo con hasta dos decimales."); return false;
  }

  // Materiales: al menos 2
  const material = Array.from(document.querySelectorAll('input[name="material[]"]:checked'))
                          .map(ch => ch.value);
  if (material.length < 2) {
    alert("Debe seleccionar al menos dos materiales para el producto."); return false;
  }

  // Bodega: obligatorio
  if (!bodega_id) { alert("Debe seleccionar una bodega."); return false; }

  // Sucursal: obligatorio (dependiente de bodega)
  if (!sucursal_id) { alert("Debe seleccionar una sucursal para la bodega seleccionada."); return false; }

  // Moneda: obligatorio
  if (!moneda_id) { alert("Debe seleccionar una moneda para el producto."); return false; }

  // Descripción: obligatorio, 10–1000 (cualquier carácter)
  if (!descripcion.trim()) { alert("La descripción del producto no puede estar en blanco."); return false; }
  const len = descripcion.length;
  if (len < 10 || len > 1000) {
    alert("La descripción del producto debe tener entre 10 y 1000 caracteres."); return false;
  }

  return { codigo, nombre, precio, bodega_id, sucursal_id, moneda_id, material, descripcion };
}

// Verificación de unicidad del código contra BD (AJAX)
async function codigoEsUnico(codigo) {
  const resp = await fetch(`/api/verificar_codigo.php`, {
    method: 'POST',
    body: JSON.stringify({ codigo }),
    headers: { 'Content-Type': 'application/json' }
  });
  const respJson = await resp.json();
  return !!respJson.unico;
}