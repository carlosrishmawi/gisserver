<?php

$n = preg_replace("[:^alnum:]","", $_GET["name"]);
$n = preg_replace("[ ]","_",$n);

header("Content-type: text/csv");
header("Content-Disposition: attachment; filename=".$n.".csv");
header("Pragma: no-cache");
header("Expires: 0");

$url = "http://".$_GET["url"]."/".$_GET['lyr']."/query/?where=".urlencode($_GET["where"])."&outFields=*&f=json&returnGeometry=false&token=".$_GET['token'];
$json = file_get_contents(  $url );
$obj = json_decode($json,true);

$head = array();

foreach($obj["fields"] as $field){
	array_push($head,$field["name"]);
	}

$h = implode(",",$head);
echo $h."\n";

foreach($obj["features"] as $ft){
	$row = array();
	foreach($ft["attributes"] as $key=>$val){  
		array_push($row,'"'.$val.'"');
		}
	$r = implode(',',$row);
	echo $r."\n";
	}

?>