const Reportes = require('../../models').caza;
const ReportesImagenes = require('../../models').cazaImagenes;
const Cazador = require('../../models').cazador;
const Gestion = require('../../models').gestion;
const User= require('../../models').user;
const Cupos= require('../../models').cupostco;
const TCO= require('../../models').tco;
const Municipio= require('../../models').municipio;
const Provincia= require('../../models').provincia;
const Departamento= require('../../models').departamento;
const fs=require('fs');
const repCaza=require("../../modelos_reporte/reporteCaza/reporte_caza");
var osmsm = require('osm-static-maps');  
var FormData = require('form-data');
const pdf = require('html-pdf');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../models');
const { generar } = require('../../lib/genQR');


module.exports = {
    async agregar(req, res) {
        try{
          var path=req.files[0].filename;
          var pathBorrar=await sequelize.query(`
          SELECT gestion.resolucion_path from gestion where itemId=`+req.body.id, {raw:true, type: Sequelize.QueryTypes.SELECT}); 
          if(pathBorrar[0].resolucion_path){
            fs.unlinkSync("uploads/"+pathBorrar[0].resolucion_path);
          }
          await sequelize.query(`
          UPDATE gestion set resolucion_path='resoluciones/`+path+`' where itemId=`+req.body.id, {raw:true, type: Sequelize.QueryTypes.UPDATE}); 
          res.status(200).send("correcto");
        }
        catch(e){
            console.log(e);
            res.status(404).send(e); 

        }


    },
    async obtenerResolucion(req,res){
      try{
        var itemId=req.params["id"];   
        var path=await sequelize.query(`
        SELECT gestion.resolucion_path from gestion where itemId=`+itemId, {raw:true, type: Sequelize.QueryTypes.SELECT}); 
        res.status(200).send(path[0]);
      }
      catch(e){
          console.log(e);
          res.status(404).send("error"); 

      }
    }

};

var callback = (err) => {
    if (err) throw err;
    console.log('It\'s saved!');
  }
  function generateId(){
    // Alphanumeric characters
    const chars =
      'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let autoId = '';
    for (let i = 0; i < 20; i++) {
      autoId += chars.charAt(Math.floor(Math.random() * chars.length));
    }
  
    return autoId;
  }  
  function obtenerFecha(){
      
    let date = new Date()
    let day = date.getDate()
    let month = date.getMonth() + 1
    let year = date.getFullYear()

    if(month < 10){
    return `${day}-0${month}-${year}`;
    }else{
        return `${day}-${month}-${year}`;
    }
  }
  async function obtenerUbicacion(x,y,base){
    var imgBuffer=await osmsm({zoom:9,geojson: {"type":"Point","coordinates":[x,y]}});
    var fs = require('fs');
    const data = new Uint8Array(Buffer.from(imgBuffer));
    var nombre=generateId()+'.jpg';
    fs.writeFileSync(base+"/modelos_reporte/reporteCaza/archivos/"+nombre, data);
    return nombre;
  }