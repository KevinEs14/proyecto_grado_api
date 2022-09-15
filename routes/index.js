const express = require('express');
const router = express.Router();


/* GET home page. */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'API Rest Biodiversidad lagartos' });
  });

//router.post('/api/login', UserController.login);


module.exports = router;
