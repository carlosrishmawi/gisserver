<?php
$mbox = imap_open("{imap.gmail.com:993/imap/ssl}", "Ntyler01mil@gmail.com", "Care!234");

echo "<h1>Mailboxes</h1>\n";
$folders = imap_listmailbox($mbox, "{imap.gmail.com:993/imap/ssl}", "*");

if ($folders == false) {
    echo "Call failed<br />\n";
} else {
    foreach ($folders as $val) {
        echo $val . "<br />\n";
    }
}

imap_close($mbox);
?>