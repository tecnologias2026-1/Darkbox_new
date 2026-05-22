/*
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Oryon Gaming â€” carrito.js
   MÃ³dulo central del carrito de compras.

   Este archivo debe estar en la carpeta RAÃZ del proyecto (al lado de
   home.html, home-sesion.html, carrito.html, etc.) para que tanto
   las pÃ¡ginas raÃ­z como las subcarpetas puedan accederlo con:
     - PÃ¡ginas raÃ­z:       src="carrito.js"
     - PÃ¡ginas en carpeta: src="../carrito.js"

   â”€â”€ QUÃ‰ HACE ESTE ARCHIVO â”€â”€
   Define el objeto global "Carrito" con 5 funciones:
     Carrito.agregar(juego)       â†’ agrega un juego al carrito
     Carrito.eliminar(id)         â†’ elimina un juego por su id
     Carrito.obtener()            â†’ devuelve el array de juegos
     Carrito.total()              â†’ suma los precios y devuelve el total
     Carrito.formatearPrecio(num) â†’ convierte 149000 en "$149.000"
     Carrito.notificar(msg, tipo) â†’ muestra un toast (mensaje flotante)
     Carrito.actualizarBadge()    â†’ actualiza el contador rojo del header

   â”€â”€ DÃ“NDE SE GUARDAN LOS DATOS â”€â”€
   En localStorage del navegador, bajo la clave "oryongaming_carrito".
   localStorage persiste aunque se cierre y se abra el navegador.
   Se borra si el usuario limpia los datos del navegador.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
*/

