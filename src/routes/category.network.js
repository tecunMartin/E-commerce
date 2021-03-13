const express = require('express');
const router = express.Router();

const { obtenerCategoria, modficicarCategoria, create, eliminarCategoria } = require('../controllers/category.controller');
const { verifyAuth } = require('../utils/verify-auth');

router.get('/', verifyAuth, obtenerCategoria);
router.post('/create', verifyAuth, create);
router.put('/update/:idCategorias', verifyAuth, modficicarCategoria);
router.delete('/delete/:idCategorias', verifyAuth, eliminarCategoria);

module.exports = router;
