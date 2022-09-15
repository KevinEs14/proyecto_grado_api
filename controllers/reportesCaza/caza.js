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
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../models');
const { generar } = require('../../lib/genQR');
const { generarTraza } = require('../../lib/genQR');
const {verificarFecha}=require('../../lib/token');


module.exports = {
    async reporteCaza(req,res){
            try{
		var traza=await sequelize.query(`
                SELECT dp.nombre as dpitemId,pv.nombre as pvitemId,mn.nombre as mnitemId,tco.tco,gestion_tco.cupo_total,gestion_tco.gestion_itemId
                FROM caza ca
                INNER JOIN cazador on
                cazador.itemId=ca.cazador_itemId
                INNER JOIN catalogo_tco tco on
                tco.itemId=cazador.tco_itemId
                INNER JOIN gestion_tco on
                gestion_tco.tco_itemId=tco.itemId
		            AND gestion_tco.gestion_itemId=ca.gestion_itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                INNER JOIN vrhr_territorio.provincia pv on
                pv.itemId=mn.provinciaId
                INNER JOIN vrhr_territorio.departamento dp on
                dp.itemId=pv.departamentoId
                WHERE ca.itemId=`+req.params["id"]+``, {raw:true, type: Sequelize.QueryTypes.SELECT});
    var rep=await sequelize.query(`
                SELECT 
                cazador.itemId as "cazador.itemId",
                usuario.itemId as "usuario.itemId",
                usuario.nombre as "usuario.nombre",
                usuario.apellido as "usuario.apellido",
                tco.tco as "tco.tco",
                caza.itemId,
                caza.fecha_reporte,
                caza.coor_x,
                caza.coor_y,
                caza.estado,
                caza.cantidad,
                mn.nombre as "nombre_municipio",
                pv.nombre as "nombre_provincia",
                dp.nombre as "nombre_departamento"
                FROM caza
                INNER JOIN cazador
                on cazador.itemId=caza.cazador_itemId 
                INNER JOIN usuario
                on usuario.itemId=cazador.usuario_itemId
                INNER JOIN catalogo_tco tco on
                tco.itemId=cazador.tco_itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                INNER JOIN vrhr_territorio.provincia pv on
                pv.itemId=mn.provinciaId
                INNER JOIN vrhr_territorio.departamento dp on
                dp.itemId=pv.departamentoId
                WHERE caza.itemId=`+req.params["id"]+``, {raw:true, type: Sequelize.QueryTypes.SELECT});
                // Reportes
                // .findAll({  
                //     raw:true,
                // attributes: ['itemId','fecha_reporte','coor_x','coor_y','estado','cantidad' ],
                // where:{
                //     itemId:req.params["id"]
                // },
                // include: [{
                //     as: 'cazador',
                //     raw:true,
                //     attributes: ["itemId",            ],
                //     model: Cazador,
                //     required: true,
                //     include: [{
                //         raw:true,
                //         attributes: ["itemId","nombre","apellido"],
                //         model: User,
                //         required: true,                      // alias on includes
                //       },
                //       {
                //         attributes: ["tco"],
                //         model: TCO,
                //         required: true,  
                //         include: [{
                //             raw:true,
                //             attributes: ["nombre_municipio"],
                //             model: Municipio,
                //             required: true,    
                //             include: [{
                //                 raw:true,
                //                 attributes: ["nombre_provincia"],
                //                 model: Provincia,
                //                 required: true,   
                //                 include: [{
                //                     raw:true,
                //                     attributes: ["nombre_departamento"],
                //                     model: Departamento,
                //                     required: true,                     
                
                //                   }
                //                 ] ,
                //               }
                //             ] ,
                //           }
                //         ] ,                    
    
                //       }
                //     ] ,
                //     }]  ,      
                // })
                
                var caza=rep[0];
                // var RepImg=await ReportesImagenes.findAll({
                //     attributes: ['itemId','url'],
                //     where:{
                //         caza_itemId:caza.itemId
                //     }
                // });
                var base;
                base=__dirname.substring(0,__dirname.length-25);
                base=base.replace(/\\/g, "/");
                var base;
                baseFile="file:///"+__dirname.substring(0,__dirname.length-25);
                baseFile=baseFile.replace(/\\/g, "/");
                var nombre=await obtenerUbicacion(caza.coor_y,caza.coor_x,base);
                // var imgs=[];
                // for(let img of RepImg){                    
                //     imgs.push(baseFile+"/"+img.dataValues.url.replace(/\\/g, "/"));
                // }
                var options=
                {
                    "format": "Letter", 
                    "orientation": "portrait", 
                    "border": {
                    "top": "0.8in",         
                    "right": "0.8in",
                    "bottom": "0.8in",
                    "left": "0.8in"
                    },
                    "base": baseFile+"/modelos_reporte/reporteCaza/",
                };
                var qr1=String(generateId())+".svg";
                var qr2=String(generateId())+".svg";
                var reporte={
                    numero:caza.itemId,
                    fecha:obtenerFecha(),
                    caza:caza,
                    qr1:qr1,
			qr2:qr2
                }
                console.log(traza[0]);

                    var trazaQR=String(traza[0].dpitemId)+" - "+String(traza[0].pvitemId)+" - "
                    +String(traza[0].mnitemId)+" - "+String(traza[0].tco)+"  /  "+String(traza[0].cupo_total)+" - "+String(traza[0].gestion_itemId);
                generar("caza",req.params["id"],base+"/modelos_reporte/reporteCaza/archivos/"+qr1);
                generarTraza(trazaQR,base+"/modelos_reporte/reporteCaza/archivos/"+qr2);
                // const content = repCaza(reporte,nombre,imgs);  
                const content = repCaza(reporte,nombre);  
		const pdf = require('html-pdf');
                pdf.create(content,options).toFile(base+"/modelos_reporte/reporteCaza/archivos/reporte_caza.pdf", function(err, result) {          
                    fs.unlinkSync(base+"/modelos_reporte/reporteCaza/archivos/"+nombre);     
                    fs.unlinkSync(base+"/modelos_reporte/reporteCaza/archivos/"+qr1);    
                    fs.unlinkSync(base+"/modelos_reporte/reporteCaza/archivos/"+qr2);
                    if (err){
			console.log(err);
                        res.status(500).send("error Interno");
                    } else {
                        var form = new FormData();
                        form.append('pdf',fs.createReadStream(base+"/modelos_reporte/reporteCaza/archivos/reporte_caza.pdf"));
                        res.setHeader('Content-Type', 'application/pdf');
                        form.pipe(res);
                    }
                });
            }
            catch(e){
                console.log(e);
                res.status(500).send("error");
            }
    },
    
    async list(req, res) {//console.log(req);
      try{
        var usuarioId=req.usuarioInfo.user.id;
        var cazas=await Reportes
        .findAll({  
            attributes: ['itemId','fecha_reporte','coor_x','coor_y','estado','cantidad'],
            include: [{
                attributes: [],
                model: Cazador,
                required: true,
                include: [{
                    attributes: [],
                    model: User,
                    required: true,                        

                  }] ,
                  
              where:{
                usuario_itemId:usuarioId
            }

              }]  ,
              

        });
        var cupo=await sequelize.query(`
        SELECT gtco.cupo_total total
        FROM gestion_tco gtco
          INNER JOIN catalogo_tco tco on
          tco.itemId=gtco.tco_itemId
          INNER JOIN cazador on
          cazador.tco_itemId=tco.itemId
          INNER JOIN usuario on
          usuario.itemId=cazador.usuario_itemId
          WHERE usuario.itemId=`+usuarioId+`
          and gtco.estado=1
          and gtco.gestion_itemId=`+String(new Date().getFullYear()), {raw:true, type: Sequelize.QueryTypes.SELECT}); 
        var usado=await sequelize.query(`
        SELECT SUM(caza.cantidad) usado
        FROM caza
          INNER JOIN cazador on
          caza.cazador_itemId=cazador.itemId
          INNER JOIN cazador cazador2 on
          cazador2.tco_itemId=cazador.tco_itemId
          INNER JOIN usuario on
          usuario.itemId=cazador2.usuario_itemId
          WHERE usuario.itemId=`+usuarioId+`
          and caza.estado=1
          and caza.gestion_itemId=`+String(new Date().getFullYear()), {raw:true, type: Sequelize.QueryTypes.SELECT}); 
        res.status(200).send(
          {
          cupoTotal:cupo[0].total,
          cupoUsado:Number(usado[0].usado),
          cazas:cazas
        }
        )
      }
      catch(e){
        console.log(e);
        res.status(500).send(e); 
      }
            
    },
    async agregar(req, res){
      var ver=await verificarFecha();
       if(ver){
        try{
          var date=new Date();
          var reporte=req.body;
          console.log(date.getFullYear());
          const Sequelize = require('sequelize'); const Op = Sequelize.Op;
          var Rep=await Reportes
          .create(
              {
                  cantidad: reporte.cantidad,
                  coor_x: reporte.coorX,
                  coor_y: reporte.coorY,                  
                  fecha_reporte: date.getTime(),
                  userCreate: req.usuarioInfo.user.id,
                  userUpdate: req.usuarioInfo.user.id,
                  dateCreate: date.getTime(),
                  dateUpdate: date.getTime(),
                  cazador_itemId: req.usuarioInfo.user.idCazador,
                  submodulo_itemId: 3,
                  estado:1,
                  gestion_itemId:date.getFullYear()
              }
          );
          res.status(200).send("correcto");
      }
      catch(e){
          console.log(e);
          res.status(500).send(e); 

      }

       }
       else{
        console.log(e);
        res.status(425).send({error:"No esta habilitado para relizar reportes en esta fecha"}); 
       }

    },
    async agregarMultiple(req, res) {
      var ver=await verificarFecha();
      if(ver){
          try{
            var date=new Date();
            var reporte=req.body;
            const Sequelize = require('sequelize'); const Op = Sequelize.Op;
            var listCazas=[];
            for(let caza of req.body.cazas){
              listCazas.push({
                cantidad: caza.cantidad,
                coor_x: caza.coorX,
                coor_y: caza.coorY,                  
                fecha_reporte: date.getTime(),
                userCreate: req.usuarioInfo.user.id,
                userUpdate: req.usuarioInfo.user.id,
                dateCreate: date.getTime(),
                dateUpdate: date.getTime(),
                cazador_itemId: req.usuarioInfo.user.idCazador,
                submodulo_itemId: 3,
                estado:1,
                gestion_itemId:date.getFullYear()
              })
            }
            var Rep=await Reportes.bulkCreate(
                  listCazas
            );
            console.log(req.body);
            res.status(200).send("correcto");
        }
        catch(e){
            console.log(e);
            res.status(500).send(e); 

        }
      }
      else{
        res.status(425).send({error:"No esta habilitado para relizar reportes en esta fecha"}); 
      }
  },
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
	const fetch = require('node-fetch');
var url="https://api.mapbox.com/styles/v1/mapbox/outdoors-v11/static/pin-s-marker-stroked+285A98("+x+","+y+")/"+x+","+y+",8,0/600x500@2x?access_token=pk.eyJ1Ijoib3RjYWxhZyIsImEiOiJja2l6MzBoMDAxM2N0MnFteTMwc3QwdjVnIn0.G4woqNAw-cX1p_LtyhbwmA";
	const response = await fetch(url);
console.log(url);
  	const data = await response.buffer();
  	//fs.writeFile(`./image.jpg`, buffer, () => 
    //console.log('finished downloading!'));
    //var imgBuffer=await osmsm({zoom:9,geojson: {"type":"Point","coordinates":[x,y]}});
    //var fs = require('fs');
    //const data = new Uint8Array(Buffer.from(imgBuffer));
    var nombre=generateId()+'.jpg';
    fs.writeFileSync(base+"/modelos_reporte/reporteCaza/archivos/"+nombre, data);
    return nombre;
  }
