const express = require('express');
const router = express.Router();
<<<<<<< HEAD
const UsuarioController = require('../controllers/UsuarioController');

router.get('/usuarios', UsuarioController.getAll);
router.post('/usuarios', UsuarioController.create);

module.exports = router;
=======
const usuarioController = require('../controllers/usuarioController');

router.get('/', usuarioController.getAllUsuarios);
router.get('/:id', usuarioController.getUsuario);
router.post('/', usuarioController.createUsuarioHandler);
router.put('/:id', usuarioController.updateUsuarioHandler);
router.delete('/:id', usuarioController.deleteUsuarioHandler);

module.exports = router;
>>>>>>> main
