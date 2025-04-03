const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

console.log("✅ Rotas de usuário carregadas");

router.get('/usuarios', UsuarioController.getAll);
router.post('/usuarios', UsuarioController.create);

module.exports = router;
