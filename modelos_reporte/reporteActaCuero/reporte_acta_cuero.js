var functions=require('./archivos/functions');
module.exports= function genCaza(reporte){
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
                    <th colspan="2">
                        <table>
                            <tr>
                                <td class="logo-left">
                                <img src="archivos/logo_ucb.png" style="width:100%; max-width:100px;max-height:130px;"/>
                                    
                                </td>
                                <td class="title-center">
                                    <h4>SISTEMA DE TRAZABILIDAD</h4>
                                    
                                    <h6>GESTION Y DESARROLLO FORESTAL</h6>
                                    <div style="height:17px"></div>
                                    <h3>ACTA DE PROCEDENCIA DE CUERO DE LAS</h3>
                                    <h3>REGIONALES MANEJADORAS DE LAGARTO</h3>
                                </td>  
                                <td class="numero">                                
                                    <h4>
                                        N° ${String(reporte.actaCuero["itemId"]).padStart(7,'0')}
                                    </h4>
                                </td>
                                <td class="qrTraza">                                
                                    <img src="archivos/${reporte.qr2}" style="width:100%; max-width:120px;max-height:120px;" />
                                </td>
                            </tr>
                        </table>
                        <h5 class="subtitulo-2">1. Datos de Ubicación</h5>
                        <table class="border-table">
                            <tr >
                                <th class="padding-border-right-0 padding-0">
                                <strong>Departamento:</strong> ${reporte.actaCuero['nombre_departamento']}
                                </th>
                                <th class="padding-border-bottom-0 padding-0">
                                <strong>Provincia:</strong> ${reporte.actaCuero['nombre_provincia']}
                                </th>
                            </tr>
                            <tr >
                                <th class="padding-border-bottom-0 padding-border-left-0 padding-0" >
                                <strong>Municipio:</strong> ${reporte.actaCuero['nombre_municipio']}
                                </th>
                                <th class="padding-border-bottom-0 padding-0">
                                <strong>Fecha de llenado de Acta:</strong> ${functions.obtenerFecha(new Date(reporte.actaCuero['fecha_acta']))}
                                </th>
                            </tr>
                            <tr >
                                <th class="padding-border-left-0 padding-0" >
                                <strong>Regional:</strong> ${reporte.actaCuero['tco']}
                                </th>
                                <th class=" padding-0">
                                <strong>Comunidad:</strong> ${reporte.actaCuero['comunidad']}
                                </th>
                            </tr>
                        </table>
                        
                        <h5 class="subtitulo-2">2. Datos específicos para el cuero</h5>
                        <table  class="tabla-grande" cellspacing="0" cellpadding="0" border="1">
                            <tbody>
                                <tr >
                                    <th style="background-color:#b1afaf">
                                        Representante Legal Regional
                                    </th>
                                    <th style="background-color:#b1afaf">
                                        Responsable Empresa
                                    </th>
                                </tr>
                                <tr >
                                    <th >
                                        <table  cellspacing="0" cellpadding="0" border="0" class="tabla-interno">
                                            <tbody >
                                                <tr>
                                                    <th style="background-color:#dbd9d9">Longitud</th>
                                                    <th style="background-color:#dbd9d9">Cantidad</th>
                                                </tr>
                                                `;
                                                for(let i=0;i<reporte.longitudes.length;i++)
                                                {
                                                    html+=`<tr >
                                                    <th>${reporte.longitudes[i]['longitud']}</th>
                                                    <th>${reporte.longitudes[i]['cantidad']}</th>
                                                        </tr>`;
                                                }
                                                
                                                html+=
                                                `<tr  >
                                                    <th style="background-color:#b1afaf">Totales</th>
                                                    <th style="background-color:#dbd9d9">${reporte.totales[0]}</th>
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                    <th >
                                        <table cellspacing="0" cellpadding="0" border="0" class="tabla-interno">
                                            <tbody>
                                                <tr>
                                                    <th  style="background-color:#dbd9d9">Primera</th>
                                                    <th  style="background-color:#dbd9d9">Segunda</th>
                                                    <th  style="background-color:#dbd9d9">Rechazados</th>
                                                    <th  style="background-color:#dbd9d9">Pie Cuadrados</th>
                                                    <th  style="background-color:#dbd9d9">Precio/u</th>
                                                    <th  style="background-color:#dbd9d9">Total pagados</th>
                                                </tr>
                                                
                                                `;
                                                for(let i=0;i<reporte.longitudes.length;i++)
                                                {
                                                    html+=`
                                                    <tr>
                                                        <th >${reporte.longitudes[i]['primera']}</th>
                                                        <th >${reporte.longitudes[i]['segunda']}</th>
                                                        <th >${reporte.longitudes[i]['rechazados']}</th>
                                                        <th >${reporte.longitudes[i]['pie_cuadrado']}</th>
                                                        <th >${reporte.longitudes[i]['precio_unidad']}</th>
                                                        <th >${reporte.longitudes[i]['precio_total']}</th>
                                                    </tr>`;
                                                }
                                                
                                                html+=
                                                `
                                                
                                                <tr  style="background-color:#dbd9d9">
                                                `;
                                                    for(let i=1;i<reporte.totales.length;i++)
                                                    {
                                                        html+=`
                                                            <th >${reporte.totales[i]}</th>`;
                                                    }
                                                
                                                html+=
                                                `
                                                </tr>
                                            </tbody>
                                        </table>
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div style="height:10px"></div>
                        <table  class="tabla-grande" cellspacing="0" cellpadding="0" border="1">
                            <tbody>
                                <tr>
                                <th style="background-color:#dbd9d9">Solo Colas: </th>
                                <th style="background-color:#dbd9d9">${reporte.actaCuero["total_colas"]}</th>
                                <th style="background-color:#b1afaf">&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                &nbsp;&nbsp;
                                </th>
                                </tr>
                            </tbody>
                        </table>
                        <div style="height:10px"></div>
                        <table  class="tabla-grande" cellspacing="0" cellpadding="0" border="1">
                            <tbody>
                                <tr>
                                    <th>Chalecos Entregados:</th>
                                    <th >${reporte.actaCuero["entregado_chalecos"]}</th>
                                    <th>Total Precio Chalecos:</th>
                                    <th>${reporte.actaCuero["total_precio"]}</th>
                                    <th >
                                    ${functions.NumeroALetras(reporte.actaCuero["total_precio"])}
                                    </th>
                                </tr>
                                <tr style="background-color:#dbd9d9">
                                    <th>Colas Entregadas:</th>
                                    <th>${reporte.actaCuero["entregado_colas"]}</th>
                                    <th>Total Precio Colas:</th>
                                    <th>${reporte.actaCuero["precio_colas"]}</th>
                                    <th >
                                    ${functions.NumeroALetras(reporte.actaCuero["precio_colas"])}
                                    </th>
                                </tr>
                            </tbody>
                        </table>
                        <div style="height:10px"></div>
                        <table style=" margin-bottom:-40px">
                            <tr>    
                                <th>
                                                        
                                    <h5 class="subtitulo-2">3. Datos del Responsable de la Regional </h5>
                                    <table class="tabla-datos">
                                        <tr>
                                            <th>
                                                <strong>Id Usuario:</strong> ${reporte.actaCuero["rep_leg_id"]}<br>
                                                <strong>Nombre Completo:</strong> ${reporte.actaCuero["rep_leg_nombre"]}<br>
                                                <strong>CI:</strong> ${reporte.actaCuero["rep_leg_ci"]+" "+reporte.actaCuero["rep_leg_ci_exp"]}<br>
                                                <strong>Municipio:</strong> ${reporte.actaCuero["nombre_municipio"]}<br>
                                                <strong>Regional:</strong> ${reporte.actaCuero["tco"]}<br>
                                            </th>
                                        </tr>
                                    </table>
                                    <div style="height:1px"></div>
                                    <h5 class="subtitulo-2">4. Datos del responsable de la empresa </h5>
                                    <table class="tabla-datos">
                                        <tr>
                                            <th>
                                                <strong>Id Usuario:</strong> ${reporte.actaCuero["res_cur_id"]}<br>
                                                <strong>Nombre Completo:</strong> ${reporte.actaCuero["res_cur_nombre"]}<br>
                                                <strong>CI:</strong> ${reporte.actaCuero["res_cur_ci"]+" "+reporte.actaCuero["res_cur_ci_exp"]}<br>
                                                <strong>Empresa:</strong> ${reporte.actaCuero["res_cur_cur"]}<br>
                                                <strong>Codigo Empresa:</strong> ${reporte.actaCuero["res_cur_cur_cod"]}<br>
                                            </th>
                                        </tr>
                                    </table>  
                                </th>
                                <th>
                                    <table class="qr">                                                     
                                    <tr> &nbsp;
                                    </tr>                                                          
                                        <tr> &nbsp;
                                        </tr>                                                    
                                        <tr>
                                            <th>
                                                <img src="archivos/${reporte.qr1}" style="width:100%; max-width:120px;max-height:120px;" />
                                            </th>
                                        </tr>                                                  
                                        <tr>
                                            <th>
                                                <h5>${functions.obtenerFecha(new Date(Date.now()))}</h5>
                                            </th>
                                        </tr>
                                    </table>
                                </th>                   
                            </tr>
                        </table>
                    </th>
                </tr>
                
            </table>
        </div>
    </body>
</html>
        `;   
        console.log(html);
    return html;
    }