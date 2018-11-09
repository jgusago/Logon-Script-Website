<?php

$parent = $_POST["parent"];
$id = $_POST["linkid"];
//$parent = "Marvin(IT)";
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "Computer Name|IP Address|Status|Remarks|Agent Version|Action";

$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $count++;
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    $user = $row["user"];
    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $status = "On-line";
    else{
        $status = "Off-line";
      }

    $newquery = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname LIKE :hostname ORDER BY tbl_computer_details.agent_version GROUP BY hostname ";

    $newpdo = $db->prepare($newquery);
    $newpdo->bindParam(":hostname",$hostname);
    $newpdo->execute();
    $newresult = $newpdo->fetchAll();

    if (count($newresult) !== 0){
      foreach($newresult as $row){
        $remarks = $row['remarks'];
        $agent_version = $row['agent_version'];
        $tabledata = "true";
      }
    }
    else{
        $remarks = "";
        $agent_version = "";
        $tabledata = "false";
    }
    echo "#$hostname|$ip_address|$status|$remarks|$agent_version|button`btn~btn-primary`onClick:COMPLISTupdate(\"$hostname\", \"$user\", \"$remarks\", \"$tabledata\",\"$parent\",\"$id\")`Details";



}
$newpdo = null;
$pdo = null;
?>
