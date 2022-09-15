

const { sequelize } = require('../../models');
const Sequelize = require('sequelize'); 
module.exports = {
  async list(req, res) {
   try{
    var item=await sequelize.query(`SELECT tco.tco, tco.itemId from catalogo_tco tco  where tco.municipio_itemId=`+req.params["id"], {raw:true, type: Sequelize.QueryTypes.SELECT});
    res.status(200).send(item)
  }
   catch(err){
    res.status(400).send(err);
   }
},
  async obtenerEstado(req,res){
    try{
      var idTco=req.params["id"];
      var q1=await sequelize.query(`SELECT SUM(ac.entregado_chalecos) entregado,SUM(ac.total_precio) precio 
      from acta_cuero ac
      INNER JOIN representante_legal rl on
      rl.itemId=ac.representante_legal_itemId
      WHERE rl.tco_itemId=`+idTco+`
      and ac.estado=1`, {raw:true, type: Sequelize.QueryTypes.SELECT});
      var q2=await sequelize.query(`Select SUM(tcc.total_chalecos) custodia
      from tco_custodia_cuero tcc
      INNER JOIN representante_legal rl on
      rl.itemId=tcc.representante_legal_itemId
      WHERE rl.tco_itemId=`+idTco+`
      and tcc.estado=1`, {raw:true, type: Sequelize.QueryTypes.SELECT});
      res.status(200).send({
        entregado: q1[0].entregado,
        precio: q1[0].precio,
        custodia: q2[0].custodia
      })
    }
    catch(error){
      res.status(400).send(error);
    }


  }
}