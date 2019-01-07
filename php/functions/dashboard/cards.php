<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$date = date("l, d F, Y");

$query = "SELECT COUNT(*) FROM logonscript.tbl_log WHERE iMonitor_Status = 'End Task'";
foreach ($db->query($query) as $row) {
$endtask = $row["COUNT(*)"];
}

$query = "SELECT COUNT(*) FROM logonscript.tbl_computer_details WHERE tbl_computer_details.agent_version != ALL(SELECT version FROM tbl_agent_version WHERE type = 'valid')";
foreach ($db->query($query) as $row) {
$oldversion = $row["COUNT(*)"];
}

$query = "SELECT COUNT(*) FROM logonscript.tbl_computer_details";
foreach ($db->query($query) as $row) {
$installed = $row["COUNT(*)"];
}

$query = "SELECT COUNT(*) FROM logonscript.tbl_employee";
foreach ($db->query($query) as $row) {
$employee = $row["COUNT(*)"];
}

echo "$date;$endtask;$oldversion;$installed;$employee";

$db=null;
 ?>
