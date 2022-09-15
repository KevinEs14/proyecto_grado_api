const Reportes = require('../../models').caza;
const ReportesImagenes = require('../../models').cazaImagenes;
const fs=require('fs');
const repCurtActasCarne=require("../../modelos_reporte/reporteCurtActas/reporte_curt_actas_carne");
const repCurtActasCuero=require("../../modelos_reporte/reporteCurtActas/reporte_curt_actas_cuero");
var osmsm = require('osm-static-maps');  
var FormData = require('form-data');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../models');
const genQR = require('../../lib/genQR');


module.exports = {
    async reporteCurtActasCuero(req,res){
            try{
                var itemId=req.params["id"];   
                var gestion=req.params["gestion"];   
                var curt=await sequelize.query(`
                SELECT cu.*
                FROM curtiembre cu
                WHERE cu.itemId=`+itemId, {raw:true, type: Sequelize.QueryTypes.SELECT}); 

                var actaT=await sequelize.query(`
                SELECT tco.itemId,tco.tco,mn.nombre nombre_municipio,SUM(ac.total_pie_cuadrado) as pie_cuadrado,SUM(ac.entregado_chalecos) as total_chalecos ,cu.curtiembre,cu.codigo
                FROM acta_cuero ac
                INNER JOIN responsable_curtiembre rc on
                rc.itemId=ac.responsable_curtiembre_itemId
                INNER JOIN curtiembre cu on 
                cu.itemId=rc.curtiembre_itemId
                INNER JOIN representante_legal rl on
                rl.itemId=ac.representante_legal_itemId
                INNER JOIN catalogo_tco tco on
                tco.itemId=rl.tco_itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                WHERE ac.estado=1 and cu.itemId=`+itemId+`
                and ac.gestion_itemId=`+gestion+`
                GROUP BY tco.itemId `
                , {raw:true, type: Sequelize.QueryTypes.SELECT});    
                if(curt.length!=0){   
                    for(let tco of actaT){
                        var actaS=await sequelize.query(`
                        SELECT ac.*, mn.nombre nombre_municipio,tco.tco
                        FROM acta_cuero ac
                        INNER JOIN responsable_curtiembre rc on
                        rc.itemId=ac.responsable_curtiembre_itemId
                        INNER JOIN curtiembre cu on 
                        cu.itemId=rc.curtiembre_itemId
                        INNER JOIN representante_legal rl on
                        rl.itemId=ac.representante_legal_itemId
                        INNER JOIN catalogo_tco tco on
                        tco.itemId=rl.tco_itemId
                        INNER JOIN vrhr_territorio.municipio mn on
                        mn.itemId=tco.municipio_itemId
                        WHERE ac.estado=1 and tco.itemId=`+tco.itemId+`
                        and ac.gestion_itemId=`+gestion+`
                        ORDER BY tco.itemId;`, {raw:true, type: Sequelize.QueryTypes.SELECT}
                        );
                        tco["actas"]=actaS;
                    }
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
                        "base": baseFile+"/modelos_reporte/reporteCurtActas/",
                    };
                    var qr1=String(generateId())+".svg"; 
                    var reporte={
			gestion:gestion,
                        fecha:obtenerFecha(),
                        actas:actaT,
                        curt:curt[0],
                        qr1:qr1
                    }
                    const content = repCurtActasCuero(reporte);   
                    genQR.generarGestion("curtActasCuero",itemId,gestion,base+"/modelos_reporte/reporteCurtActas/archivos/"+qr1); 

			const pdf = require('html-pdf');        
                    pdf.create(content,options).toFile(base+"/modelos_reporte/reporteCurtActas/archivos/reporte_curt_actas.pdf", function(err, result) {                                  
                        fs.unlinkSync(base+"/modelos_reporte/reporteCurtActas/archivos/"+qr1);     
                        if (err){
                            console.log(err);
                            res.status(500).send("error Interno");
                        } else {
                            var form = new FormData();
                            form.append('pdf',fs.createReadStream(base+"/modelos_reporte/reporteCurtActas/archivos/reporte_curt_actas.pdf"));
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
    async reporteCurtActasCarne(req,res){
        try{
            var itemId=req.params["id"];  
            var gestion=req.params["gestion"];    
            var curt=await sequelize.query(`
            SELECT cu.*
            FROM curtiembre cu
            WHERE cu.itemId=`+itemId, {raw:true, type: Sequelize.QueryTypes.SELECT}); 

            var actaT=await sequelize.query(`
            SELECT tco.itemId,tco.tco,mn.nombre nombre_municipio,SUM(ac.precio_carne_primera+ac.precio_carne_segunda+ac.precio_charque) precio_total,SUM(ac.entregado_carne_primera) as carne_primera,
SUM(ac.entregado_carne_segunda) as carne_segunda,
            SUM(ac.entregado_charque) as charque ,cu.curtiembre,cu.codigo
            FROM acta_carne ac
            INNER JOIN responsable_curtiembre rc on
            rc.itemId=ac.responsable_curtiembre_itemId
            INNER JOIN curtiembre cu on 
            cu.itemId=rc.curtiembre_itemId
            INNER JOIN representante_legal rl on
            rl.itemId=ac.representante_legal_itemId
            INNER JOIN catalogo_tco tco on
            tco.itemId=rl.tco_itemId
            INNER JOIN vrhr_territorio.municipio mn on
            mn.itemId=tco.municipio_itemId
            WHERE ac.estado=1 and cu.itemId=`+itemId+`
            and ac.gestion_itemId=`+gestion+`
            GROUP BY tco.itemId `
            , {raw:true, type: Sequelize.QueryTypes.SELECT});    
            if(curt.length!=0){   
                for(let tco of actaT){
                    var actaS=await sequelize.query(`
                    SELECT ac.*, mn.nombre nombre_municipio,tco.tco
                    FROM acta_carne ac
                    INNER JOIN responsable_curtiembre rc on
                    rc.itemId=ac.responsable_curtiembre_itemId
                    INNER JOIN curtiembre cu on 
                    cu.itemId=rc.curtiembre_itemId
                    INNER JOIN representante_legal rl on
                    rl.itemId=ac.representante_legal_itemId
                    INNER JOIN catalogo_tco tco on
                    tco.itemId=rl.tco_itemId
                    INNER JOIN vrhr_territorio.municipio mn on
                    mn.itemId=tco.municipio_itemId
                    WHERE ac.estado=1 and tco.itemId=`+tco.itemId+`
                    and ac.gestion_itemId=`+gestion+`
                    ORDER BY tco.itemId;`, {raw:true, type: Sequelize.QueryTypes.SELECT}
                    );
                    tco["actas"]=actaS;
                }

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
                    "base": baseFile+"/modelos_reporte/reporteCurtActas/",
                };
                var qr1=String(generateId())+".svg"; 
                console.log(obtenerFecha());
                var reporte={
			gestion:gestion,
                    fecha:obtenerFecha(),
                    actas:actaT,
                    curt:curt[0],
                    qr1:qr1
                }
                const content = repCurtActasCarne(reporte);    
                    genQR.generarGestion("curtActasCarne",itemId,gestion,base+"/modelos_reporte/reporteCurtActas/archivos/"+qr1);  

		const pdf = require('html-pdf');       
                pdf.create(content,options).toFile(base+"/modelos_reporte/reporteCurtActas/archivos/reporte_curt_actas.pdf", function(err, result) {                                  
                    fs.unlinkSync(base+"/modelos_reporte/reporteCurtActas/archivos/"+qr1);     
                    if (err){
                        console.log(err);
                        res.status(500).send("error Interno");
                    } else {
                        var form = new FormData();
                        form.append('pdf',fs.createReadStream(base+"/modelos_reporte/reporteCurtActas/archivos/reporte_curt_actas.pdf"));
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