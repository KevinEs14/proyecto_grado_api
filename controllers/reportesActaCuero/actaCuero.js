const Reportes = require('../../models').caza;
const ReportesImagenes = require('../../models').cazaImagenes;
const fs=require('fs');
const repActaCuero=require("../../modelos_reporte/reporteActaCuero/reporte_acta_cuero");
var osmsm = require('osm-static-maps');  
var FormData = require('form-data');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../models');
const genQR = require('../../lib/genQR');


module.exports = {
    async reporteActaCuero(req,res){
            try{
                var itemId=req.params["id"];
                var traza=await sequelize.query(`
                SELECT dp.nombre  as dpitemId,pv.nombre as pvitemId,mn.nombre as mnitemId,tco.tco,gestion_tco.cupo_total,gestion_tco.gestion_itemId
                FROM acta_cuero ac
                INNER JOIN representante_legal rl on
                rl.itemId=ac.representante_legal_itemId
                INNER JOIN catalogo_tco tco on
                tco.itemId=rl.tco_itemId
                INNER JOIN gestion_tco on
                gestion_tco.tco_itemId=tco.itemId
		        AND gestion_tco.gestion_itemId=ac.gestion_itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                INNER JOIN vrhr_territorio.provincia pv on
                pv.itemId=mn.provinciaId
                INNER JOIN vrhr_territorio.departamento dp on
                dp.itemId=pv.departamentoId
                WHERE ac.itemId=`+itemId+` 
                and ac.estado=1 
                and tco.estado=1
                and gestion_tco.estado=1`, {raw:true,logging:false, type: Sequelize.QueryTypes.SELECT});
                var actaG=await sequelize.query(`
                SELECT ac.*,tco.tco,mn.nombre nombre_municipio
                ,pv.nombre nombre_provincia,dp.nombre as nombre_departamento,
                ucu.itemId res_cur_id,
                CONCAT(ucu.nombre, ' ', ucu.apellido) res_cur_nombre,
                ucu.ci as res_cur_ci,
                ciecu.abr as res_cur_ci_exp,
                cu.curtiembre as res_cur_cur,
                cu.codigo as res_cur_cur_cod,
                url.itemId rep_leg_id,
                CONCAT(url.nombre, ' ', url.apellido) rep_leg_nombre,
                url.ci as rep_leg_ci,
                cierl.abr as rep_leg_ci_exp
                FROM acta_cuero as ac
                INNER JOIN representante_legal rl on
                rl.itemId=ac.representante_legal_itemId
                INNER JOIN catalogo_tco tco on 
                rl.tco_itemId=tco.itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                INNER JOIN vrhr_territorio.provincia pv on
                pv.itemId=mn.provinciaId
                INNER JOIN vrhr_territorio.departamento dp on
                dp.itemId=pv.departamentoId
                INNER JOIN responsable_curtiembre rc on
                rc.itemId=ac.responsable_curtiembre_itemId
                INNER JOIN curtiembre cu on 
                cu.itemId=rc.curtiembre_itemId 
                INNER JOIN usuario ucu on
                ucu.itemId=rc.usuario_itemId
                INNER JOIN usuario url on
                url.itemId=rl.usuario_itemId
                INNER JOIN catalogo_ci_exp cierl on
                url.ci_exp_itemId=cierl.itemId
                INNER JOIN catalogo_ci_exp ciecu on
                ucu.ci_exp_itemId=ciecu.itemId
                WHERE ac.estado=1 and ac.itemId=`+itemId, {raw:true,logging:false, type: Sequelize.QueryTypes.SELECT}
                );    
                var actaS=await sequelize.query(`
                SELECT acl.*,
                CONCAT(lc.min, ' a ', lc.max) longitud
                FROM acta_cuero_longitud acl 
                INNER JOIN catalogo_longitud_cuero lc on
                lc.itemId=acl.longitud_cuero_itemId
                INNER JOIN acta_cuero ac on
                ac.itemId=acl.acta_cuero_itemId
                WHERE ac.estado=1 and ac.itemId=`+itemId
                , {raw:true,logging:false, type: Sequelize.QueryTypes.SELECT});  
                if(actaG.length!=0){     
                    var totales=[0,0,0,0,0.00,0.00,0.00];
                    for(let long of actaS){
                       totales[0]+=Number(long["cantidad"]);
                       totales[1]+=Number(long["primera"]);
                       totales[2]+=Number(long["segunda"]);
                       totales[3]+=Number(long["rechazados"]);
                       totales[4]+=Number(long["pie_cuadrado"]);
                       totales[5]+=Number(long["precio_unidad"]);
                       totales[6]+=Number(long["precio_total"]);
                    }  
                    for(let j=4;j<totales.length;j++){
                        totales[j]=(Math.round(totales[j] * 100) / 100).toFixed(2);
                    }  
                    var actaCuero=actaG[0];
                    var base;
                    base=__dirname.substring(0,__dirname.length-30);
                    base=base.replace(/\\/g, "/");
                    var base;
                    
                    baseFile="file:///"+__dirname.substring(0,__dirname.length-30);
                    baseFile=baseFile.replace(/\\/g, "/");
                    var options=
                    {
                        "format": "Letter", 
                        "orientation": "portrait", 
                        "border": {
                        "top": "0.2in",         
                        "right": "0.2in",
                        "bottom": "0.2in",
                        "left": "0.2in"
                        },
                        "base": baseFile+"/modelos_reporte/reporteActaCuero/",
                    };
                    
                    var qr1=String(generateId())+".svg";
                    var qr2=String(generateId())+".svg";
                    var reporte={
                        fecha:obtenerFecha(),
                        actaCuero:actaCuero,
                        longitudes:actaS,
                        totales:totales,
                        qr1:qr1,
                        qr2:qr2
                    }
                    const content = repActaCuero(reporte);    
                    var trazaQR=String(traza[0].dpitemId)+" - "+String(traza[0].pvitemId)+" - "
                    +String(traza[0].mnitemId)+" - "+String(traza[0].tco)+"  /  "+String(traza[0].cupo_total)+" - "+String(traza[0].gestion_itemId);
                    genQR.generar("actaCuero",itemId,base+"/modelos_reporte/reporteActaCuero/archivos/"+qr1);    
                    genQR.generarTraza(trazaQR,base+"/modelos_reporte/reporteActaCuero/archivos/"+qr2);  

			const pdf = require('html-pdf');       
                    pdf.create(content,options).toFile(base+"/modelos_reporte/reporteActaCuero/archivos/reporte_acta_cuero.pdf", function(err, result) {                                  
                                 fs.unlinkSync(base+"/modelos_reporte/reporteActaCuero/archivos/"+qr1);     
                                fs.unlinkSync(base+"/modelos_reporte/reporteActaCuero/archivos/"+qr2);
                        if (err){
                            console.log(err);
                            res.status(500).send("error Interno");
                        } else {
                            var form = new FormData();
                            form.append('pdf',fs.createReadStream(base+"/modelos_reporte/reporteActaCuero/archivos/reporte_acta_cuero.pdf"));
                            res.setHeader('Content-Type', 'application/pdf');
                            form.pipe(res);
                        }
                    });
                }
                else{
                    res.status(500).send("error");
                }
            }
            catch(e){
                console.log(e);
                res.status(500).send("error");
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
    var imgBuffer=await osmsm({zoom:9,geojson: {"type":"Point","coordinates":[x,y]}});
    var fs = require('fs');
    const data = new Uint8Array(Buffer.from(imgBuffer));
    var nombre=generateId()+'.jpg';
    fs.writeFileSync(base+"/modelos_reporte/reporteCaza/archivos/"+nombre, data);
    return nombre;
  }