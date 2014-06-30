<?php 
$content = <<<EOD
<html style="width:100%; margin:0px; padding:0px;" lang="en">
<head>
<title>M-1 Rail Alert</title>
<meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=1"/>
<meta http-equiv="Content-Type" content="text/html; charset=utf-8">
<style>
</style>
</head>
<body topmargin="0" leftmargin="0" marginheight="0" marginwidth="0" style="-webkit-font-smoothing: antialiased;width:100% !important; background-color:#EeEeEe;" bgcolor="#EeEeEe">	

<table id="fbody" width="100%" cellpadding="15" cellspacing="0" align="center" style="table-layout:fixed; width:430px; background-color:#FfFfFf;"><tr><td width="100%">

	<table id="header" align="center" cellpadding="7" cellspacing="0" width="400" style="table-layout:fixed; background-color:#FfFfFf;" bgcolor="#ffffff">
		<tr>
			<td id="logo" width="386" height="40" style="text-align:left;">
				<a href="http://m-1rail.com/" target="_blank" style="text-decoration:none;"><img src="http://m-1rail.com/wp-content/themes/m1/images/logo.png" width="181" height="22" alt="M-1 Rail" /></a>
			</td>
		</tr>
	</table>

	<table id="content" align="center" cellpadding="7" cellspacing="0" width="400" background="http://m-1rail.com/wp-content/themes/m1/images/title_bg.png" style="table-layout:fixed;" bgcolor="#f1f1f2">
		<tr>
			<td width="386" style="text-align:left; background-image:url(http://m-1rail.com/wp-content/themes/m1/images/title_bg.png); background-color:#f1f1f2;" >
				<span class="date" style="font-size:18px; line-height:26px; color:#000000; font-weight:normal; font-family:Arial, sans-serif;">
				CONSTRUCTION UPDATE
				</span>
			</td>
		</tr>
	</table>
	
	<table class="vspacer" width="400" border="0" cellpadding="0" cellspacing="0" align="center" style="table-layout:fixed; background-color:#FfFfFf;" bgcolor="#ffffff">
		<tr><td height="8px" width="100%"></td></tr>
	</table>
	
	<table id="content" align="center" cellpadding="7" cellspacing="0" width="400" bgcolor="#ffffff" style="background-color:#FfFfFf;">
		<tr>
			<td width="386" style="text-align:left; font-weight:normal; font-size:14px; font-family:Arial,sans-serif; line-height:18px;" >
			{$_POST['message']}
			</td>
		</tr>
	</table>	

	<table class="vspacer" width="400" border="0" cellpadding="0" cellspacing="0" align="center" style="table-layout:fixed; background-color:#FfFfFf;" bgcolor="#ffffff">
		<tr><td height="4px" width="100%"></td></tr>
		<tr><td height="1px" width="100%" style="background-color:#CcCcCc;" bgcolor="#CcCcCc"></td></tr>
		<tr><td height="4px" width="100%"></td></tr>
	</table>	
	
	<table class="vspacer" width="400" border="0" cellpadding="7" cellspacing="" align="center" style="table-layout:fixed; background-color:#FfFfFf;" bgcolor="#ffffff">
		<tr>
			<td width="386" style="text-align:left; font-weight:normal; font-size:12px; font-family:Arial,sans-serif; line-height:15px;" valign="bottom" >
				<a href="https://www.facebook.com/M1RAIL" target="_blank" style="text-decoration:none;">
					<img src="http://m-1rail.com/wp-content/themes/m1/images/f_icon_1.png" alt="Facebook" title="Facebook">
				</a>&nbsp;&nbsp;
				<a href="https://twitter.com/M1RAIL" target="_blank" style="text-decoration:none;">
					<img src="http://m-1rail.com/wp-content/themes/m1/images/f_icon_2.png" alt="twitter" title="twitter">
				</a>&nbsp;&nbsp;info@m-1rail.com &nbsp;&nbsp;1.800.511.3931 
			</td>
		</tr>
	</table>
	
</td></tr></table>

</body>
</html> 
EOD;
?>
