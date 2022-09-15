const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const ReportesCustCueroTCO = require('../controllers').custCueroTCO;

router.get('/pdf/:id/:gestion',ReportesCustCueroTCO.reporteCustCueroTCO);
// router.get('/pdf/:id/:gestion',token.verificar,ReportesCustCueroTCO.reporteCustCueroTCO);
module.exports = router;
