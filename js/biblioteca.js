/* â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•
   Oryon Gaming â€” biblioteca.js
   GestiÃ³n de la biblioteca de juegos adquiridos.
   Con sistema de cÃ³digos de licencia integrado.
   â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â•â• */

(function() {
    'use strict';

    const CLAVE_BIBLIOTECA = 'oryongaming_biblioteca';
    const CLAVE_BIBLIOTECA_ANTIGUA = 'darkbox_biblioteca';

    function migrarClaveLocalStorage() {
        const valorNuevo = localStorage.getItem(CLAVE_BIBLIOTECA);
        const valorAntiguo = localStorage.getItem(CLAVE_BIBLIOTECA_ANTIGUA);

        if (valorNuevo === null && valorAntiguo !== null) {
            localStorage.setItem(CLAVE_BIBLIOTECA, valorAntiguo);
        }
    }

    migrarClaveLocalStorage();

    // Referencias a elementos del DOM
    const bibliotecaGrid = document.getElementById('biblioteca-grid');
    const totalJuegos = document.getElementById('total-juegos');
    const totalGastado = document.getElementById('total-gastado');
    const ultimaCompra = document.getElementById('ultima-compra');

    function leerBibliotecaDirecta() {
        const datos = localStorage.getItem(CLAVE_BIBLIOTECA);
        if (!datos) return [];

        try {
            const biblioteca = JSON.parse(datos);
            return Array.isArray(biblioteca) ? biblioteca : Object.values(biblioteca);
        } catch (error) {
            return [];
        }
    }

    // FunciÃ³n para formatear precio
    function formatearPrecio(precio) {
        if (precio === undefined || precio === null || precio === '') {
            return '$0';
        }

        if (typeof precio === 'string') {
            precio = parseFloat(precio.replace(/\$/g, '').replace(/\./g, ''));
        }

        precio = Number(precio) || 0;
        return '$' + precio.toLocaleString('es-CO');
    }

    // FunciÃ³n para formatear fecha
    function formatearFecha(fecha) {
        if (!fecha) return '-';
        const date = new Date(fecha.split('/').reverse().join('-'));
        return date.toLocaleDateString('es-ES', {
            year: 'numeric',
            month: 'short',
            day: 'numeric'
        });
    }

    // Reconstruir datos de juego si faltan campos
    function reconstruirJuego(juego) {
        return {
            id: juego.id,
            nombre: juego.nombre || 'Juego desconocido',
            genero: juego.genero || 'AcciÃ³n',
            descripcion: juego.descripcion || '',
            imagen: juego.imagen || 'https://via.placeholder.com/320x180?text=Sin+imagen',
            precio: (juego.precio !== undefined && juego.precio !== null && juego.precio !== '')
                ? juego.precio
                : 0,
            puntuacion: juego.puntuacion || '0',
            codigo: juego.codigo || null,
            fechaCompra: juego.fechaCompra || '-'
        };
    }

    // Modal para mostrar cÃ³digo de licencia
    function mostrarModalCodigo(juego) {
        const juegoCompleto = reconstruirJuego(juego);
        const codigo = juegoCompleto.codigo || 'N/A';
        const fechaCompra = juegoCompleto.fechaCompra || '-';

        const modal = document.createElement('div');
        modal.className = 'modal-codigo';
        modal.innerHTML = `
            <div class="modal-contenido">
                <button class="btn-cerrar" onclick="this.closest('.modal-codigo').remove()">âœ•</button>
                <h2>CÃ³digo de Licencia</h2>
                <p class="titulo-juego">${juegoCompleto.nombre}</p>
                
                <div class="info-compra">
                    <p><strong>Fecha de compra:</strong> ${fechaCompra}</p>
                    <p><strong>Precio pagado:</strong> ${formatearPrecio(juegoCompleto.precio)}</p>
                </div>
                
                <div class="codigo-container">
                    <label>Tu cÃ³digo de licencia:</label>
                    <div class="codigo-box">
                        <input type="text" readonly value="${codigo}" class="input-codigo" id="input-codigo">
                        <button class="btn-copiar" onclick="copiarCodigo(event)">Copiar</button>
                    </div>
                </div>
                
                <p class="aviso">Guarda este cÃ³digo en un lugar seguro. Lo necesitarÃ¡s para activar el juego.</p>
            </div>
        `;
        
        document.body.appendChild(modal);
        
        // Cerrar modal al hacer clic fuera
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.remove();
            }
        });
    }

    // Copiar cÃ³digo al portapapeles
    window.copiarCodigo = function(event) {
        const input = document.getElementById('input-codigo');
        input.select();
        document.execCommand('copy');
        
        const btn = event ? event.target : null;
        if (btn) {
            const textoOriginal = btn.textContent;
            btn.textContent = 'Â¡Copiado!';
            btn.style.background = '#22c55e';

            setTimeout(() => {
                btn.textContent = textoOriginal;
                btn.style.background = '';
            }, 2000);
        }
    };

    // Crear tarjeta de juego en biblioteca
    function crearTarjetaJuego(juego) {
        const tarjeta = document.createElement('article');
        tarjeta.className = 'biblioteca-item';
        
        const juegoCompleto = reconstruirJuego(juego);
        const nombre = juegoCompleto.nombre;
        const imagen = juegoCompleto.imagen;
        const genero = juegoCompleto.genero;
        const descripcion = juegoCompleto.descripcion || 'No hay descripciÃ³n disponible.';
        const puntuacion = juegoCompleto.puntuacion || '0';
        const precio = formatearPrecio(juegoCompleto.precio);

        tarjeta.innerHTML = `
            <div class="imagen">
                <img src="${imagen}" alt="${nombre}">
                <div class="badge">Comprado</div>
            </div>
            <div class="info">
               <p class="nombre">${nombre}</p>
                <div class="meta">
                    <span class="estrella">â˜…</span>
                    <span class="puntuacion">${puntuacion}</span>
                    <span class="separador">â€¢</span>
                    <span class="genero">${genero}</span>
                </div>
                <p class="descripcion" style="font-size: 0.85rem; color: #aaa; margin: 8px 0;">${descripcion}</p>
                <div class="codigo-line">
                    <span class="codigo-label">CÃ³digo:</span>
                    <span class="codigo-text">${juegoCompleto.codigo || 'N/A'}</span>
                </div>
                <div class="pie">
                    <span class="precio">${precio}</span>
                    <button class="btn-codigo" onclick="event.stopPropagation()">Ver CÃ³digo</button>
                </div>
            </div>
        `;
        
        // Agregar evento para mostrar cÃ³digo
        const btnCodigo = tarjeta.querySelector('.btn-codigo');
        btnCodigo.addEventListener('click', () => mostrarModalCodigo(juego));
        
        return tarjeta;
    }

    // Actualizar la biblioteca
    function actualizarBiblioteca() {
        if (!bibliotecaGrid) return;
        
        let biblioteca = [];
        if (typeof Compras !== 'undefined' && typeof Compras.obtenerBiblioteca === 'function') {
            biblioteca = Compras.obtenerBiblioteca() || [];
        } else {
            biblioteca = leerBibliotecaDirecta();
        }

        if (!Array.isArray(biblioteca)) {
            biblioteca = Object.values(biblioteca);
        }

        if (biblioteca.length === 0) {
            biblioteca = leerBibliotecaDirecta();
        }

        const juegos = Array.isArray(biblioteca) ? biblioteca : Object.values(biblioteca);
        
        bibliotecaGrid.innerHTML = '';

        if (juegos.length === 0) {
            bibliotecaGrid.innerHTML = `
                <div style="grid-column: 1/-1; text-align: center; padding: 60px 20px;">
                    <p style="color: #888; font-size: 1.1rem;">AÃºn no has comprado ningÃºn juego</p>
                    <a href="home-sesion.html" style="color: #C27AFF; text-decoration: none;">Explorar juegos â†’</a>
                </div>
            `;
            totalJuegos.textContent = '0';
            totalGastado.textContent = '$0';
            ultimaCompra.textContent = '-';
            return;
        }

        let totalPrecio = 0;
        let fechas = [];

        juegos.forEach(juegoData => {
            const juego = reconstruirJuego(juegoData);
            const tarjeta = crearTarjetaJuego(juego);
            bibliotecaGrid.appendChild(tarjeta);
            
            const precioNum = typeof juego.precio === 'string'
                ? parseFloat(juego.precio.replace(/\$/g, '').replace(/\./g, ''))
                : Number(juego.precio);
            totalPrecio += precioNum || 0;
            if (juego.fechaCompra) {
                fechas.push(new Date(juego.fechaCompra.split('/').reverse().join('-')));
            }
        });

        // Actualizar estadÃ­sticas
        totalJuegos.textContent = juegos.length;
        totalGastado.textContent = formatearPrecio(totalPrecio);
        
        if (fechas.length > 0) {
            const ultimaFecha = new Date(Math.max(...fechas));
            ultimaCompra.textContent = ultimaFecha.toLocaleDateString('es-ES', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
            });
        } else {
            ultimaCompra.textContent = '-';
        }
    }

    // Inicializar biblioteca cuando carga la pÃ¡gina
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', actualizarBiblioteca);
    } else {
        actualizarBiblioteca();
    }

})();

