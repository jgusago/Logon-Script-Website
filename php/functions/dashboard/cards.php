<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$date = date("l, d F, Y");

session_start();
$dept = $_SESSION["department"];
$query = "SELECT tree_filter FROM tbl_tree where tree_name LIKE '$dept'";
foreach ($db->query($query) as $row) {
$filter = $row["tree_filter"];
}
if(!isset($filter)){
  $filter = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz";
}
$query = "SELECT COUNT(distinct hostname) FROM logonscript.tbl_log WHERE (connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running') AND hostname like '$filter%'";
foreach ($db->query($query) as $row) {
$endtask = $row["COUNT(distinct hostname)"];
}

$query = "SELECT COUNT(distinct hostname) FROM logonscript.tbl_computer_details WHERE tbl_computer_details.agent_version != ALL(SELECT version FROM tbl_agent_version WHERE type = 'valid') AND hostname like '$filter%'";
foreach ($db->query($query) as $row) {
$oldversion = $row["COUNT(distinct hostname)"];
}

$query = "SELECT COUNT(distinct hostname) FROM logonscript.tbl_log WHERE hostname like '$filter%'";
foreach ($db->query($query) as $row) {
$installed = $row["COUNT(distinct hostname)"];
}

$query = "SELECT COUNT(*) FROM logonscript.tbl_employee WHERE dept = '$dept'";
foreach ($db->query($query) as $row) {
$employee = $row["COUNT(*)"];
}

echo "$date;$endtask;$oldversion;$installed;$employee";

$db=null;
 ?>
