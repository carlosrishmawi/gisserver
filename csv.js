// a = parent layer
// b = target element for interface

function csvExporter(a,b){
	window.csvExporter = {layer:a}
	var infos = a.layerInfos;
	var ct = '';	
	ct += '<div id="csvExporter">';	
	ct += '<select id="csvLayers">';
	ct += '<option value="-1">Select a Layer</option>';
	for (x in infos){
		ct+= "<option value='"+x+"'>";
		ct+= infos[x].name;
		ct+= "</option>";
		}
	ct += '</select>';  //end csvLayers
	ct += '<button id="downloadcsv" onClick="downloadCSV(this)">Download</button>'
	ct += '</div>';  //end csvExporter
	$(b).html(ct)
	window.csvQuery = new esri.tasks.Query();
	csvQuery.returnGeometry = false;
}

function downloadCSV(a){
	var lyr = $("#csvLayers").val();
	if(parseInt(lyr) >= 0){	
		l = csvExporter.layer;
		var name = l.layerInfos[lyr].name;
		var patt = new RegExp("'","g");
		var defs = l.layerDefinitions;
		var where = defs != null && encodeURIComponent(defs[lyr]) || "OBJECTID>=0";		
		var url = l.url.substr(7);
		var token = l.credential.token;
		window.open( 'http://www.datadrivendetroit.org/gisserver/csv.php/?url='+url+'&token='+token+'&where='+where+'&lyr='+lyr+"&name="+name);
		window.focus();
	}
}