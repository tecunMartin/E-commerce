const express = require('express');
const route = express.Router();

const { crearFactura } = require('../controllers/invoices.controller');
const { verifyAuth } = require('../utils/verify-auth');

route.get('/create', verifyAuth, crearFactura);

module.exports = route;
