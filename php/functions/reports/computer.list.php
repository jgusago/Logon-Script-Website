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

echo "Computer Name|User|IP Address|Services & Server Status|Remarks|Agent Version|Date Checked|Action";


foreach($db->query($query) as $row)
{
    $count++;
    $log_no = $row['log_no'];
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
    echo "#p`text-lg-left`id:$log_no-1`$hostname|p`text-lg-left`id:$log_no-2`$user|p`text-lg-left`id:$log_no-3`$ip_address|p`text-lg-left`id:$log_no-4`iMonitor Services: $status<br>Connection Status: $status1|p`text-lg-left`id:$log_no-5`$remarks|p`text-lg-left`id:$log_no-6`$agent_version|p`text-lg-left`id:$log_no-7`Previous Checked:<br>Current Checked:|button`btn~btn-primary`onClick:COMPLISTupdate(\"$hostname\", \"$user\",\"$remarks\", \"$log_no\")`Details";
}
$newpdo = null;
$pdo = null;
?>
