const morgan = require('morgan');

const Usuario = require('../../models').user;
const Reportes = require('../../models').caza;
const crypt =require('../../lib/md5');
const { verificar } = require('../../lib/token');
const token=require('../../lib/token');
const sequelize = Reportes.sequelize; 
const sequelize2 = Usuario.sequelize;
const Cazador = require('../../models').cazador;
const {verificarFecha}=require('../../lib/token');
const {verificarCupoTCO}=require('../../lib/token');
module.exports = {
    async login(req, res) {//
        var ver=await verificarFecha();
        if(ver){
            console.log(req.body);
            try{
                User=await Cazador.findAll({
                    attributes: ['itemId'],
                    include: [{
                        attributes: ["itemId","rol_itemId"],
                        model: Usuario,
                        required: true,
                        where:{
                            usuario:req.body.usuario,
                            password:crypt(req.body.password),
                            rol_itemId:2
                        },
                      }]  ,
                });
                console.log(User.length);
                if(User.length==0){
                    res.status(400).send("No se encontro el usuario");
                }
                else{
			var verTco=await verificarCupoTCO(User[0].itemId);
			if(verTco){
                    var tok=token.getToken(User[0].user.itemId,User[0].user.rol_itemId,User[0].itemId);
                    res.status(200).send(tok);}
			else{
                res.status(425).send("No puede realizar reportes en esta fecha");
			}
                }
            }
            catch(err){
                console.log(err);
                res.status(500).send("Error interno");
    
            }
        }
        else{
            res.status(425).send("No puede realizar reportes en esta fecha");
        }

    },
    async verificar(req, res) {

        var {tokenId}=req.params;
        console.log(tokenId);
        try{    

            const veri=token.verificar(String(tokenId));

            if(veri!=="error"){
                res.status(200).send({id:veri});
            }
            else{
                res.status(400).send("No se encontro el usuario");
            }
        }
        catch(err){
            console.log(err);
            res.status(500).send("Error interno");

        }

    },

};