const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const upload=require('../lib/multer');
const Resoluciones = require('../controllers').Resoluciones;
var multer  = require('multer')

/* Rutas para Reportes */
router.post('/',function (req, res,next) {
// router.post('/',token.verificar,function (req, res,next) {
  upload.uploadRes.any()(req, res, function (err) {
    if (err instanceof multer.MulterError) {
      console.log(err);
      res.status(467).send(err);
    } else if (err) {
      console.log(err);
      res.status(467).send(err);
    }
    next();

    // Everything went fine.
  })
},Resoluciones.agregar);
router.get('/:id',Resoluciones.obtenerResolucion);

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
