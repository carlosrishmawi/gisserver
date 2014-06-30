var map, toolbar, symbol, geomTask, graphic, layer, legend;
var source = "http://gis.datadrivendetroit.org/arcgis/rest/services/DDPDemo/MapServer";

function resize(){
  var h = $(window).height() - $("#header").outerHeight();
  $("#main").height(h);
  }

$(document).ready(function(){
  resize();
  $(window).resize(function(){resize();});
  });  

require([
  "esri/map", 
  "esri/layers/ArcGISDynamicMapServiceLayer", 
  "esri/tasks/query", 
  "esri/toolbars/draw",
  "esri/graphic",
  "esri/InfoTemplate",
  "esri/symbols/SimpleMarkerSymbol",
  "esri/symbols/SimpleLineSymbol",
  "esri/symbols/SimpleFillSymbol", 
  "dojo/_base/Color",
  "esri/renderers/SimpleRenderer",
  "dojo/parser", 
  "dijit/registry",
  "esri/config", 
  "dojo/_base/Color", 
  "dojo/dom",
  "dojo/domReady!",
  "dijit/layout/BorderContainer", 
  "dijit/layout/ContentPane", 
  "dijit/form/Button"
  ], function( Map, ArcGISDynamicMapServiceLayer, Query, Draw, Graphic, InfoTemplate, SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color, SimpleRenderer, parser, registry, esriConfig, Color, dom ){

  parser.parse();
  esriConfig.defaults.io.proxyUrl = "/proxy";
 
  var Extent = new esri.geometry.Extent(-9246500.52, 5210129.71, -9243598.127, 5212185.95, new esri.SpatialReference({wkid:102100}) );
  var opts = {basemap:"gray",
              extent:Extent,
              slider:true,
              sliderStyle:"large",
              sliderPosition:"top-right"
              };
  map = new Map("map", opts);

  layer = new ArcGISDynamicMapServiceLayer(source);
  map.addLayer(layer);

  layer.on("load", function(){
    var URL = source+"/layers/?f=json&token="+layer.credential.token;
    window.LayerData = [];
    $.ajax({url:URL,
            dataType:"json",
            success:function(data){ 
            	lyrs = data.layers
	    	LayerData.push(lyrs); 
	    	var c = "<div>";
	    	for(x in lyrs){
		   lyr = lyrs[x];
		   c+="<div>"+lyr.name+"</div>";
		   c+="<div>"+lyr.description+"</div>";
		   console.log(lyr.copyrightText);
		   var copy = lyr.copyrightText.split(";");
		   var date = copy[1];
		   var srcs = copy[0].split("|");
		   for(x in srcs){
		   	var s = srcs[x].split("(");
		   	var u = (s.length==2)? s[1].replace(")","") : "#";
		   	c+="<a href='"+u+"' target='_blank'>"+s[0]+"</a>";
		   	}
		   }
            	c += "</div>";
            	$("#toc").append(c);
            	} 
            });
  });

});