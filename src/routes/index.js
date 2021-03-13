/* Componentes con sub rutas */
const productos = require('./productos.network');
const category = require('./category.network');
const auth = require('./auth.network');
const user = require('./user.network');
const client = require('./client.network');
const factura = require('./invoices.network');

/* Funciones de Rutas */
const routers = (app) => {
  app.use('/products', productos);
  app.use('/category', category);
  app.use('/user', user);
  app.use('/client', client);
  app.use('/factura', factura);
  app.use('/auth', auth);
};

module.exports = routers;
