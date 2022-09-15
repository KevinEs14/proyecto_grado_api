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
                                    <img src="archivos/Escudo_de_Bolivia.svg" style="width:100%; max-width:70px;max-height:70px;" />
                                    <img src="archivos/logo_mmaya2018.png" style="width:100%; max-width:150px;max-height:70px;" />
                                </td>
                                <td>
                                    N° ${String(reporte.numero).padStart(7,'0')}
                                    <br> Fecha: ${reporte.fecha}
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
                                    <strong>Id Cazador:</strong> ${reporte.caza['cazador.itemId']}<br>
                                    <strong>Id Usuario:</strong>  ${reporte.caza['cazador.user.itemId']}<br>
                                    <strong>Fecha de reporte:</strong>  ${functions.obtenerFecha(new Date(reporte.caza['fecha_reporte']))}<br>
                                    <strong>Nombre Cazador:</strong>  ${reporte.caza['cazador.user.nombre']+" "+reporte.caza['cazador.user.apellido']}<br>
                                    <strong>TCO:</strong>  ${reporte.caza['cazador.tco.tco']}<br>
                                    <strong>Municipio:</strong>  ${reporte.caza['cazador.tco.municipio.nombre_municipio']}<br>
                                    <strong>Provincia:</strong>  ${reporte.caza['cazador.tco.municipio.provincium.nombre_provincia']}<br>
                                    <strong>Departamento:</strong>  ${reporte.caza['cazador.tco.municipio.provincium.departamento.nombre_departamento']}
                                </td>
                                <td>
                                <img src="archivos/${reporte.qr1}" style="width:100%; max-width:90px;max-height:90px;" />
                                    
                                </td>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 " style="text-align:center">
                        <h2>Reporte de Caza</h2>
                    </td>
                </tr>
                <tr class="heading ">
                    <td>
                        Reporte
                    </td>
                    <td>
                        Cantidad
                    </td>
                </tr>
                <tr class="item" height=200px>
                    <td style="text-align:justify">
                        ${reporte.caza.reporte}
                    </td>
                    <td style="text-align:center">
                        ${reporte.caza.cantidad}
                    </td>
                </tr>
                
                <tr class="item" height=250px>
                </tr>
                <tr class="information ">
                    <td colspan="2 " style="text-align:center">
                        <h2>Ubicación</h2>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 " style="text-align:center">
                    <img src="archivos/${ubicacion}" style="width:100%; max-width:500px;max-height:500px;" />
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 " style="text-align:center;height:450px">
                        <h2></h2>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 " style="text-align:center">
                        <h2>Imágenes</h2>
                    </td>
                </tr>
                <tr class="heading ">
                    <td colspan="2" style="width:100%">
                        <table style="width:100%">                                                   
                                `;
                                        
                                    for(let j in imagenes) { 
                                        if(j==0||j%2==0){
                                            html+=`<tr style="width:100%;">`;

                                        }
                                        html+=`
                                        <td style="text-align:center;">
                                        <img src="${imagenes[j]}" style=" width:240px;height:240px; 
                                        object-fit: cover;
                                        border-radius:2%;"/>
                                        </td>`;
                                        if(j+1%2==0){                                            
                                            html+=`</tr>`;
                                        }
                                        }                                
                                html+=` 
                        </table>
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