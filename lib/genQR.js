
const token=require('../lib/token');
async function generar(reporte,id,ruta){
    
    var qr = require('qr-image');  
    var fs = require('fs');
    var tok=await token.getTokenGen({reporte:reporte,id:id});
    var code = await qr.image('http://44.210.94.102:3000/general/pdf/'+tok, { type: 'svg',ec_level:'L' });  
    var output = await fs.createWriteStream(ruta);

    code.pipe(output);
}
async function generarGestion(reporte,id,gestion,ruta){
    
    var qr = require('qr-image');  
    var fs = require('fs');
    var tok=await token.getTokenGen({reporte:reporte,id:id,gestion:gestion});
    var code = await qr.image('http://44.210.94.102:3000/general/pdf/'+tok, { type: 'svg',ec_level:'L' });  
    var output = await fs.createWriteStream(ruta);

    code.pipe(output);
}
async function generarTraza(reporte,ruta){
    
    var qr = require('qr-image');  
    var fs = require('fs');
    var code = await qr.image(reporte, { type: 'svg',ec_level:'L' });  
    var output = await fs.createWriteStream(ruta);

    code.pipe(output);
}
module.exports={
    generar,
    generarTraza,
generarGestion
};