<?php
//$parent = "Marvin(IT)";

$id = $_POST["linkid"];
$count = 0;
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";


$parentid = $_POST["parent"];
$getparent = "SELECT * FROM logonscript.tbl_tree WHERE tree_id = $parentid";
foreach ($db->query($getparent) as $row){
  $parent = $row['tree_filter'];
}

$query = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE '$parent%' GROUP BY hostname";

echo "Computer Name|User|IP Address|Services & Server Status|Remarks|Agent Version|Previous Date Checked|Date Checked|Action";


foreach($db->query($query) as $row)
{
    $count++;
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    $user = $row['user'];

    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
    {
        $status = "Running";
        $status1 = "Found";
    }
    else
    {
        $status = "End Task";
        $status1 = "Not Found";
    }

    $newquery = "SELECT * FROM logonscript.tbl_computer_details WHERE hostname LIKE :hostname ORDER BY tbl_computer_details.agent_version";

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
    echo "#$hostname|$user|$ip_address|iMonitor Services: $status~Connection Status: $status1|$remarks|$agent_version|||button`btn~btn-primary`onClick:COMPLISTupdate(\"$hostname\", \"$user\",\"$remarks\", \"$tabledata\",\"$parent\",\"$id\")`Details";



}
$newpdo = null;
$pdo = null;
?>
