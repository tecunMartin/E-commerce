/* Componentes con sub rutas */
const productos = require('./productos.network');
const category = require('./category.network');
const auth = require('./auth.network');
const user = require('./user.network');

/* Funciones de Rutas */
const routers = (app) => {
  app.use('/products', productos);
  app.use('/category', category);
  app.use('/user', user);
  app.use('/auth', auth);
};

module.exports = routers;
