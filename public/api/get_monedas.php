<?php
include 'db.php';

$sql = "SELECT * FROM monedas ORDER BY nombre ASC";
$stmt = $pdo->prepare($sql);
$stmt->execute();
$monedas = $stmt->fetchAll(PDO::FETCH_ASSOC);

header('Content-Type: application/json');
echo json_encode($monedas); 