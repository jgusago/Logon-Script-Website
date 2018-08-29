<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";
//Connection

echo "Hostname|User|Domain|Branch|Scan Time|IP|Date Modefied|Recent IP|Date Changed|iMonitor Status|Connection Status|Running Services|sysFile Setting|Log no";

$query = mysqli_query($con,"SELECT * FROM logonscript.tbl_log where user not like 'admi%' group by hostname");

while($row = mysqli_fetch_array($query)){
    $log_num = $row['log_no'];
    $user = $row['user'];
    $domain_name = $row['domain_name'];
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    $ip_date_modefied = $row['ip_date_modified'];
    $old_ip_address = $row['old_ip_address'];
    $old_ip_modefied = $row['old_ip_modified'];
    $iMonitor_Status = $row['iMonitor_Status'];
    $services = $row['services'];
    $sysSetting_File = $row['sysSetting_File'];
    $branch = $row['branch'];
    $scan_time = $row['scan_time'];

    
    $port = mysqli_query($con,"SELECT * FROM logonscript.tbl_port where hostname like '$hostname'");
        
    $portcount = mysqli_num_rows($port);
    if ($portcount > 0){
    while ($row = mysqli_fetch_array($port)){
        
        $connections_status = $row['connection_status'];
    }
    }
    else
    {
        $connections_status = "unscanned";
    }

    echo "#$hostname|$user|$domain_name|$branch|$scan_time|$ip_address|$ip_date_modefied|$old_ip_address|$old_ip_modefied|$iMonitor_Status|$connections_status|$services|$sysSetting_File|$log_num";
}

mysqli_close($con);

?>