/*
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Oryon Gaming â€” licencias.js
   Sistema de generaciÃ³n y gestiÃ³n de cÃ³digos de licencia de juegos.
   
   Genera cÃ³digos Ãºnicos cuando se compra un juego y los almacena
   en localStorage junto con los datos de la compra.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
*/

var Licencias = (function () {
    const CLAVE = 'oryongaming_licencias';
    const CLAVE_ANTIGUA = 'darkbox_licencias';

    function migrarClaveLocalStorage() {
        const valorNuevo = localStorage.getItem(CLAVE);
        const valorAntiguo = localStorage.getItem(CLAVE_ANTIGUA);

        if (valorNuevo === null && valorAntiguo !== null) {
            localStorage.setItem(CLAVE, valorAntiguo);
        }
    }

    migrarClaveLocalStorage();

    // Leer licencias guardadas
    function leer() {
        const datos = localStorage.getItem(CLAVE);
        return datos ? JSON.parse(datos) : {};
    }

    // Guardar licencias
    function guardar(licencias) {
        localStorage.setItem(CLAVE, JSON.stringify(licencias));
    }

    // Generar cÃ³digo Ãºnico de licencia
    function generarCodigo() {
        const caracteres = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let codigo = '';
        
        // Formato: XXXX-XXXX-XXXX-XXXX (16 caracteres)
        for (let i = 0; i < 16; i++) {
            if (i > 0 && i % 4 === 0) {
                codigo += '-';
            }
            codigo += caracteres.charAt(Math.floor(Math.random() * caracteres.length));
        }
        
        return codigo;
    }

    // API PÃºblica
    return {
        // Agregar licencia cuando se compra un juego
        crearLicencia: function(juego) {
            const licencias = leer();
            const nombreJuego = juego.nombre || juego.id || 'Juego desconocido';
            const juegoId = juego.id || String(nombreJuego).toLowerCase().replace(/\s+/g, '-');
            const licenciaId = `${juegoId}-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

            const licencia = {
                id: licenciaId,
                juegoId: juegoId,
                nombre: nombreJuego,
                codigo: generarCodigo(),
                fechaCompra: new Date().toLocaleDateString('es-CO'),
                horaCompra: new Date().toLocaleTimeString('es-CO'),
                precio: juego.precio,
                imagen: juego.imagen
            };

            licencias[licenciaId] = licencia;
            guardar(licencias);
            return licencia;
        },

        // Obtener licencia de un juego
        obtenerLicencia: function(idJuego) {
            const licencias = leer();
            if (licencias[idJuego]) {
                return licencias[idJuego];
            }

            return Object.values(licencias).find(function (licencia) {
                return licencia.juegoId === idJuego;
            }) || null;
        }
    };
})();


