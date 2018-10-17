<?php
$parent = $_POST["parent"];
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "
<div class='table-responsive'>
<table class='table table-bordered display' id='' width='100%' cellspacing='0'>
<thead>
<tr role='row'>
<th>No.</th>
<th>User</th>
<th>Computer Name</th>
<th>Domain</th>
<th>IP Addtress</th>
<th>Date Modified</th>
<th>iMonitor Status</th>
<th>Services Not Found</th>
<th>SysSetting File</th>
<th>Server IP</th>
<th>Connection Status</th>
<th>Branch</th>
<th>Scan Time</th>

</tr>
</thead>

<tfoot>
<tr role='row'>
<th>No.</th>
<th>User</th>
<th>Computer Name</th>
<th>Domain</th>
<th>IP Addtress</th>
<th>Date Modified</th>
<th>iMonitor Status</th>
<th>Services Not Found</th>
<th>SysSetting File</th>
<th>Server IP</th>
<th>Connection Status</th>
<th>Branch</th>
<th>Scan Time</th>
</tr>
</tfoot>";

$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $count++;
    $user = $row['user'];
    $hostname = $row['hostname'];
    $domain = $row['domain_name'];
    $ip_address = $row['ip_address'];
    $ip_date = = $row['ip_date_modified'];
    $imonitor_status = $row['iMonitor_Status'];
    $services = $row['services'];
    $sysSetting = $row['sysSetting_File'];
    $server_ip = $row['serverIP'];
    $port_status = $row['connection_status'];
    $branch = $row['branch'];
    $scan_time = $row['scan_time'];
    
    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $status = "On-line";
    else
        $status = "Off-line";

    echo "<tr>
        <td>$count</td>
        <td>$user</td>
        <td>{$hostname}</td>
        <td>{$domain}</td>
        <td>{$ip_address}</td>
        <td>{$ip_date}</td>
        <td>{$imonito_status}</td>
        <td>{$services}</td>
        <td>{$sysSetting}</td>
        <td>{$server_ip}</td>
        <td>{$port_status}</td>
        <td>{$branch}</td>
        <td>{$scan_time}</td>
    </tr>";
}
echo "</table></div>";

?>