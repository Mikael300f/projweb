const express = require('express');
const router = express.Router();
const UserController = require('../controllers/UserController');

router.get('/usuarios', UserController.getAll);
router.post('/usuarios', UserController.create);

module.exports = router;
