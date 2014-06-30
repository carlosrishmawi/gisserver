<?php

// Initialize array for errors
$errors = array(); 
$recipients = explode(";",$_POST['recipients']);
	
if( !preg_match('#[A-Z]+#', strtoupper($_POST['subject']) ) ){
	array_push($errors, "subject"); 
	}
if( !preg_match('#[A-Z]+#', strtoupper($_POST['message']) ) ){
	array_push($errors, "message"); 
	}

header('Content-Type: application/json');

//If good to go
if (empty($errors)){
	require("m1_rail_email_template.php");

	// To send HTML mail, the Content-type header must be set
	$headers  = 'MIME-Version: 1.0' . "\r\n";
	$headers .= 'Content-type: text/html; charset=iso-8859-1' . "\r\n";

	// Additional headers
	$headers .= 'From: noreply@m-1rail.com' . "\r\n";

	foreach($recipients as $r){
	// Mail it
	mail($r, $_POST['subject'], $content, $headers);		
	}
	echo '{"Success":true}';

} else {
	echo '{"Success":false,"Errors":'.json_encode($errors).'}';
}

?>