<?php
require_once __DIR__ . '/includes/auth.php';
require_login();
$userNombre = current_user_name();
?>
<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    
    <title>Oryon Gaming – Biblioteca</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;600;900&family=Rajdhani:wght@500;600&family=Material+Icons&display=swap" rel="stylesheet">
    <link rel="stylesheet" href="css/styles.css">
    <link rel="stylesheet" href="css/biblioteca.css">
</head>
<body>

<!-- ————————————————————————————————————————————————
     INTERRUPTOR MENÚ MÓVIL
     ———————————————————————————————————————————————— -->
<input type="checkbox" id="toggle-menu">

<!-- ————————————————————————————————————————————————
     HEADER – versión CON sesión
     ———————————————————————————————————————————————— -->
<header><div class="contenedor">
        <a href="home-sesion.php" class="logo">Oryon Gaming</a>

        <div class="buscador">
            <span class="material-icons">search</span>
            <input type="text" placeholder="Buscar en tu biblioteca...">
        </div>

        <nav>
            <button class="btn-biblioteca-activo" onclick="window.location.href='biblioteca.php'"><span class="material-icons">library_books</span> Biblioteca</button>

            <!-- Botón carrito con badge de cantidad -->
            <a href="carrito.php" class="btn-carrito-header">
                <span class="material-icons">shopping_cart</span> Carrito
                <span id="carrito-badge" class="carrito-badge" style="display:none;">0</span>
            </a>

            <span><span class="material-icons">person</span> <?php echo htmlspecialchars($userNombre, ENT_QUOTES, 'UTF-8'); ?></span>

            <!-- Salir: borra la sesión y va al home sin sesión -->
            <a href="api/logout.php" class="btn-salir">
                <span class="material-icons">logout</span>
            </a>
        </nav>

        <label for="toggle-menu" class="hamburguesa">
            <span></span><span></span><span></span>
        </label>
    </div>
</header>

<!-- MenÃº móvil -->
<div class="menu-movil">
    <button class="btn-biblioteca-activo" onclick="window.location.href='biblioteca.php'"><span class="material-icons">library_books</span> Biblioteca</button>
    <a href="carrito.php"><span class="material-icons">shopping_cart</span> Carrito</a>
    <span><span class="material-icons">person</span> <?php echo htmlspecialchars($userNombre, ENT_QUOTES, 'UTF-8'); ?></span>
    <a href="api/logout.php" class="btn-salir-movil"><span class="material-icons">logout</span> Salir</a>
</div>

<!-- ————————————————————————————————————————————————
     MAIN – Biblioteca de juegos
     ———————————————————————————————————————————————— -->
<main>
    <div class="biblioteca-pagina">
        <div class="contenedor">

            <div class="biblioteca-header">
                <h1>Mi Biblioteca</h1>
                <p>Juegos que has adquirido</p>
            </div>

            <!-- Layout: grid de juegos a la izquierda, resumen a la derecha -->
            <div class="biblioteca-layout">

                <!-- Grid de juegos -->
                <div class="biblioteca-grid" id="biblioteca-grid">
                    <!-- Los juegos se cargan aquí con JavaScript -->
                </div>

                <!-- Panel lateral con estadísticas -->
                <div class="biblioteca-resumen">
                    <h2>Estadísticas</h2>
                    <div class="resumen-stats">
                        <div class="stat">
                            <span class="stat-numero" id="total-juegos">0</span>
                            <span class="stat-label">Juegos</span>
                        </div>
                        <div class="stat">
                            <span class="stat-numero" id="total-gastado">$0</span>
                            <span class="stat-label">Gastado</span>
                        </div>
                        <div class="stat">
                            <span class="stat-numero" id="ultima-compra">-</span>
                            <span class="stat-label">Última compra</span>
                        </div>
                    </div>

                    <div class="resumen-acciones">
                        <a href="home-sesion.php" class="btn-explorar">Explorar más juegos</a>
                        <a href="carrito.php" class="btn-ver-carrito">Ver carrito</a>
                    </div>
                </div>

            </div>

            <!-- Estado vacío -->
            <div class="biblioteca-vacia" id="biblioteca-vacia" style="display: none;">
                <div class="vacia-contenido">
                    <span class="material-icons vacia-icono">library_add</span>
                    <h3>AÃºn no tienes juegos</h3>
                    <p>Â¡Explora nuestra colección y agrega juegos a tu carrito!</p>
                    <a href="home-sesion.php" class="btn-explorar-vacia">Explorar juegos</a>
                </div>
            </div>

        </div>
    </div>
</main>

<script src="js/carrito.js"></script> <!-- Para el badge del carrito -->
<script src="js/licencias.js"></script>
<script src="js/compras.js"></script>
<script src="js/juegos-data.js"></script>
<script src="js/biblioteca.js"></script>
<script src="js/buscar.js"></script>

</body>
</html>





