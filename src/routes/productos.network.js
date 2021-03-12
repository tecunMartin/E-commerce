const express = require('express');
const router = express.Router();
const { obtenerProductos } = require('../controllers/products.controller');
const { verifyAuth } = require('../utils/verify-auth');

router.get('/', verifyAuth, obtenerProductos);

module.exports = router;
