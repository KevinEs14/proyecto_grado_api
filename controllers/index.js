
const login = require('./login/login');
const user = require('./user/user');
const caza = require('./reportesCaza/caza');
const actaCuero=require('./reportesActaCuero/actaCuero');
const curtActas=require('./reportesCurtActas/curtActas');
const actaCarne=require('./reportesActaCarne/actaCarne');
const custCueroTCO=require('./reportesCustCueroTCO/custCueroTCO');
const departamentoC=require('./estadoTco/departamento');
const provinciaC=require('./estadoTco/provincia');
const municipioC=require('./estadoTco/municipio');
const tcoC=require('./estadoTco/tco');
const Resoluciones=require('./resoluciones/resoluciones');
const Files=require('./files/files');

module.exports={
    user,
    login,
    caza,
    actaCuero,
    curtActas,
    actaCarne,
    custCueroTCO,
    departamentoC,
    provinciaC,
    municipioC,
    tcoC,
    Resoluciones,
    Files
};