var Carrito = (function () {

    /* â”€â”€ CLAVE de localStorage â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
       Todos los datos del carrito se guardan bajo esta clave.
       Si cambias la clave, los carritos existentes se perderÃ¡n. */
    var CLAVE = 'oryongaming_carrito';
    var CLAVE_ANTIGUA = 'darkbox_carrito';

    function migrarClaveLocalStorage() {
        var valorNuevo = localStorage.getItem(CLAVE);
        var valorAntiguo = localStorage.getItem(CLAVE_ANTIGUA);

        if (valorNuevo === null && valorAntiguo !== null) {
            localStorage.setItem(CLAVE, valorAntiguo);
        }
    }

    migrarClaveLocalStorage();


    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
       FUNCIONES PRIVADAS (solo usadas internamente)
       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

    /* Leer el carrito de localStorage y devolverlo como array.
       JSON.parse convierte el texto guardado en un array de objetos.
       Si no hay nada guardado aÃºn, devuelve un array vacÃ­o []. */
    function leer() {
        var datos = localStorage.getItem(CLAVE);
        var lista = datos ? JSON.parse(datos) : [];

        // Filtrar juegos invÃ¡lidos (sin id o nombre)
        lista = lista.filter(function(juego) {
            return juego && juego.id && juego.nombre && juego.precio;
        });

        return lista;
    }

    /* Guardar el array en localStorage.
       JSON.stringify convierte el array de objetos en texto para guardarlo. */
    function guardar(lista) {
        localStorage.setItem(CLAVE, JSON.stringify(lista));
    }


    /* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
       API PÃšBLICA â€” estas son las funciones que usan las pÃ¡ginas
       â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

    return {

        /* â”€â”€ AGREGAR UN JUEGO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Recibe un objeto con: { id, nombre, genero, precio, imagen }
           Si el juego ya estÃ¡ en el carrito (mismo id) no lo duplica.
           Devuelve true si se agregÃ³, false si ya estaba.

           Ejemplo de uso:
             Carrito.agregar({
               id:     "helldrivers2",
               nombre: "Helldivers 2",
               genero: "AcciÃ³n/Cooperativo",
               precio: 149000,
               imagen: "https://url-de-la-imagen.jpg"
             });
        â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€ */
        agregar: function (juego) {
            var lista = leer();

            /* Buscamos si ya existe un juego con el mismo id.
               .some() devuelve true si al menos un elemento cumple la condiciÃ³n. */
            var yaExiste = lista.some(function (item) {
                return item.id === juego.id;
            });

            if (yaExiste) {
                /* El juego ya estÃ¡ en el carrito, no lo duplicamos */
                return false;
            }

            /* Agregamos el juego al array y lo guardamos */
            lista.push(juego);
            guardar(lista);

            /* Actualizamos el badge del header (contador rojo) */
            this.actualizarBadge();

            return true; /* indica que sÃ­ se agregÃ³ */
        },


        /* â”€â”€ ELIMINAR UN JUEGO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Recibe el id del juego a eliminar.
           .filter() devuelve un nuevo array sin el elemento eliminado. */
        eliminar: function (id) {
            var lista = leer();

            /* Creamos un nuevo array sin el juego con ese id */
            var nueva = lista.filter(function (item) {
                return item.id !== id;
            });

            guardar(nueva);
            this.actualizarBadge();
        },


        /* â”€â”€ OBTENER TODOS LOS JUEGOS â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Devuelve el array completo de juegos en el carrito. */
        obtener: function () {
            return leer();
        },


        /* â”€â”€ CALCULAR TOTAL â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Suma los precios de todos los juegos y devuelve el nÃºmero.
           .reduce() acumula la suma recorriendo el array. */
        total: function () {
            var lista = leer();
            return lista.reduce(function (suma, item) {
                var precio = item.precio;
                if (typeof precio === 'string') {
                    precio = parseFloat(precio.replace(/\$/g, '').replace(/\./g, ''));
                }
                precio = Number(precio) || 0;
                return suma + precio;
            }, 0); /* 0 es el valor inicial de la suma */
        },


        /* â”€â”€ FORMATEAR PRECIO â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Convierte un nÃºmero (ej: 149000) en texto con formato (ej: "$149.000").
           toLocaleString('es-CO') aplica el formato de Colombia (punto como separador). */
        formatearPrecio: function (numero) {
            // Asegurar que es un nÃºmero
            var num = Number(numero);
            if (isNaN(num)) num = 0;
            return '$' + num.toLocaleString('es-CO');
        },


        /* â”€â”€ ACTUALIZAR BADGE DEL HEADER â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Busca en la pÃ¡gina el elemento con id="carrito-badge" y
           muestra la cantidad de juegos en el carrito.
           Si hay 0 juegos, oculta el badge. */
        actualizarBadge: function () {
            var cantidad = leer().length;

            /* Badge principal (header escritorio): id="carrito-badge" */
            var badge = document.getElementById('carrito-badge');
            if (badge) {
                badge.style.display = cantidad === 0 ? 'none' : 'flex';
                badge.textContent = cantidad;
            }

            /* Badge menÃº mÃ³vil: class="carrito-badge-movil"
               Puede haber mÃ¡s de uno, por eso usamos querySelectorAll */
            var badgesMovil = document.querySelectorAll('.carrito-badge-movil');
            for (var i = 0; i < badgesMovil.length; i++) {
                badgesMovil[i].style.display = cantidad === 0 ? 'none' : 'flex';
                badgesMovil[i].textContent = cantidad;
            }
        },


        /* â”€â”€ NOTIFICAR (Toast) â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€â”€
           Muestra un mensaje flotante en la esquina de la pantalla.
           tipo puede ser "ok" (verde) o "aviso" (amarillo).
           El mensaje desaparece automÃ¡ticamente despuÃ©s de 3 segundos.

           Crea dinÃ¡micamente el elemento, lo agrega al body,
           y lo elimina despuÃ©s de la animaciÃ³n. */
        notificar: function (mensaje, tipo) {
            /* Evitar mÃºltiples toasts al mismo tiempo */
            var existente = document.getElementById('oryongaming-toast');
            if (existente) existente.remove();

            /* Creamos el elemento toast */
            var toast = document.createElement('div');
            toast.id = 'oryongaming-toast';

            /* Estilos del toast aplicados directamente con JavaScript */
            toast.style.cssText = [
                'position: fixed',
                'bottom: 28px',
                'right: 28px',
                'z-index: 9999',
                'padding: 14px 22px',
                'border-radius: 10px',
                'font-family: Inter, sans-serif',
                'font-size: 0.95rem',
                'font-weight: 600',
                'color: white',
                'box-shadow: 0 4px 20px rgba(0,0,0,0.4)',
                'transition: opacity 0.4s ease, transform 0.4s ease',
                'opacity: 0',
                'transform: translateY(12px)'
            ].join(';');

            /* Color segÃºn el tipo: verde para "ok", amarillo para "aviso" */
            toast.style.background = (tipo === 'ok')
                ? 'linear-gradient(90deg, #16a34a, #22c55e)'   /* verde */
                : 'linear-gradient(90deg, #b45309, #f59e0b)';  /* amarillo */

            toast.textContent = mensaje;

            /* Agregamos el toast al body para que se muestre */
            document.body.appendChild(toast);

            /* Activamos la animaciÃ³n de entrada con un pequeÃ±o retraso.
               requestAnimationFrame asegura que el navegador haya pintado
               el elemento antes de iniciar la transiciÃ³n. */
            requestAnimationFrame(function () {
                requestAnimationFrame(function () {
                    toast.style.opacity = '1';
                    toast.style.transform = 'translateY(0)';
                });
            });

            /* DespuÃ©s de 3 segundos, animamos la salida y eliminamos el toast */
            setTimeout(function () {
                toast.style.opacity = '0';
                toast.style.transform = 'translateY(12px)';

                /* Eliminamos el elemento del DOM despuÃ©s de que termine la animaciÃ³n */
                setTimeout(function () {
                    if (toast.parentNode) toast.remove();
                }, 400); /* 400ms = duraciÃ³n de la transiciÃ³n CSS */

            }, 3000); /* 3000ms = 3 segundos visible */
        }

    }; /* fin del objeto retornado */

})(); /* IIFE: se ejecuta inmediatamente al cargar el archivo */


/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   INICIALIZACIÃ“N AUTOMÃTICA
   Al cargar cualquier pÃ¡gina que incluya carrito.js,
   actualizamos el badge del header con el conteo actual.
   Esto asegura que el badge estÃ© correcto al navegar entre pÃ¡ginas.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */
document.addEventListener('DOMContentLoaded', function () {
    Carrito.actualizarBadge();
});

