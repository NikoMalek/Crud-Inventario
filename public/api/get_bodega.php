<?php
include 'db.php';

$sql = "SELECT * FROM bodegas ORDER BY nombre ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$bodegas = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($bodegas);