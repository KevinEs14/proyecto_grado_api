
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();
const methodOverride = require("method-override");
const indexRouter = require('./routes/index');
const loginRouter = require('./routes/login');
const reportesCaza = require('./routes/reportesCaza');
const reportesActaCuero = require('./routes/reportesActaCuero');
const reportesActaCarne = require('./routes/reportesActaCarne');
const reportesCurtActas = require('./routes/reportesCurtActas');
const reportesCustCueroTCO = require('./routes/reportesCustCueroTCO');
const departamento = require('./routes/departamentoRoutes');
const provincia = require('./routes/provinciaRoutes');
const municipio = require('./routes/municipioRoutes');
const Resolucion = require('./routes/resoluciones');
const Files = require('./routes/filesRoute');
const tco = require('./routes/tcoRoutes');
const reportesGeneral = require('./routes/reportesGeneral');
const profile = require('./routes/profile');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const cors=require('cors')

// MIDDLEWARES
app.use(express.json());

app.use(cors({
  "origin": "*",
  "methods": "GET,HEAD,PUT,PATCH,POST,DELETE",
  "preflightContinue": false,
  "optionsSuccessStatus": 204
}));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(methodOverride());
app.use(express.static(path.join(__dirname, 'public')));
var router = express.Router();
/*
//JWT
app.use(function(req, res, next) {
  try {
    let public_route = ['/api/auth'];
    if (req.headers.authorization) {
      const token = req.headers.authorization.split(" ")[1]
      jwt.verify(token, key.apikey, function (err, response) {
        if (err) {
          req.user = undefined;
        } else {
          req.user = response;
          next();
        }
      })
    } else {
      if (public_route.includes(req.url)) {
        next()
      } else {
        res.status(403).send({message: 'Ruta no autorizado'});
      }
    }
  } catch(e) {
    next()
  }
});
*/

//VIEWS
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');
const token= require('./lib/token');
console.log(token.getTokenGen());
// ROUTES
app.use('/', indexRouter);
app.use('/login', loginRouter);
app.use('/caza', reportesCaza);
app.use('/acta-cuero', reportesActaCuero);
app.use('/acta-carne', reportesActaCarne);
app.use('/curt-actas', reportesCurtActas);
app.use('/cust-cuero-tco', reportesCustCueroTCO);
app.use('/general', reportesGeneral);
app.use('/profile', profile);
app.use('/departamentos',departamento);
app.use('/provincias',provincia);
app.use('/municipios',municipio);
app.use('/tcos',tco);
app.use('/resoluciones',Resolucion);
app.use('/files',Files);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  res.send(404);
});

// error handler
app.use(function(err, req, res, next) {

  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});


//SWAGGER
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerDocument));


//logs morgan
/*
if (app.get('env') == 'production') {
  app.use(morgan('common', { skip: function(req, res) { return res.statusCode < 400 }, stream: __dirname + '/../morgan.log' }));
} else {
  app.use(morgan('dev'));
}*/

// create a write stream (in append mode)
// create a write stream (in append mode)


module.exports = app;