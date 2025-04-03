const express = require('express');
const router = express.Router();
const ProductController = require('../controllers/ProductController');

router.get('/produtos', ProductController.getAll);
router.post('/produtos', ProductController.create);

module.exports = router;