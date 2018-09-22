<?php
$parent = $_POST["parent"];
$count = 0;

require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

echo "
<!-- Bootstrap core CSS-->
<link href='http://172.16.39.241/design/bootstrap/css/bootstrap.min.css' rel='stylesheet'>
<link href='http://172.16.39.241/design/datatables/dataTables.bootstrap4.css' rel='stylesheet'>
<script type='text/javascript' src='http://172.16.39.241/js/jssource/jquery/jquery-3.3.1.min.js'></script>

<div class='table-responsive'>
<table class='table table-bordered' id='dataTable' width='100%' cellspacing='0'>
<thead>
<tr role='row'>
<th>No.</th>
<th>Computer Name</th>
<th>IP Addtress</th>
<th>Platform</th>
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
<th>Platform</th>
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

    echo "<tr>
        <td>$count</td>
        <td>$hostname</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
    </tr>";
}
echo "</table></div>
<script src='http://172.16.39.241/design/datatables/jquery.dataTables.js'></script>
<script src='http://172.16.39.241/design/datatables/dataTables.bootstrap4.js'></script>
<script src='http://172.16.39.241/js/controller/main-admin-datatables.min.js'></script>";


echo"
<div class='table-responsive'>
<table class='table table-bordered' id='dataTable' width='100%' cellspacing='0'>
<thead>
<tr role='row'>
<th>No.</th>
<th>Computer Name</th>
<th>IP Addtress</th>
<th>Platform</th>
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
<th>Platform</th>
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

    echo "<tr>
        <td>$count</td>
        <td>$hostname</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
        <td>To be Added</td>
    </tr>";
}
echo "</table></div>";
?>