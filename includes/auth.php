<?php

if (session_status() !== PHP_SESSION_ACTIVE) {
    session_start();
}

function require_login(): void
{
    if (empty($_SESSION['user_id'])) {
        header('Location: /login.html');
        exit;
    }
}

function current_user_name(): string
{
    return isset($_SESSION['user_nombre']) ? (string)$_SESSION['user_nombre'] : 'Usuario';
}
