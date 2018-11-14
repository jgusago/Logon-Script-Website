<?php


//$parent = "Marvin(IT)";
$count = 0;
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

if ($_SESSION['role'] !== "STAFF"){
    $parent = $_POST["parent"];
    $id = $_POST["linkid"];
    $query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent GROUP BY hostname";
}
else{
    $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_name like '$department'";
      
		foreach ($db->query($sql2) as $row) {
            $tree_filter = $row['tree_filter'];
        }    
        $query = "SELECT hostname, ip, status, remarks, agent_version from tbl_computer_details WHERE hostname like '%$tree_filter%'";
}
echo "Computer Name|IP Address|Status|Remarks|Agent Version|Action";



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
    else{
        $status = "Off-line";
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
    echo "#$hostname|$ip_address|$status|$remarks|$agent_version|button`btn~btn-primary`onClick:COMPLISTupdate(\"$hostname\", \"$remarks\", \"$tabledata\",\"$parent\",\"$id\")`Details";



}
$newpdo = null;
$pdo = null;
?>
