<?php
// public/api/check_codigo.php
include 'db.php';

$data = json_decode(file_get_contents('php://input'), true);
$codigo = $data['codigo'];
$sql = "SELECT COUNT(*) FROM productos WHERE codigo = ?";
$stmt = $pdo->prepare($sql);
$stmt->execute([$codigo]);
$existe = $stmt->fetchColumn();

echo json_encode(['unico' => $existe == 0]);
?>