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
<th>Computer Name</th>
<th>IP Addtress</th>
<th>Status</th>
<th>Remarks</th>
<th>Agent Version</th>
</tr>
</thead>

<tfoot>
<tr role='row'>
<th>No.</th>
<th>Computer Name</th>
<th>IP Addtress</th>
<th>Status</th>
<th>Remarks</th>
<th>Agent Version</th>
</tr>
</tfoot>";

$query = "SELECT * FROM logonscript.tbl_log WHERE branch LIKE :parent";

$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();
foreach($result as $row){
    $count++;
    $hostname = $row['hostname'];
    $ip_address = $row['ip_address'];
    if($row['connection_status'] == "ESTABLISHED"  && $row['iMonitor_Status'] == "Running")
        $status = "ACTIVE";
    else
        $status = "INACTIVE";

    echo "<tr>
        <td>$count</td>
        <td>$hostname</td>
        <td>{$ip_address}</td>
        <td>{$status}</td>
        <td>To be Added</td>
        <td>To be Added</td>
    </tr>";
}
echo "</table></div>";

?>