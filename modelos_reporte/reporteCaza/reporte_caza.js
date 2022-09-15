var functions=require('./archivos/functions');
module.exports= function genCaza(reporte,ubicacion){
    console.log(reporte);
    console.log(reporte.caza['cazador.itemId']);
        var html=`

<html>
    <head>
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type">
        <link rel="stylesheet" href="archivos/style.css">
    </head>
    <body>
        <div class="invoice-box">
            <table cellpadding="0" cellspacing="0">
                <tr class="top">
                    <td colspan="2">
                        <table>
                            <tr>
                                <td class="title">
                                    <img src="archivos/logo_ucb.png" style="width:100%; max-width:100px;max-height:100px;" />
                                </td>
                                <td>
                                    N° ${String(reporte.numero).padStart(7,'0')}
                                    <br> Fecha: ${reporte.fecha}
                                </td>
                                <td>
                                <img src="archivos/${reporte.qr2}" style="width:100%; max-width:70px;max-height:70px;" />
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 ">
                        <table>
                            <tr>
                                <td>
                                    <strong>Id Usuario:</strong>  ${reporte.caza['usuario.itemId']}<br>
                                    <strong>Fecha de reporte:</strong>  ${functions.obtenerFecha(new Date(reporte.caza['fecha_reporte']))}<br>
                                    <strong>Nombre Cazador:</strong>  ${reporte.caza['usuario.nombre']+" "+reporte.caza['usuario.apellido']}<br>

                                    <strong>Municipio:</strong>  ${reporte.caza['nombre_municipio']}<br>
                                    <strong>Provincia:</strong>  ${reporte.caza['nombre_provincia']}<br>
                                    <strong>Departamento:</strong>  ${reporte.caza['nombre_departamento']}<br>
                                    <strong>Regional:</strong>  ${reporte.caza['tco.tco']}
                                </td>
                                <td>
                                <img src="archivos/${reporte.qr1}" style="width:100%; max-width:90px;max-height:90px;" />
                                    
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr >
                    <td colspan="2 " style="text-align:center">
                        <div style="
                        font-size: 25px;"><strong>Cantidad cazada:</strong> ${reporte.caza.cantidad}</div>
                    </td>
                </tr>
                <tr style="height:40px;"></tr>
                <tr class="information ">
                    <th colspan="2 " style="text-align:center">
                        <h2>Ubicación</h2>
                    </th>
                </tr>
                <tr style="padding:-600px;">
                    <td  style="text-align:center">
			<img style=" max-width:370px;max-height:370px;" src="archivos/${ubicacion}" >
                    
                    </td>
                </tr>                
            </table>
        </div>
    </body>
</html>
        `;   
        console.log(html);
    return html;
    }