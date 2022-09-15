const express = require('express');
const router = express.Router();
const token=require('../lib/token');
const UserController = require('../controllers').user;
const upload=require('../lib/multer');
var multer  = require('multer')

router.get('/', token.verificar,UserController.list);
router.post('/', function (req, res,next) {
// router.post('/',token.verificar, function (req, res,next) {
    upload.uploadUser.any()(req, res, function (err) {
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
  },UserController.subirDocumento);

module.exports = router;