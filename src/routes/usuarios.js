const express = require('express');
const router = express.Router();
const usuarioController = require('../controllers/usuariosController');

// Rutas
router.get('/', usuarioController.listarUsuarios);
router.get('/:id', usuarioController.obtenerUsuario);
router.post('/', usuarioController.crearUsuario);
router.put('/:id', usuarioController.actualizarUsuario);
router.patch('/:id/estado', usuarioController.cambiarEstado);
router.delete('/:id', usuarioController.eliminarUsuario);

module.exports = router;

