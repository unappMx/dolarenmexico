$(document).ready(function (){
	getListWebSimple();
	getRefreshDate();
	// var options = {
	// 	valueNames: ["banco", "venta", "compra"]
	// },
	// documentTable = new List("mdl-table", options);

	// $($("th.sort")[0]).trigger("click", function() {
	// 	console.log("clicked");
	// });

	// $("input.search").on("keyup", function(e) {
	// 	if (e.keyCode === 27) {
	// 		$(e.currentTarget).val("");
	// 		documentTable.search("");
	// 	}
	// });
	
});
function getRefreshDate()
{
	var d = new Date ();
	var month = new Array();
	month[0] = "Ene";
	month[1] = "Feb";
	month[2] = "Mar";
	month[3] = "Abr";
	month[4] = "May";
	month[5] = "Jun";
	month[6] = "Jul";
	month[7] = "Ago";
	month[8] = "Sep";
	month[9] = "Oct";
	month[10] = "Nov.";
	month[11] = "Dec";
	var lstRefresh = month[d.getMonth()]+" "+d.getDate()+ ", "+d.getHours()+":"+d.getMinutes();
	$('#lstRefresh').html(lstRefresh);
}
function getListMobile(){
	var header='<li class="mdl-list__item mdl-list__item--two-line"><span class="mdl-list__item-primary-content">';
	var retLogo='';
	var pc="";
	var pv="";	
	var footer='<span class="mdl-list__item-secondary-content">'+                 
           		'<a class="mdl-list__item-secondary-action" href="#"><img src="images/ic_action_graph_s.png" class="material-icons demo-conversion"></a></span>'+
             	'<span class="mdl-list__item-secondary-content">'+                  
             	'<a class="mdl-list__item-secondary-action" href="#"><img src="images/calculator.png" class="material-icons demo-conversion"></a></span></li>';
  	var html='';
 	$.ajax({
        type: "GET",
        dataType: "text",
        url: "http://ramonfe.github.io/casadecambio/index.html",        
        async: false,
        success: function (res) {
            if (res != null) {            	
            	res = res.replace(/'/g,"\"");
            	res = $.parseJSON(res);            	
                $.each(res, function (j, item) {
                	retLogo='<img src="images/'+getLogo(item.BANCO_NAME)+'" class="material-icons mdl-list__item-avatar"><span>'+item.BANCO_NAME+'</span>';
                	pc='<span class="mdl-list__item-sub-title">Venta: $'+item.DL_PV+'</span>';
                  	pv='<span class="mdl-list__item-sub-title">Compra: $'+item.DL_PC+'</span></span>';
                  	html+=header+retLogo+pc+pv+footer;                   
                });                         
            }
        }
    });
    $('#ListaBancos').html(html);   
}
function getListWeb(){
	var header='<thead><tr><th class="mdl-data-table__cell--non-numeric sort" data-sort="banco">Banco</th><th class="sort" data-sort="venta">Venta</th><th class="sort" data-sort="compra">Compra</th><th>Conversion</th></tr></thead><tbody class="list">';
	var convPic='<td><a class="mdl-list__item-secondary-action" href="http://google.com"><img src="images/calculator.png" class="material-icons demo-conversion"></a></td>';
	var banco='';
	var pc="";
	var pv="";	
  	var html='';
  	var row='';
  	var promPc=0;
	var promPv=0;
	var contList=0;
 	$.ajax({
        type: "GET",
        dataType: "text",
        url: "http://ramonfe.github.io/casadecambio/index.html",        
        async: false,
        success: function (res) {
            if (res != null) {            	
            	res = res.replace(/'/g,"\"");
            	res = $.parseJSON(res);            	
                $.each(res, function (j, item) {
                	contList++;
                	promPc=Number(promPc)+Number(item.DL_PC);
                	promPv=Number(promPv)+Number(item.DL_PV);                   	
                	banco='<td class="mdl-data-table__cell--non-numeric banco"><img src="images/'+getLogo(item.BANCO_NAME)+'" class="material-icons mdl-list__item-avatar"> '+item.BANCO_NAME+'</td>';
                	pc='<td class="venta">'+Number(item.DL_PV).toFixed(2)+'</td>';
                  	pv='<td class="compra">'+Number(item.DL_PC).toFixed(2)+'</td>';
                  	row+='<tr>'+banco+pc+pv+convPic+'</tr>';                   
                });
                html=header+row+'</tbody>';   
                if (contList>0)
                {                	
                	promPc=promPc/contList;
                	promPv=promPv/contList;
                }                   
            }
        }
    });
    $('#mdl-table').html(html);
    $('#prom-pv').html('Venta $'+promPv.toFixed(2));
    $('#prom-pc').html('Compra $'+promPc.toFixed(2));
}
function getListWebSimple(){
    var header='<thead><tr><th class="mdl-data-table__cell--non-numeric sort" data-sort="banco">Banco</th><th class="sort" data-sort="venta">Venta</th><th class="sort" data-sort="compra">Compra</th><th>Conversion</th></tr></thead><tbody class="list">';
    var convPic='<td><a class="mdl-list__item-secondary-action" href="http://google.com"><img src="images/calculator.png" class="material-icons demo-conversion"></a></td>';
    var banco='';
    var pc="";
    var pv="";  
    var html='inicio';
    var row='';
    var promPc=0;
    var promPv=0;
    var contList=0;
    $.ajax({
        type: "GET",
        dataType: "text",
        url: "http://ramonfe.github.io/casadecambio/index.html",        
        async: false,
        success: function (res) {
            if (res != null) {    
                 html = 'res not null';
                // res = res.replace(/'/g,"\"");
                // res = $.parseJSON(res);             
                // $.each(res, function (j, item) {
                //     contList++;
                //     promPc=promPc+item.DL_PC;
                //     promPv=promPv+item.DL_PV;                       
                //     banco='<td class="mdl-data-table__cell--non-numeric banco"><img src="images/'+getLogo(item.BANCO_NAME)+'" class="material-icons mdl-list__item-avatar"> '+item.BANCO_NAME+'</td>';
                //     pc='<td class="venta">'+item.DL_PV+'</td>';
                //     pv='<td class="compra">'+item.DL_PC+'</td>';
                //     row+='<tr>'+banco+pc+pv+convPic+'</tr>';                   
                // });
                // html=header+row+'</tbody>';   
                // if (contList>0)
                // {                   
                //     promPc=promPc/contList;
                //     promPv=promPv/contList;
                // }                   
            }
            else
            {
                html = 'res NULL';
            }
            html = 'llamada OK';
        }        
    });
    $('#mdl-table').html(html);
    $('#prom-pv').html('Venta $'+promPv.toFixed(2));
    $('#prom-pc').html('Compra $'+promPc.toFixed(2));
}
function getLogo(bankName)
{
	var retLogo='';
	switch (bankName){
		case 'BANCOAZTECA':               
                retLogo='logo_azteca.png';
                break;
            case 'BAJIO':                
                retLogo='logo_bajio.png';
                break;
            case 'BANAMEX':
                retLogo='logo_banamex.png';
                break;
            case 'BANXICO':
                retLogo='logo_bancodemexico.png';               
                break;
            case 'BANCOMER':
                retLogo='logo_bancomer.png';
                break;
            case 'BANJERCITO':
                retLogo='logo_banjercito.png';
                break;
            case 'BANORTE':
                retLogo='logo_banorte.png';
                break;
            case 'BXMAS':
                retLogo='logo_bx.png';
                break;
            case 'HSBC':
                retLogo='logo_hsbc.png';
                break;
            case 'INBURSA':
                retLogo='logo_inbursa.png';
                break;
            case 'IXE':
                retLogo='logo_ixe.png';
                break;
            case 'MONEX':
                retLogo='logo_monex.png';
                break;
            case 'SANTANDER':
                retLogo='logo_santander.png';
                break;
            case 'SCOTIABANK':
                retLogo='logo_scotiabank.png';                
                break;
            case 'BANREGIO':
                retLogo='logo_banregio.png';
                break;
            case 'MASTERCARD':
                retLogo='logo_mc.png';
                break;
            case 'AMERICAN EXPRESS':
                retLogo='logo_ae.png';
                break;
            case 'VISA':
                retLogo='logo_v.png';
                break;
            case 'SAT':
                retLogo='logo_sat.png';
                break;
            case 'DOF':
                retLogo='logo_dof.png';
                break;
            case 'BANCOPPEL':
                retLogo='logo_bc.png';
                break;
            default:
                retLogo='ic_launcher.png';
	}
	return retLogo;
}