
const jwt = require('jsonwebtoken');
const Key = require('../config/key');
const ReportesCaza = require('../controllers').caza;
const ReportesActaCuero = require('../controllers').actaCuero;
const ReportesActaCarne = require('../controllers').actaCarne;
const ReportesActas = require('../controllers').curtActas
const reporte=function getDataToken(req,res,next){  
    try{
        var token=req.params["token"];
        const data =jwt.verify(token,String(Key.apiKey));
        console.log(data);
        var rep=data.data["reporte"];
        req.params["id"]=data.data["id"];
        req.params["gestion"]=data.data["gestion"];
        switch(rep){
            case "caza":
                ReportesCaza.reporteCaza(req,res);

                break;
            case "actaCuero":
                ReportesActaCuero.reporteActaCuero(req,res);
                break;
            case "actaCarne":
                ReportesActaCarne.reporteActaCarne(req,res);
                    break;
            case "curtActasCuero":
                ReportesActas.reporteCurtActasCuero(req,res);
                break;
            case "curtActasCarne":
                ReportesActas.reporteCurtActasCarne(req,res);
                break;
            default:    
                break;
        }

    }
    catch(e){
        console.log(e);
        res.status(403).send("error");
    }
}
module.exports={
    reporte
};