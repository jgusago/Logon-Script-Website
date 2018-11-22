<?php
$parent = $_POST["parent"];
//$parent = "Marvin(IT)";
$count = 0;
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection

if ($_SESSION['role'] !== "STAFF"){
    $parent = $_POST["parent"];
    $id = $_POST["linkid"];
    $query = "SELECT *, group_concat(user) as user2 FROM logonscript.tbl_log WHERE branch LIKE :parent AND user not like '%admin%' GROUP BY hostname";
}
else{
    $id = $_POST["linkid"];
    $department = $_SESSION['department'];
    $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_name like '$department'";
      
		foreach ($db->query($sql2) as $row) {
            if(isset($row['tree_filter'])){
                $tree_filter = $row['tree_filter'];
            }
            else{
                $tree_filter = "notacceptabvle";
            }
            
        }    
        
    $query = "SELECT *, group_concat(user) as user2 FROM logonscript.tbl_log WHERE branch LIKE :parent AND hostname like '%$tree_filter%' AND user not like '%admin%' group by hostname";
}

echo "Computer Name|User|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";

//$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent AND user not like 'admi%' group by hostname";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row)
{
    $hostname = $row['hostname'] ?: 'null';
    $user = $row['user2'] ?: 'null';
    $domain_name = $row['domain_name'] ?: 'null';
    $ip_address = $row['ip_address'] ?: 'null';
    $ip_date_modefied = $row['ip_date_modified'] ?: 'null';
    $iMonitor_Status = $row['iMonitor_Status'] ?: 'Not Found';
    $services = $row['services'] ?: 'All Running';
    $sysSetting_File = $row['sysSetting_File'] ?: 'Not Found';
    $serverIP = $row['serverIP'] ?: 'Not Found';
    $connections_status = $row['connection_status'] ?: 'Not Connected';
    $branch = $row['branch'] ?: 'Scan Failed';
    $scan_time = $row['scan_time'] ?: 'null';
    $date = $scan_time;

    $date = explode(" ",$scan_time);
    $date1 = explode(" ",$ip_date_modefied);

    $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);
    $date1[0] = preg_replace("/[^a-zA-Z]/", "", $date1[0]);

    if ($newdate = new DateTime($date[0]." ".$date[1]))
    {
        $scan_time = date_format($newdate, "M-d-Y H:i");
    }
    if($newdate1 = new DateTime($date1[0]." ".$date1[1]))
    {
        $ip_date_modefied = date_format($newdate1, "M-d-Y H:i");
    }
    echo "#$hostname|$user|$domain_name|$ip_address~$ip_date_modefied|iMonitor Status: $iMonitor_Status~Missing Services: $services~Config: $sysSetting_File|Server IP: $serverIP~Connection Status: $connections_status|$branch|$scan_time";
}


?>
