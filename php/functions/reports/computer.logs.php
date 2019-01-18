<?php
$id = $_POST["parent"];
$count = 0;
session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection

    $sql2 = "SELECT * FROM logonscript.tbl_tree where tree_id like '$id'";

    foreach ($db->query($sql2) as $row) {
            if(isset($row['tree_filter'])){
                $tree_filter = $row['tree_filter'];
            }
            else{
                $tree_filter = "notacceptabvle";
            }

        }

$query = "SELECT *, group_concat(user) as user2 FROM logonscript.tbl_log WHERE hostname like '$tree_filter%' group by hostname";


echo "Computer Name|User|Domain|IP Address|Services Status|Server Status|Scan Time";

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
    $iMonitor_Status = $row['iMonitor_Status'] ?: 'Not Found';
    $services = $row['services'] ?: 'All Running';
    $sysSetting_File = $row['sysSetting_File'] ?: 'Not Found';
    $serverIP = $row['serverIP'] ?: 'Not Found';
    $connections_status = $row['connection_status'] ?: 'Not Connected';
    $branch = $row['branch'] ?: 'Scan Failed';
    $scan_time = $row['update_time'];

    $date = date_create($scan_time);
    $scan_time = date_format($date, 'M d, Y G:i');

    echo "#$hostname|$user|$domain_name|$ip_address|iMonitor Status: $iMonitor_Status~Config: $sysSetting_File~Missing Services: $services|$serverIP : $connections_status|$scan_time";
}

$db = null;
?>
