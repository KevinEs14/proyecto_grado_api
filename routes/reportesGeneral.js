const express = require('express');
const router = express.Router();
const reportes=require('../lib/reportes');
router.get('/pdf/:token',reportes.reporte);
module.exports = router;
