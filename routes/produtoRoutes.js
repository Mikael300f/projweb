const express = require('express');
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

router.get('/produtos', ProdutoController.getAll);
router.post('/produtos', ProdutoController.create);

module.exports = router;
