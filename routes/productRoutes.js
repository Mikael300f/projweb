const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/produtos', ProductController.listar);
router.get('/produtos/:id', ProductController.buscar);
router.post('/produtos', ProductController.criar);
router.put('/produtos/:id', ProductController.atualizar);
router.delete('/produtos/:id', ProductController.deletar);

module.exports = router;
