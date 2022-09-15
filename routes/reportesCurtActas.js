const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const ReportesCurtActas = require('../controllers').curtActas;

router.get('/carne/pdf/:id/:gestion',ReportesCurtActas.reporteCurtActasCarne);
router.get('/cuero/pdf/:id/:gestion',ReportesCurtActas.reporteCurtActasCuero);
module.exports = router;
