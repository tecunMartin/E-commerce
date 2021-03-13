const express = require('express');
const router = express.Router();
const { verifyAuth } = require('../utils/verify-auth');
const { crearUsuario, listarUsuario, modificarUsuarioROL, modificarUsuario, eliminarUsuario } = require('../controllers/user.controller');

router.get('/', verifyAuth, listarUsuario);
router.post('/create', verifyAuth, crearUsuario);
router.put('/update/rol/:idUser', verifyAuth, modificarUsuarioROL);
router.put('/update/:idUser', verifyAuth, modificarUsuario);
router.delete('/delete/:idUser', verifyAuth, eliminarUsuario);

module.exports = router;
