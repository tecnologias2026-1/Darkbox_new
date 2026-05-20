ðŸŒ Oryon Gaming â€“ E-commerce especializado en videojuegos

ðŸ‘¥ Integrantes

David Espitia VelÃ¡squez â€“ 1202510

1. Objetivo General

Desarrollar una plataforma web tipo e-commerce especializada en la compra y venta de videojuegos, que permita a los usuarios publicar, buscar y adquirir productos de manera segura, rÃ¡pida e intuitiva.

El sistema busca optimizar el proceso de comercializaciÃ³n digital dentro del contexto local, brindando herramientas como filtros de bÃºsqueda, mensajerÃ­a interna y sistema de reputaciÃ³n.

2. Contexto de Uso

### Â¿QuiÃ©n usa el sistema?

La plataforma serÃ¡ utilizada por:

-Usuarios compradores: Personas interesadas en adquirir videojuegos fÃ­sicos o digitales.

-Usuarios vendedores: Personas que desean publicar y vender videojuegos.

-Administrador: Encargado de moderar contenido y gestionar usuarios.

Entorno de uso

### El sistema funcionarÃ¡ en:

-Navegadores web

-Dispositivos: computador, tablet y smartphone

-Requiere conexiÃ³n a internet

### Requisitos del entorno

-Seguridad en autenticaciÃ³n y datos

-Interfaz intuitiva

-Disponibilidad 24/7

-Tiempo de respuesta rÃ¡pido

### MÃ³dulos funcionales

-MÃ³dulo de registro e inicio de sesiÃ³n

-MÃ³dulo de publicaciÃ³n de videojuegos

-MÃ³dulo de bÃºsqueda y filtrado

-MÃ³dulo de mensajerÃ­a interna

-MÃ³dulo de reputaciÃ³n

-MÃ³dulo administrativo

---

## 3. Requerimientos del Sistema

### 3.1 Requerimientos Funcionales

-RF-01: El sistema debe permitir el registro de usuario mediante correo electrÃ³nico y contraseÃ±a.

-RF-02: El sistema debe permitir iniciar sesiÃ³n.

-RF-03: El sistema debe permitir publicar videojuegos.

-RF-04: El sistema debe permitir buscar videojuegos.

-RF-05: El sistema debe permitir filtrar por consola, precio y estado.

-RF-06: El sistema debe permitir visualizar el detalle del producto.

-RF-07: El sistema debe permitir enviar mensajes entre usuarios.

-RF-08: El sistema debe permitir realizar el proceso de compra.

-RF-09: El sistema debe permitir calificar usuarios.

-RF-10: El sistema debe permitir gestionar el perfil.

-RF-11: El sistema debe permitir la administraciÃ³n de usuarios y publicaciones.

---

### 3.2 Requerimientos No Funcionales


-RNF-01: El sistema debe estar disponible 24/7.

-RNF-02: El tiempo de respuesta debe ser menor a 3 segundos.

-RNF-03: El sistema debe ser responsive.

-RNF-04: El sistema debe garantizar la seguridad de los datos.

-RNF-05: La interfaz debe ser intuitiva.

-RNF-06: El sistema debe ser escalable.

---

##  4. Diagramas UML

###  Diagrama de Casos de Uso

Este diagrama representa la interacciÃ³n entre los actores del sistema (usuario y administrador) y las funcionalidades principales, como registro, inicio de sesiÃ³n, publicaciÃ³n de videojuegos, bÃºsqueda, compra, mensajerÃ­a y calificaciÃ³n.

---<img width="392" height="925" alt="RTDFRbC_40VmlKynltRpww8e__E2ggX9cY0MI8YgxAVsvCMDdnsDxHQ4UWMkm0tOS0Gkn15uVh6gO7Nx_Sp4CtRUjG_88JP6_1Tsr10S36eh36q310Uiwrq0fPbaqCuAuVVQ7f2nWNkK-vfTj6hbZ6CutymsYytofCBlKBadRMi87Ea4kYxfs1B3e7S2A8FZs_3L" src="https://github.com/user-attachments/assets/7cf37d36-ae11-4028-908f-725abcedf107" />


###  Diagrama de Secuencia

<img width="546" height="625" alt="VPF1RXD138RlynHMEFTGeO340PNDfbmAIAtWximumMHt73opQIJ4K_48l1ZEPaT9sAGvpC7-VlkBhBrB6JLtRUDSMdFSe68B2_JhbKeNmqmQKNXrt_zEYFGTWpnpN47MZauQVSgBHbAudRhJ2FtiA7g2NmxWWwey3yEdyzVJwjQA3xoa1uvKYGRIgzt_vURr_Etz" src="https://github.com/user-attachments/assets/f4285384-f7fd-45f7-afd5-3c710443a4f6" />

Este diagrama muestra el proceso de compra de un videojuego:

1. El usuario busca un videojuego
2. El sistema consulta la base de datos
3. El usuario selecciona un producto
4. El sistema registra la transacciÃ³n
5. El usuario califica la compra

###  Diagrama de Clases

---<img width="643" height="742" alt="bPA_ZXCn4CPxFuKLwXE941AaG9T4h4HnDFnfJxFsP6_kTktLU1ma48z4mJFSYs67EF4cQQxqvy_V_6R6jq609GwzKk69t0WCWsx1F7NiexCRttlMhvhtpQfPLuxm0DR_8DTfuOZLnVwLyUoGzU9jTM5w264bmjH6mK_6ko_q4_LSdNlqBwNr-eAWQTvydESRpnQv" src="https://github.com/user-attachments/assets/97b22a66-abed-4d3e-b156-60d3f37bbeb1" />


##  5. Prototipo

https://www.figma.com/make/yEkSc4tGKqrXq5diXWdbuD/E-commerce-tienda-videojuegos?p=f
---

##  6. DiseÃ±o de Base de Datos

###  Tablas principales

###  Usuario

-id_usuario (PK)

-nombre

-correo

-contraseÃ±a

-reputaciÃ³n

-fecha_registro

---

###  Videojuego

-id_videojuego (PK)

-titulo

-consola

-estado

-precio

-descripcion

-id_usuario (FK)

---

###  Mensaje

-id_mensaje (PK)

-contenido

-fecha

-id_emisor (FK)

-id_receptor (FK)

---

###  CalificaciÃ³n

-id_calificacion (PK)

-puntuacion

-comentario

-id_comprador (FK)

-id_vendedor (FK)

---

###  TransacciÃ³n

-id_transaccion (PK)

-fecha

-estado

-id_comprador (FK)

-id_videojuego (FK)

---

###  Administrador

-id_admin (PK)

-nombre

-correo

---

## ðŸ”— Relaciones

-Un usuario puede publicar mÃºltiples videojuegos

-Un usuario puede enviar y recibir mensajes

-Un usuario puede realizar mÃºltiples transacciones

-Un videojuego pertenece a una transacciÃ³n

-Un usuario puede recibir mÃºltiples calificaciones

-El administrador gestiona usuarios y publicaciones

---

##  7. DocumentaciÃ³n del Sistema

###  Estructura de carpetas

-/css â†’ Contiene los estilos visuales del sistema

-/js â†’ Contiene la lÃ³gica del sistema

-/assets â†’ Contiene imÃ¡genes e iconos

---

## 8. InstalaciÃ³n y EjecuciÃ³n

1. Descargar o clonar el proyecto
2. Abrir la carpeta del proyecto
3. Ejecutar el archivo index.html en un navegador
4. Configurar la base de datos (si aplica)
5. Usar el sistema desde el navegador

---


