const express = require('express');
const router = express.Router();

const MuniController = require('../controllers').municipioC;

/* Rutas para Login */
router.get('/:id',MuniController.list );

module.exports = router;