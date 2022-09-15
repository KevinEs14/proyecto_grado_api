const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const ReportesActaCarne = require('../controllers').actaCarne;

router.get('/pdf/:id',ReportesActaCarne.reporteActaCarne);
// router.get('/pdf/:id',token.verificar,ReportesActaCarne.reporteActaCarne);
module.exports = router;
