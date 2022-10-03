

const { sequelize } = require('../../models');
const Sequelize = require('sequelize'); 
module.exports = {
  async list(req, res) {
   try{
    var item=await sequelize.query(`SELECT pv.nombre as nombre_provincia,pv.itemId from vrhr_territorio.provincia as pv where pv.departamentoId=`+req.params["id"], {raw:true,logging:false, type: Sequelize.QueryTypes.SELECT});
    res.status(200).send(item)
  }
   catch(err){
    res.status(400).send(err);
   }
},

}