<?php
require('Mail.php');

$recipients = 'nick@datadrivendetroit.org';

$headers['From']    = 'nick@datadrivendetroit.org';
$headers['To']      = 'nick@datadrivendetroit.org';
$headers['Subject'] = 'Test message';

$body = 'Test message';

$params['sendmail_path'] = '/usr/sbin/sendmail';

// Create the mail object using the Mail::factory method
$mail_object =& Mail::factory('sendmail', $params);

$mail_object->send($recipients, $headers, $body);

?>