
var multer  = require('multer')
const uploadRes=multer({
        dest    : './uploads/resoluciones/',
        onError : function(err, next) {
          console.log('error', err);
          res.status(356).send(err)
          throw err;
        }
      });
const uploadUser=multer({
  dest    : './uploads/usuario/',
  onError : function(err, next) {
    console.log('error', err);
    res.status(356).send(err)
    throw err;
  }
});


module.exports={
    uploadRes,
    uploadUser
};