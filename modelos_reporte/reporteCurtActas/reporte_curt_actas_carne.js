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
                            <h3>REPORTE DE ACTAS DE TENENCIA DE CARNE</h3>
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
                                    <th style="width:15%">Carne 1ra. (Kg)</th>
                                    <th style="width:15%">Carne 2da. (Kg)</th>
                                    <th style="width:15%">Charque (Kg)</th>
                                    <th style="width:15%">Pagado (Bs)</th>
                                    <th style="width:30%" >Fecha</th>
                                </tr>
                            </table>
                            </th>
                            <th  style="background-color:#dbd9d9">Total Carne 1ra.(Kg)</th>
                            <th  style="background-color:#dbd9d9">Total Carne 2da.(Kg)</th>
                            <th  style="background-color:#dbd9d9">Total Charque(Kg)</th>
                            <th  style="background-color:#dbd9d9">Total Pagado(Bs)</th>
                        </tr>
                        
                            `;
                            if(reporte.actas.length>0){
                            var totalCarne=0;
                            var totalSegunda=0;
                            var totalCharque=0;
                            var totalPagado=0;
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
                                    totalC+=Number(acta.carne_primera);
                                    totalP+=Number(acta.total_pie_cuadrado);
                                    html+=
                                    `<tr>
                                        <th style="width:10%">${String(acta.itemId).padStart(5,"0")}</th>
                                        <th style="width:15%">${acta.entregado_carne_primera}</th>
                                        <th style="width:15%">${acta.entregado_carne_segunda}</th>
                                        <th style="width:15%">${acta.entregado_charque}</th>
                                        <th style="width:15%">${Number(acta.precio_carne_segunda)+Number(acta.precio_carne_primera)+Number(acta.precio_charque)}</th>
                                        <th style="width:30%">${functions.obtenerFecha(new Date(acta.fecha_acta))}</th>
                                    </tr>
                                    
                                    `;
                                }
                                totalCarne+=Number(tco.carne_primera);
                                totalSegunda+=Number(tco.carne_segunda);
                                totalCharque+=Number(tco.charque);
                                totalPagado+=Number(tco.precio_total);
                                html+=`</table>
                            
                                </th>
                                <th  style="background-color:#dbd9d9">${tco.carne_primera}</th>
                                <th  style="background-color:#dbd9d9">${tco.carne_segunda}</th>
                                <th  style="background-color:#dbd9d9">${tco.charque}</th>
                                <th  style="background-color:#dbd9d9">${tco.precio_total}</th>
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
                                    <strong>Total Carne Primera (Kg): </strong> ${totalCarne==undefined?"Sin definir":totalCarne}</br>  
                                    <strong>Total Carne Segunda (Kg): </strong> ${totalSegunda==undefined?"Sin definir":totalSegunda}</br>                           
                                    <strong>Total Charque (Kg): </strong> ${totalCharque==undefined?"Sin definir":totalCharque} </br>                            
                                    <strong>Total Pagado (Bs): </strong> ${totalPagado==undefined?"Sin definir":totalPagado}
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