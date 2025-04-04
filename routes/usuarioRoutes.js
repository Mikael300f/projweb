const express = require('express');
const router = express.Router();
const UsuarioController = require('../controllers/UsuarioController');

router.get('/usuarios', UsuarioController.getAll);
router.post('/usuarios', UsuarioController.create);

module.exports = router;
