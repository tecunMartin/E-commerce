/* Componentes con sub rutas */
const productos = require('./productos.network');
const category = require('./category.network');
const auth = require('./auth.network');

/* Funciones de Rutas */
const routers = (app) => {
  app.use('/products', productos);
  app.use('/category', category);
  app.use('/auth', auth);
};

module.exports = routers;
