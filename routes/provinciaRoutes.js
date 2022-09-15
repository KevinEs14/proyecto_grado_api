const express = require('express');
const router = express.Router();

const ProvController = require('../controllers').provinciaC;

/* Rutas para Login */
router.get('/:id',ProvController.list );

module.exports = router;