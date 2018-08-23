<?php
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/connection.php";
echo "User|Hostname|Last IP Used|Data Modefied|Status|Port|Branch|Last Scanned Date|Date Remove";

$queryresolve = mysqli_query($con,"SELECT * FROM sky.tbl_log_resolved where user not like 'admi%' group by hostname");

while($row = mysqli_fetch_array($queryresolve)){
    $ruser = $row["user"];
    $rhostname = $row["hostname"];
    $rip = $row["new_ip"].",".$row["old_ip"];
    $rip_date = $row["new_ip_date"].",".$row["old_ip_date"];
    $rstatus = $row["monitoring_status"];
    $rportstatus = $row["port_status"];
    $rbuilding = $row["building"];
    $rdate = $row["date"];
    $rdate_resolved = $row["date_resolved"];

    echo "#$ruser|$rhostname|$rip|$rip_date|$rstatus|$rportstatus|$rbuilding|$rdate|$rdate_resolved";
}
mysqli_close($con);
?>