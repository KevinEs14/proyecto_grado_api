const express = require('express');
const router = express.Router();

const TcoController = require('../controllers').tcoC;

/* Rutas para Login */
router.get('/:id',TcoController.list );
router.get('/estado/:id',TcoController.obtenerEstado );

module.exports = router;