<?php

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

$body = read_json_body();

$nombre = trim((string)($body['nombre'] ?? ''));
$email = strtolower(trim((string)($body['email'] ?? '')));
$password = (string)($body['password'] ?? '');

if ($nombre === '') {
    json_response(422, ['ok' => false, 'message' => 'Ingresa tu nombre.']);
}

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['ok' => false, 'message' => 'Ingresa un email válido.']);
}

if (strlen($password) < 6) {
    json_response(422, ['ok' => false, 'message' => 'La contraseña debe tener al menos 6 caracteres.']);
}

$conn = db_connect();

$checkStmt = $conn->prepare('SELECT id FROM usuarios WHERE email = ? LIMIT 1');
$checkStmt->bind_param('s', $email);
$checkStmt->execute();
$checkResult = $checkStmt->get_result();

if ($checkResult && $checkResult->num_rows > 0) {
    $checkStmt->close();
    $conn->close();
    json_response(409, ['ok' => false, 'message' => 'Este email ya está registrado.']);
}

$checkStmt->close();

$hash = password_hash($password, PASSWORD_DEFAULT);

$insertStmt = $conn->prepare('INSERT INTO usuarios (nombre, email, password_hash, creado_en) VALUES (?, ?, ?, NOW())');
$insertStmt->bind_param('sss', $nombre, $email, $hash);

if (!$insertStmt->execute()) {
    $insertStmt->close();
    $conn->close();
    json_response(500, ['ok' => false, 'message' => 'No se pudo registrar el usuario.']);
}

$userId = (int)$insertStmt->insert_id;
$insertStmt->close();
$conn->close();

$_SESSION['user_id'] = $userId;
$_SESSION['user_nombre'] = $nombre;
$_SESSION['user_email'] = $email;

json_response(200, [
    'ok' => true,
    'message' => 'Cuenta creada correctamente.',
    'user' => [
        'id' => $userId,
        'nombre' => $nombre,
        'email' => $email
    ]
]);
