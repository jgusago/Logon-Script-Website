<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";
//Connection

echo "User|Host|IP|Date Modefied|Recent IP|Last Date Used|Status|Connection Status|Branch|Recent Scan|Action";

$query = mysqli_query($con,"SELECT * FROM sky.tbl_log where user not like 'admi%' group by hostname");

while($row = mysqli_fetch_array($query)){
    $log_num = $row['log_no'];
    $user = $row['user'];
    $hostname = $row['hostname'];
    $new_ip = $row['new_ip'];
    $new_ip_date = $row['new_ip_date'];
    $old_ip = $row['old_ip'];
    $old_ip_date = $row['old_ip_date'];
    $monitoring_status = $row['monitoring_status'];
    $building = $row['building'];
    $date = $row['date'];

    
    $port = mysqli_query($con,"SELECT * FROM imonitor where hostname like '$hostname' and user like '$user'");
        
    $portcount = mysqli_num_rows($port);
    if ($portcount > 0){
    while ($row = mysqli_fetch_array($port)){
        
        $portstatus = $row["connected"];
    }
    }
    else
    {
        $portstatus = "unscanned";
    }

    echo "#$user|$hostname|$new_ip|$new_ip_date|$old_ip|$old_ip_date|$monitoring_status|$portstatus|$building|$date|$log_num";
}

mysqli_close($con);

?>