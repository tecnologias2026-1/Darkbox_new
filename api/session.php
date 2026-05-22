<?php

require_once __DIR__ . '/bootstrap.php';

if (empty($_SESSION['user_id'])) {
    json_response(401, [
        'ok' => false,
        'authenticated' => false,
        'message' => 'No autenticado.'
    ]);
}

json_response(200, [
    'ok' => true,
    'authenticated' => true,
    'user' => [
        'id' => (int)$_SESSION['user_id'],
        'nombre' => (string)($_SESSION['user_nombre'] ?? 'Usuario'),
        'email' => (string)($_SESSION['user_email'] ?? '')
    ]
]);
