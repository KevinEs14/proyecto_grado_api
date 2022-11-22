
const jwt = require('jsonwebtoken');
const Key = require('../config/key');
const morgan = require('morgan');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../models');
const verificar=async function getDataToken(req,res,next){  
    if(req.params["path"]==="resoluciones"){
        next();
    }
    else{
	console.log(String(req.headers.referer).substring(0,21));
        if(req.headers.referer==="http://44.210.94.102/"||req.headers.origin==="http://44.210.94.102"||String(req.headers.referer).substring(0,21)==="http://44.210.94.102"){
        next();
    }
    else{
        var ver=await verificarFecha();
        if(ver){
            try{
                console.log(req.headers);
                token=req.headers.authorizationapp;
                const data =jwt.verify(token,String(Key.apikey));
                req.usuarioInfo=data;
console.log(data);
		var verTco=await verificarCupoTCO(data.user.idCazador);
		if(verTco)
                next();
		else
                res.status(403).send("error");
		

            }
            catch(e){
                console.log(e);
                res.status(403).send("error");
            }
            
        }
        else{
            res.status(425).send("No puede realizar reportes en esta fecha");
        }
    }
}
}
var verificarFecha=async  function(){
  
var d = new Date().toLocaleDateString().split("/"); 
// `y` : year
var y = d.splice(-1)[0];
// set `y` as item at index `0` of `d`
d.splice(0, 0, y);
// join items within `d` with dash character `"-"`
var date = d.join("-");
    var usado=await sequelize.query(
      `select gestion.itemId from gestion where gestion.ini_caza <= '`+date+`' and gestion.fin_caza >= '`+date+`'`, {raw:true, type: Sequelize.QueryTypes.SELECT}); 
    if(usado.length>0){
      return true;
    }
    else{
      return false;
    }
  }
var verificarCupoTCO=async  function(cazadorId){
  
    var tco=await sequelize.query(
      `select cazador.itemId from cazador JOIN gestion_tco on gestion_tco.tco_itemId=cazador.tco_itemId where cazador.itemId= '`+cazadorId+`' and gestion_tco.gestion_itemId='`+new Date().getFullYear()+`'`, {raw:true, type: Sequelize.QueryTypes.SELECT}); 
    if(tco.length>0){
      return true;
    }
    else{
      return false;
    }
  }
const getToken=function getToken(id,rol,idCazador){ 
    const user={id:id,rol,idCazador}
    console.log(user);
    const token =jwt.sign({user},String(Key.apikey));
    return token;
}
const getTokenGen=function getTokenGen(data){   
    const token =jwt.sign({data},String(Key.apikey));
    return token;
}
module.exports={
    verificar,
    getToken,
    getTokenGen,
    verificarFecha,
verificarCupoTCO
};