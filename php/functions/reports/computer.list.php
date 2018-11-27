<?php
//$parent = "Marvin(IT)";

$id = $_POST["linkid"];
$count = 0;
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

if ($_SESSION['role'] !== "STAFF")
{
    $parent = $_POST["parent"];
    $query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent GROUP BY hostname";
}
else
{
    $id = $_POST["linkid"];
    $department = $_SESSION['department'];
    $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_name like '$department'";
      
        foreach ($db->query($sql2) as $row) 
        {
            if(isset($row['tree_filter']))
            {
                $tree_filter = $row['tree_filter'];
            }
            else
            {
                $tree_filter = "notacceptable";
            }
            
        }    
        $query = "SELECT * from logonscript.tbl_log WHERE hostname like '%$tree_filter%'";
}
echo "Computer Name|User|IP Address|Services & Server Status|Remarks|Agent Version|Previous Date Checked|Date Checked|Action";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row)
{
    $count++;
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    $user = $row['user'];
    // $scan_time = $row['scan_time'];
    // $date = $scan_time;

    // $date = explode(" ",$scan_time);

    // $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);

    // if ($newdate = new DateTime($date[0]." ".$date[1]))
    // {
    //     $scan_time = date_format($newdate, "M-d-Y H:i");
    // }

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
    echo "#$hostname|User: ~Employee ID: $user|$ip_address|iMonitor Services: $status~<b>Connection Status:</b> $status1|$remarks|$agent_version|||button`btn~btn-primary`onClick:COMPLISTupdate(\"$hostname\", \"$user\",\"$remarks\", \"$tabledata\",\"$parent\",\"$id\")`Details";



}
$newpdo = null;
$pdo = null;
?>
