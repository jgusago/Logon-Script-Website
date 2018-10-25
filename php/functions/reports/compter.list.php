<?php
$parent = $_POST["parent"];
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "Computer Name|IP Address|Status|Remarks|Agent Versions";

$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $count++;
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $status = "On-line";
    else
        $status = "Off-line";


    $newquery = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname LIKE :hostname";

    $newpdo = $db->prepare($newquery);
    $newpdo->bindParam(":hostname",$hostname);
    $newpdo->execute();
    $newresult = $newpdo->fetchAll();

    foreach ($result as $row) {
      $remarks =
    }
    echo "#$hostname|$ip_address|$status||";

}

?>
