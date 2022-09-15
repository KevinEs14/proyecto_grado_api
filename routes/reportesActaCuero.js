const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const ReportesActaCuero = require('../controllers').actaCuero;

router.get('/pdf/:id',ReportesActaCuero.reporteActaCuero);
module.exports = router;
