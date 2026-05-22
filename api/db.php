<?php

require_once __DIR__ . '/config.php';

function db_connect(): mysqli
{
    $conn = @new mysqli(DB_HOST, DB_USER, DB_PASS, DB_NAME);

    if ($conn->connect_error) {
        json_response(500, [
            'ok' => false,
            'message' => 'No se pudo conectar a la base de datos.'
        ]);
    }

    $conn->set_charset('utf8mb4');
    return $conn;
}
