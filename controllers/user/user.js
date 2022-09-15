

const User= require('../../models').user;
const {verificarFecha}=require('../../lib/token');
const Sequelize = require('sequelize'); 
const { sequelize } = require('../../models');
const fs=require('fs');
module.exports = {
  async list(req, res) {
    
    var ver=await verificarFecha();
    if(ver){
    return User
        .findAll({  
            attributes: ['itemId','nombre','apellido','email'],
                  
              where:{
                itemId:req.usuarioInfo.user.id
            }
              

        })
        .then((item) => res.status(200).send(item))
        .catch((error) => { res.status(400).send(error); });
    }
    else{
      res.status(425).send("No puede realizar reportes en esta fecha");
    }
},
async subirDocumento(req,res){
  try{
    if(req.usuarioInfo==undefined){
      var path=req.files[0].filename;
      var pathBorrar=await sequelize.query(`
      SELECT usuario.path_doc_ver from usuario where itemId=`+req.body.id, {raw:true, type: Sequelize.QueryTypes.SELECT}); 
      if(pathBorrar[0].path_doc_ver){
        fs.unlinkSync("uploads/"+pathBorrar[0].path_doc_ver);
      }
      await sequelize.query(`
      UPDATE usuario set path_doc_ver='usuario/`+path+`' where itemId=`+req.body.id, {raw:true, type: Sequelize.QueryTypes.UPDATE}); 
      res.status(200).send("correcto");
    }
    else{
      res.status(404).send("No se pudo registrar"); 
      
    }
  }
  catch(e){
      console.log(e);
      res.status(404).send(e); 

  }
}

}