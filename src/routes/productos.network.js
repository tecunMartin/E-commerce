const express = require('express');
const router = express.Router();
const {
  obtenerProductos,
  crearProducto,
  obtenerProductoID,
  modificarProdutos,
  eliminarProductos,
} = require('../controllers/products.controller');
const { verifyAuth } = require('../utils/verify-auth');

router.get('/', verifyAuth, obtenerProductos);
router.get('/:idProducto', verifyAuth, obtenerProductoID);
router.post('/create', verifyAuth, crearProducto);
router.put('/update/:idProducto', verifyAuth, modificarProdutos);
router.delete('/delete/:idProducto', verifyAuth, eliminarProductos);

module.exports = router;
