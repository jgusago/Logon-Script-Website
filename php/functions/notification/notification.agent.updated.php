<?php
$remarks = $_POST['remarks'];
$version = $_POST['agentversion'];
$hostname = $_POST['hostname'];
$update = $_POST['update'];
//$hostname = "AEITOM073137";
//$remarks = "test";
//$version = "123456";
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "$remarks<br>$version<br>$hostname<br>$update<br>";


$sql = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname like '$hostname'";
foreach ($db->query($sql) as $row){
$oldversion = $row['agent_version'];
$oldremarks = $row['remarks'];
}


//Check if already have a record
    if($version !== "")
    {
        $query = "UPDATE logonscript.tbl_computer_details SET `agent_version`=:versions WHERE (`hostname` = :hostname)";
        $pdo = $db->prepare($query);
        $pdo->bindParam(":versions",$version);
        $pdo->bindParam(":hostname",$hostname);
        $pdo->execute();
    }
}
else{
    $query2 = "INSERT INTO tbl_computer_details (hostname, processor, hdd_Serial, mac_Address, mb_manufacturer, mb_product, scan_time, ip, status, remarks, agent_version) VALUES (?, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, NULL, ?)";
    $pdo2 = $db->prepare($query2);
    $pdo2->execute([$hostname, $remarks, $version]);
}

$pdo = null;
$pdo2 = null;
?>
