<?php
$remarks = $_POST['remarks'];
$version = $_POST['agentversion'];
$hostname = $_POST['hostname'];
$update = $_POST['update'];
//$hostname = "AEITOM073137";
//$remarks = "test";
//$version = "123456";
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

//Check if already have a record
if ($update == "true"){
}
else{
    $query2 = "INSERT INTO tbl_computer_details (hostname, processor, hdd_Serial, mac_Address, mb_manufacturer, mb_product, scan_time, ip, status, remarks, agent_version) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?, ?)";
    $pdo2 = $db->prepare($query2);
    $pdo2->execute([$hostname, $remarks, $version]);
}
$pdo = null;
$pdo2 = null;
?>
