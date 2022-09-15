const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const Files = require('../controllers').Files;
router.get('/:path/:name',Files.get);
// router.get('/:path/:name',token.verificar,Files.get);
module.exports = router;