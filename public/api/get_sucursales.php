<?php
include 'db.php';

$sql = "SELECT * FROM sucursales WHERE bodega_id = :bodega_id ORDER BY nombre ASC";
$stmt = $pdo->prepare($sql);  
$stmt->bindParam(':bodega_id', $_GET['bodega_id'], PDO::PARAM_INT);
$stmt->execute();
$sucursales = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($sucursales);