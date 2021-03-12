/* Componentes con sub rutas */
const productos = require('./productos.network');
const auth = require('./auth.network');

/* Funciones de Rutas */
const routers = (app) => {
  app.use('/products', productos);
  app.use('/auth', auth);
};

module.exports = routers;
