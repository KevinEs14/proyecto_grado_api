var functions=require('./archivos/functions');
module.exports= function genCaza(reporte){
    var registros=true;
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
                        <td class="logo-left">
                            <img src="archivos/logo_ucb.png" style="width:100%; max-width:100px;max-height:130px;"/>
                            
                        </td>
                        <td class="title-center">
                            <h4>SISTEMA DE TRAZABILIDAD</h4>                            
                            <h6>GESTION Y DESARROLLO FORESTAL</h6>
                            <div style="height:17px"></div>
                            <h3>REPORTE DE ACTAS DE TENENCIA DE CUERO</h3>
                            <h3>EN CUSTODIA DE LA EMPRESA</h3>
                        </td>  
                        <td class="numero">                                
                            <h4>
                            </h4>
                        </td>
                    </tr>
                </table>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2 ">
                    <table class="border-table">
                            <tr >
                                <th class="padding-border-bottom-0 padding-0">
                                <strong>Id Empresa: </strong> ${reporte.curt.itemId}<br>
                                </th>
                            </tr>
                            <tr >
                                <th class="padding-border-bottom-0 padding-0" >
                                <strong>Nombre Empresa: </strong> ${reporte.curt.curtiembre}<br>
                                </th>
                            </tr>
                            <tr >
                                <th class="padding-border-bottom-0 padding-0" >
                                <strong>Codigo Empresa: </strong> ${reporte.curt.codigo}<br>
                                </th>
                            </tr>
                            <tr >
                                <th class="padding-border-bottom-0 padding-0" >
                                <strong>Gestión: </strong> ${reporte.gestion}<br>
                                </th>
                            </tr>
                            <tr >
                                <th class=" padding-0" >
                                <strong>Fecha Creación: </strong> ${reporte.fecha}<br>
                                </th>
                            </tr>
                        </table>
                    </td>
                </tr>
                <tr class="information ">
                    <td colspan="2">
                    <table cellspacing="0" cellpadding="0" border="1" class="tabla-grande">
                    <tbody>
                        <tr>
                            <th  style="background-color:#dbd9d9">TCO</th>
                            <th  style="background-color:#dbd9d9">
                            <table>
                                <tr>
                                    <th style="width:10%">Acta</th>
                                    <th style="width:10%">cantidad</th>
                                    <th style="width:10%">Precio</th>
                                    <th style="width:20%">Pié Cuadrado</th>
                                    <th style="width:20%">Total Colas</th>
                                    <th style="width:30%" >Fecha</th>
                                </tr>
                            </table>
                            </th>
                            <th  style="background-color:#dbd9d9">Chalecos</th>
                            <th  style="background-color:#dbd9d9">Pie cuadrado</th>
                        </tr>
                        
                            `;
                            if(reporte.actas.length>0){
                                var totalChalecos=0;
                                var totalPies=0;
                            for(let tco of reporte.actas)
                            {
                                html+=`
                                <tr>
                                    <th >${String(tco.tco).padStart(5,"0")}</th>
                                    <th >
                                <table>
                                `;
                                var totalC=0;
                                var totalP=0;
                                for(let acta of tco.actas){
                                    totalC+=Number(acta.entregado_chalecos);
                                    totalP+=Number(acta.total_pie_cuadrado);
                                    html+=
                                    `<tr>
                                        <th style="width:10%">${String(acta.itemId).padStart(5,"0")}</th>
                                        <th style="width:10%">${acta.entregado_chalecos}</th>
                                        <th style="width:10%">${acta.total_precio}</th>
                                        <th style="width:20%">${acta.total_pie_cuadrado}</th>
                                        <th style="width:20%">${acta.entregado_colas}</th>
                                        <th style="width:30%">${functions.obtenerFecha(new Date(acta.fecha_acta))}</th>
                                    </tr>
                                    
                                    `;
                                }
                                totalChalecos+=totalC;
                                totalPies+=totalP;
                                html+=`</table>
                            
                                </th>
                                <th  style="background-color:#dbd9d9">${totalC}</th>
                                <th  style="background-color:#dbd9d9">${totalP.toFixed(2)}</th>
                                </tr>`;
                            }}
                            else{
                                registros=false;
                            }
                                                        
                            html+=
                            `
                        
                       
                        </tr>
                    </tbody>
                </table>

                    </td>
                </tr>  `;            
                if(!registros){
                    html+=`</br></br><tr class="title-center">
                                    <th>
                                        No se encuentran registros de tenencias de Actas.
                                    </th>
                                </tr>`;
                }
                html+=`
                <tr>
                    <th>
                        <table class="tabla-datos"  cellspacing="0" cellpadding="0" style="padding-left:8px">
                            <tr>
                                <th style="padding:20px">
                                    <strong>Total Chalecos: </strong> ${totalChalecos==undefined?"Sin definir":totalChalecos}</br>                            
                                    <strong>Total en Pies Cuadrados: </strong> ${totalPies==undefined?"Sin definir":totalPies}
                                </th>
                                <th class="qr">                      
                                    <img src="archivos/${reporte.qr1}" style="width:100%; max-width:90px;max-height:90px;" /></br>
                                    ${functions.obtenerFecha(new Date(Date.now()))}
                                </th>
                            </tr>
                        </table>
                    </th>
                    
                <tr>
            </table>

        </div>
    </body>
</html>
        `;   
        console.log(html);
    return html;
    }