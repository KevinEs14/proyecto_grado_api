


const { sequelize } = require('../../models');
const Sequelize = require('sequelize'); 
module.exports = {
  async list(req, res) {
   try{
    var item=await sequelize.query(`SELECT dp.nombre as nombre_departamento,dp.itemId from vrhr_territorio.departamento as dp`, {raw:true, logging:false,type: Sequelize.QueryTypes.SELECT});
    res.status(200).send(item)
  }
   catch(err){
    res.status(400).send(err);
   }
},

}