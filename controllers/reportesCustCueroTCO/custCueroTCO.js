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
const { Workbook } =require('exceljs')


module.exports = {
    async reporteCustCueroTCO(req,res){
            try{
                var itemId=req.params["id"];   
                var gestion=req.params["gestion"];   

                var actaT=await sequelize.query(`
                SELECT tcc.itemId,tcc.total_chalecos,tcc.comunidad
                FROM tco_custodia_cuero tcc
                INNER JOIN representante_legal rl on
                rl.itemId=tcc.representante_legal_itemId
                INNER JOIN catalogo_tco tco on
                tco.itemId=rl.tco_itemId
                INNER JOIN vrhr_territorio.municipio mn on
                mn.itemId=tco.municipio_itemId
                WHERE tcc.estado=1 and tco.itemId=`+itemId+`
                 and tcc.gestion_itemId=`+gestion
                , {raw:true, type: Sequelize.QueryTypes.SELECT});    
                if(actaT.length!=0){   
                    let workbook=new Workbook();
                    let worksheet = workbook.addWorksheet("Hoja 1");
                    worksheet.properties.outlineLevelCol = 2;
                    worksheet.properties.defaultColWidth = 17;
                    worksheet.addRow(["Comunidad","Numero de acta","Rango de Tallas Chaleco(m)","Total cueros movilizados"]);
                    worksheet.getCell('A1').fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'BFBFBF'}
                      };
                    worksheet.getCell('A1').alignment = { wrapText: true };
                    worksheet.getCell('B1').fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'BFBFBF'}
                      }; 
                      worksheet.getCell('B1').alignment = { wrapText: true };
                      worksheet.getCell('C1').fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'BFBFBF'}
                      };
                      worksheet.getCell('C1').alignment = { wrapText: true };
                    worksheet.getCell('D1').fill = {
                        type: 'pattern',
                        pattern:'solid',
                        fgColor:{argb:'BFBFBF'}
                      }; 
                      worksheet.getCell('D1').alignment = { wrapText: true };
                    var colAM=10;
                    for(let acta of actaT){
                        var actaS=await sequelize.query(`
                        SELECT tccl.cantidad,lc.min,lc.max
                        FROM tco_custodia_cuero_longitud tccl
                        INNER JOIN tco_custodia_cuero tcc
                        on tcc.itemId=tccl.tco_custodia_cuero_itemId
                        INNER JOIN catalogo_longitud_cuero lc
                        on lc.itemId=tccl.longitud_cuero_itemId
                        WHERE tcc.estado=1 and tcc.itemId=`+acta.itemId+`
                        ORDER BY longitud_cuero_itemId`, {raw:true, type: Sequelize.QueryTypes.SELECT}
                        );
                        var total=0;
                        for(let long of actaS){
                            total+=Number(long.cantidad);
                            worksheet.addRow(["","",String(long["min"])+" a "+String(long["max"]),long.cantidad]);
                        }
                        worksheet.addRow([acta.comunidad,acta.itemId,"Total",total]);  
                        worksheet.getCell('D'+String(colAM)).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{argb:'FFFF00'}
                          };
                        worksheet.getCell('C'+String(colAM)).fill = {
                            type: 'pattern',
                            pattern:'solid',
                            fgColor:{argb:'FFFF00'}
                          };  
                          
                            worksheet.mergeCells('A'+String(colAM-8)+':A'+String(colAM));
                            worksheet.getCell('A'+String(colAM-8)).value = acta.comunidad;
                            worksheet.getCell('A'+String(colAM-8)).alignment = { wrapText: true,vertical:'middle',horizontal:'center'};
                            
                            worksheet.mergeCells('B'+String(colAM-8)+':B'+String(colAM));
                            worksheet.getCell('B'+String(colAM-8)).value = String(acta.itemId).padStart(5,'0');
                            worksheet.getCell('B'+String(colAM-8)).alignment = { wrapText: true,vertical:'middle',horizontal:'center' };
                          colAM+=9;
                    }
                    var nombre="./modelos_reporte/reporteCustCueroTCO/"+ generateId()+".xlsx";
                    var bolb= await workbook.xlsx.writeBuffer();
                    console.log(bolb);
                    var {Base64Encode} = require('base64-stream');

                    var base=bolb.toString('base64');
                    // This will wait until we know the readable stream is actually valid before piping
                    // readStream.on('open', function () {
                    //     This just pipes the read stream to the response object (which goes to the client)
                    //     readStream.pipe(new Base64Encode()).pipe(res);
                    // });
                    // This catches any errors that happen while creating the readable stream (usually invalid names)
                    // readStream.on('error', function(err) {
                    //     res.end(err);
                    // });
                    res.send(base);
                }
                else{
                    res.status(204).send("No se encontraron registros con esta TCO");
                }
            }
            catch(e){
                console.log(e);
                res.status(500).send("error");
            }
    }
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