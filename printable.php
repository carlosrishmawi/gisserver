<?php 
$layer = 'http://gis.datadrivendetroit.org/arcgis/rest/services/DDPDemo/MapServer/?token='.$_GET["token"];
$extent = $_GET['xmin'].', '.$_GET['ymin'].', '.$_GET['xmax'].', '.$_GET['ymax'];

?>
<!DOCTYPE html>
<html>
<head>
    <meta http-equiv="Content-Type" content="text/html; charset=utf-8">
    <meta name="viewport" content="width=device-width,user-scalable=no">
    <!--The viewport meta tag is used to improve the presentation and behavior of the samples 
      on iOS devices-->
    <meta name="viewport" content="initial-scale=1, maximum-scale=1,user-scalable=no">
    <title>Printable Map</title>
    
    <link rel="stylesheet" href="http://js.arcgis.com/3.8/js/dojo/dijit/themes/nihilo/nihilo.css">
    <link rel="stylesheet" href="http://js.arcgis.com/3.8/js/esri/css/esri.css">
    <style>
    body,html{
      margin:0px;
      padding:0px;
      width:100%;
      height:100%;
      background:lightgray;
      }
    #map{
      width:10in;
      height:7.25in;
      background:#E9E9E9;
      }
    #mainWindow{
      box-shadow:1px 1px 4px rgba(0,0,0,0.6);
      background:white;
      margin:20px auto;
      position:relative;
      display:block;      
      padding:0.5in;
      width:10in;
      height:7.5in;
      }

    @media print{
       body,html,#map,#mainWindow{
         width:10in;
         height:7.25in;
         margin:0px !important;
         padding:0px !important;
         box-shadow:none;
         }
       @page{
         size:11in 8.5in;
         margin:0.5in;
         }
       #map_zoom_slider{
         display:none;
         }
      }        
    </style>    
    <script src="http://js.arcgis.com/3.8/"></script>
    <script>
      var map, layer;
      require([
        "esri/map", "esri/layers/FeatureLayer", "esri/layers/DynamicMapServiceLayer",
        "esri/tasks/query", "esri/toolbars/draw",
        "esri/graphic",
	"esri/InfoTemplate",
        "esri/symbols/SimpleMarkerSymbol",
        "esri/symbols/SimpleLineSymbol",
        "esri/symbols/SimpleFillSymbol", "dojo/_base/Color",
	"esri/renderers/SimpleRenderer",
        "dojo/parser", "dijit/registry",
        "esri/config", "dojo/_base/Color", "dojo/dom", "dojo/domReady!",
        "dijit/layout/BorderContainer", "dijit/layout/ContentPane", 
        "dijit/form/Button", 
      ], function(
        Map, FeatureLayer, DynamicMapServiceLayer,  Query,
        Draw, Graphic, InfoTemplate,
        SimpleMarkerSymbol, SimpleLineSymbol, SimpleFillSymbol, Color,  
        SimpleRenderer, parser, registry,
        esriConfig, Color, dom
      ){
        parser.parse();
        esriConfig.defaults.io.proxyUrl = "/proxy";

	var startExtent = new esri.geometry.Extent( <?php echo $extent; ?> , new esri.SpatialReference({wkid:102100}) );

        map = new Map("map", {
          extent: startExtent,
        });
               
        var baselayer = new esri.layers.ArcGISTiledMapServiceLayer("http://gis.datadrivendetroit.org/arcgis/rest/services/Basemaps/D3_Standard_Basemap/MapServer");
        map.addLayer(baselayer);
               
        
	layer = new esri.layers.ArcGISDynamicMapServiceLayer( <?php echo '"'.$layer.'"'; ?> );
	layer.setVisibleLayers( <?php echo $_GET['visible']; ?> );
	
	map.addLayer(layer);

	layer.setLayerDefinitions(window.opener.layer.layerDefinitions)
	
	map.on("load", function(){ 
	  map.disableScrollWheelZoom()
	});
	
      })
    </script>
</head>
<body>

  <div id="mainWindow">
    <div id="map"></div>
  </div>

</body>
</html>