const express = require('express');
<<<<<<< HEAD
const ProdutoController = require('../controllers/ProdutoController');

const router = express.Router();

router.get('/produtos', ProdutoController.getAll);
router.post('/produtos', ProdutoController.create);

module.exports = router;
=======
const router = express.Router();
const produtoController = require('../controllers/produtoController');

router.post('/', produtoController.createProduto);
router.get('/', produtoController.getAllProdutos);
router.get('/:id', produtoController.getProdutoById);
router.put('/:id', produtoController.updateProduto);
router.delete('/:id', produtoController.deleteProduto);

module.exports = router;
>>>>>>> main
