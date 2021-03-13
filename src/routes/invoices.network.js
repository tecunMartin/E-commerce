const express = require('express');
const route = express.Router();

const { crearFactura, visualizarFacturas, masVendidos, faltantes, productosFactura } = require('../controllers/invoices.controller');
const { verifyAuth } = require('../utils/verify-auth');

route.get('/', verifyAuth, visualizarFacturas);
route.get('/create', verifyAuth, crearFactura);
route.get('/masVendidos', verifyAuth, masVendidos);
route.get('/agotados', verifyAuth, faltantes);
route.get('/productos/:idFactura', verifyAuth, productosFactura);

module.exports = route;
