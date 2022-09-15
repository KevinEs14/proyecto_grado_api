const caza = require("./caza");

module.exports= function genCaza(reporte,imagenes,ubicacion){
        var html=`<!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.0 Transitional//EN">
        <HTML>
        <HEAD>
            <META HTTP-EQUIV="CONTENT-TYPE" CONTENT="text/html; charset=utf-8">
            <TITLE></TITLE>
        </HEAD>
        <BODY LANG="es-BO" DIR="LTR" >  
<p><strong><img src="https://upload.wikimedia.org/wikipedia/commons/b/b6/Escudo_de_Bolivia.svg" alt="" width="72" height="62" />&nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; &nbsp; MINISTERIO DE MEDIO AMBIENTE Y AGUA&nbsp; &nbsp; &nbsp; &nbsp; <img src="https://miofi.mmaya.gob.bo/template/user/sirh/images/login/logo_mmaya2018.png" alt="" width="120" height="40" /></strong></p>
<h1 style="text-align: center;"><strong>REPORTE DE CAZA</strong></h1>
<table style="border: 2px solid black; border-radius: 25px;" width="100%" cellpadding="20">
<tbody>
<tr style="height: 209.469px;">
<td style="height: 209.469px;" width="100%">
<h2 style="text-align: center;"><strong>Detalles del cazador</strong></h2>
<p><strong>Id Cazador: </strong>`+reporte.cazador.idCazador+`</p>
<p><strong>Id Usuario:</strong> `+reporte.cazador.idUsuario+`</p>
<p><strong>Nombre del Cazador:</strong> `+reporte.cazador.nombre+`</p>
<p><strong>TCO: </strong> `+reporte.cazador.tco+`</p>
<p><strong>Municipio: </strong> `+reporte.cazador.municipio+`</p>
<p><strong>Provincia:</strong> `+reporte.cazador.provincia+`</p>
<p><strong>Departamento:</strong> `+reporte.cazador.departamento+`</p>
<p>&nbsp;</p>
</td>
</tr>
</tbody>
</table>
<p><strong>&nbsp;</strong></p>
<table style="border: 2px solid black; border-radius: 25px;" width="100%"cellpadding="20">
<tbody>
<tr style="height: 157.469px;">
<td style="height: 157.469px;" width="100%">
<h2 style="text-align: center;"><strong>Reporte</strong></h2>
<p><strong>Contenido:</strong></p>
<p style="height:160px">sssssssssssssssss s s ssssssssssssss ssssssssssssssssss s s s s  sssssssssssssssss s s ssssssssssssss ssssssssssssssssss s s s s sssssssssssssssss s s ssssssssssssss ssssssssssssssssss s s s s sssssssssssssssss s s ssssssssssssss ssssssssssssssssss s s s s sssssssssssssssss s s ssssssssssssss ssssssssssssssssss s s s s </p> 
<p><strong>Cantidad de lagartos:</strong>`+reporte.caza.cantidad+`</p>
</td>
</tr>
</tbody>
</table>
<h2 style="text-align: center;"><strong>Ubicacion</strong></h2>
<p style="text-align: center;"><strong><img src="`+ubicacion+`" alt="" width="443" height="332" /></strong></p>
<p style="text-align: center;">&nbsp;</p>
<h2 style="text-align: center;"><strong>Imagenes Reporte</strong></h2>`;
        for(let i=0;i<8;i++){
            for(let j in imagenes){
                html+=`<p style="text-align: center;"><strong><img src="`+imagenes[j]+`" alt="" width="494" height="370" /></strong></p>`;
            }
        }
    html+=`
    </BODY>
    </HTML> `;   
    return html;
    }