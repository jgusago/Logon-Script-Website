<?php
$dbname = "logonscript";
$hostip = "172.16.31.39";
$user = "administrator";
$dbpassword = "Agsmc999";


$db = new PDO("mysql:dbname=$dbname;host=$hostip", $user, $dbpassword);
$db->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
$db->setAttribute(PDO::ATTR_EMULATE_PREPARES, false);

$conn = mysqli_connect($hostip, $user, $dbpassword, $dbname);
if(!$conn){
  trigger_error("NO CONNECTION");
}
    ?>
