const express = require('express');
const route = express.Router();
const {
  agregarCarrito,
  editarCliente,
  eliminarCliente,
  obtenerCarrito,
  obtenerUnProductoPorNombre,
  obtenerUnaCategoriaPorNombre,
  masVendidos,
} = require('../controllers/client.controller');
const { verifyAuth } = require('../utils/verify-auth');

route.get('/carrito', verifyAuth, obtenerCarrito);
route.get('/masVendidos', verifyAuth, masVendidos);
route.post('/busqueda/producto', verifyAuth, obtenerUnProductoPorNombre);
route.post('/busqueda/categoria', verifyAuth, obtenerUnaCategoriaPorNombre);
route.post('/carrito/agregar', verifyAuth, agregarCarrito);
route.put('/updateMe', verifyAuth, editarCliente);
route.delete('/deleteMe', verifyAuth, eliminarCliente);

module.exports = route;
