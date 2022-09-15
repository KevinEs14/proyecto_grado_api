const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const upload=require('../lib/multer');
const ReportesCaza = require('../controllers').caza;
var multer  = require('multer')

/* Rutas para Reportes */
//router.get('/',ReportesCaza.list);
router.get('/',token.verificar,ReportesCaza.list);
// router.post('/',function (req, res,next) {
//   upload.upload.any()(req, res, function (err) {
//     if (err instanceof multer.MulterError) {
//       console.log(err);
//       res.status(467).send(err);
//     } else if (err) {
//       console.log(err);
//       res.status(467).send(err);
//     }
//     next();

//     // Everything went fine.
//   })
// },token.verificar,ReportesCaza.agregar);

// router.post('/',ReportesCaza.agregar);
// router.post('/multiple',ReportesCaza.agregarMultiple);
router.get('/pdf/:id',ReportesCaza.reporteCaza);
router.post('/',token.verificar,ReportesCaza.agregar);
router.post('/multiple',token.verificar,ReportesCaza.agregarMultiple);
// router.get('/pdf/:id',token.verificar,ReportesCaza.reporteCaza);
/*
// GET all Reports
router.get('/repo/', (req, res) => {
  mysqlConnection.query('SELECT * FROM item', (err, rows, fields) => {
    if(!err) {
      res.json(rows);
    } else {
      console.log(err);
    }
  });  
});

*/
module.exports = router;
