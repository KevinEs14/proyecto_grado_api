const express = require('express');
const router = express.Router();

const LoginController = require('../controllers').login;

/* Rutas para Login */
router.post('/', LoginController.login);
router.get('/:tokenId', LoginController.verificar);

module.exports = router;
