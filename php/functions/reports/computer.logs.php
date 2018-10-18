<?php
$parent = $_POST["parent"];
$count = 0;
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
//Connection
echo "Computer NameASas|User|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";

$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent AND user not like 'admi%' group by hostname";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $hostname = $row['hostname'] ?: 'null';
    $user = $row['user'] ?: 'null';
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

    echo "#$hostname|$user|$domain_name|$ip_address~$ip_date_modefied|iMonitor Status: $iMonitor_Status~Missing Services: $services~Config: $sysSetting_File|Server IP: $serverIP~Connection Status: $connections_status|$branch|$scan_time";
}

$pdo->connection = null;
$db->connection = null;

?>