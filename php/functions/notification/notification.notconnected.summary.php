<?php

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

session_start();
if ($_SESSION['role'] != "STAFF"){
    $sql = "SELECT * FROM logonscript.tbl_log WHERE connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running'";
}
else{
    $dept = $_SESSION['department'];
    $query = "SELECT tree_filter FROM logonscript.tbl_tree WHERE tree_name LIKE '$dept'";
    foreach ($db->query($query) as $row){
        
    }
    if(isset($row['tree_filter'])){
        $filter = $row['tree_filter'];
    }
    else{
        $filter = "123123123123";
    }

    $sql = "SELECT * FROM logonscript.tbl_log WHERE hostname LIKE '%$filter%' AND connection_status not like 'ESTABLISHED' or iMonitor_Status not like 'running'";
}

echo "Computer Name|User|Domain|IP Address|Services Status|Server Status|Branch|Scan Time";
foreach ($db->query($sql) as $row){
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
    $date = $scan_time;

    $date = explode(" ",$scan_time);

    $date[0] = preg_replace("/[^a-zA-Z]/", "", $date[0]);

    if ($newdate = new DateTime($date[0]." ".$date[1])){

    $scan_time = date_format($newdate, "M-d-Y H:i");
    }
    echo "#$hostname|$user|$domain_name|$ip_address~$ip_date_modefied|iMonitor Status: $iMonitor_Status~Missing Services: $services~Config: $sysSetting_File|Server IP: $serverIP~Connection Status: $connections_status|$branch|$scan_time";

}

?>