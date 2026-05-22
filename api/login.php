<?php

require_once __DIR__ . '/bootstrap.php';
require_once __DIR__ . '/db.php';

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    json_response(405, ['ok' => false, 'message' => 'Método no permitido.']);
}

$body = read_json_body();

$email = strtolower(trim((string)($body['email'] ?? '')));
$password = (string)($body['password'] ?? '');

if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    json_response(422, ['ok' => false, 'message' => 'Ingresa un email válido.']);
}

if ($password === '') {
    json_response(422, ['ok' => false, 'message' => 'Ingresa tu contraseña.']);
}

$conn = db_connect();

$stmt = $conn->prepare('SELECT id, nombre, email, password_hash FROM usuarios WHERE email = ? LIMIT 1');
$stmt->bind_param('s', $email);
$stmt->execute();
$result = $stmt->get_result();

if (!$result || $result->num_rows === 0) {
    $stmt->close();
    $conn->close();
    json_response(401, ['ok' => false, 'message' => 'Email o contraseña incorrectos.']);
}

$user = $result->fetch_assoc();
$stmt->close();
$conn->close();

if (!password_verify($password, (string)$user['password_hash'])) {
    json_response(401, ['ok' => false, 'message' => 'Email o contraseña incorrectos.']);
}

$_SESSION['user_id'] = (int)$user['id'];
$_SESSION['user_nombre'] = (string)$user['nombre'];
$_SESSION['user_email'] = (string)$user['email'];

json_response(200, [
    'ok' => true,
    'message' => 'Inicio de sesión exitoso.',
    'user' => [
        'id' => (int)$user['id'],
        'nombre' => (string)$user['nombre'],
        'email' => (string)$user['email']
    ]
]);
