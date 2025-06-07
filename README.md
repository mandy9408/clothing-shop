# Clothing Shop 🛍️

Este proyecto es una tienda online de ropa desarrollada con **React** y **Firebase**. Permite a los usuarios navegar productos, registrarse, iniciar sesión, agregar productos al carrito y simular una experiencia de compra moderna.

## Características

- Registro y autenticación de usuarios con Firebase (correo y Google)
- Visualización de productos y categorías
- Carrito de compras interactivo
- Context API para manejo global de estado (productos y carrito)
- Estilos modernos con SCSS
- Estructura basada en rutas con React Router

## Instalación

1. Clona el repositorio:
   ```sh
   git clone https://github.com/mandy9408/clothing-shop.git
   cd clothing-shop

2. Instala las dependencias:

3. Inicia la app en modo desarrollo:

    Abre http://localhost:3000 en tu navegador.

Scripts disponibles

npm start — Ejecuta la app en modo desarrollo.
npm run build — Genera una versión optimizada para producción.
npm test — Ejecuta los tests en modo interactivo.

Estructura del proyecto

src/
  components/
    cart-icon/
    form-input/
    product-card/
    sign-in-form/
    sign-up-form/
    ...
  contexts/
    cart.context.jsx
    product.context.jsx
  routes/
    shop/
    authentication/
    ...
  utils/
    firebase/
      firebase.utils.js
  shop-data.json
  App.js
  index.js

Tecnologías usadas
    React
    React Router
    Firebase Auth & Firestore
    SCSS
    Personalización
    Puedes modificar los productos editando el archivo shop-data.json.

Créditos
Proyecto creado como práctica de React y Firebase.

¡Gracias por visitar la tienda! 👗👚👖