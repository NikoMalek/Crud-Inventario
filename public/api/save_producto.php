<?php
include 'db.php';

include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);

$codigo = $data['codigo'];
$nombre = $data['nombre'];
$bodega_id = $data['bodega_id'];
$sucursal_id = $data['sucursal_id'];
$moneda_id = $data['moneda_id'];
$precio = $data['precio'];
$descripcion = $data['descripcion'];
$materiales = $data['material']; // array

try {
    $pdo->beginTransaction();

    // Insertar producto
    $sql = "INSERT INTO productos (codigo, nombre, bodega_id, sucursal_id, moneda_id, precio, descripcion) VALUES (?, ?, ?, ?, ?, ?, ?)";
    $stmt = $pdo->prepare($sql);
    $stmt->execute([$codigo, $nombre, $bodega_id, $sucursal_id, $moneda_id, $precio, $descripcion]);

    $producto_id = $pdo->lastInsertId();

    // Insertar materiales
    if (is_array($materiales)) {
        $sqlMat = "INSERT INTO producto_materiales (producto_id, material) VALUES (?, ?)";
        $stmtMat = $pdo->prepare($sqlMat);
        foreach ($materiales as $mat) {
            $stmtMat->execute([$producto_id, $mat]);
        }
    }

    $pdo->commit();
    echo json_encode(["message" => "Producto guardado exitosamente"]);
} catch (Exception $e) {
    $pdo->rollBack();
    echo json_encode(["message" => "Error al guardar el producto", "error" => $e->getMessage()]);
}
?>