const express = require('express');
const router = express.Router();

const DeptoController = require('../controllers').departamentoC;

/* Rutas para Login */
router.get('/', DeptoController.list);

module.exports = router;