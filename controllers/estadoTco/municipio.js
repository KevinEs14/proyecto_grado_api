


const { sequelize } = require('../../models');
const Sequelize = require('sequelize'); 
module.exports = {
  async list(req, res) {
   try{
    var item=await sequelize.query(`SELECT mn.nombre as nombre_municipio,mn.itemId from vrhr_territorio.municipio mn where mn.provinciaId=`+req.params["id"], {raw:true,logging:false, type: Sequelize.QueryTypes.SELECT});
    res.status(200).send(item)
  }
   catch(err){
    res.status(400).send(err);
   }
},

}