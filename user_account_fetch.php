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
<th>ID Number</th>
<th>Username</th>
<th>Department</th>
<th>Position</th>
<th>Role</th>
<th>Status</th>
<th>Option</th>

</tr>
</thead>

<tfoot>
<tr role='row'>
<th>No.</th>
<th>ID Number</th>
<th>Username</th>
<th>Department</th>
<th>Position</th>
<th>Role</th>
<th>Status</th>
<th>Option</th>

</tr>
</tfoot>";

// error_reporting(0);
// session_start();
// require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";

		// echo "ID|User ID|Name|Department|Position|Status|Role";

$sql = "SELECT userid, name, department, position, status, role FROM tbl_user WHERE role<>'SUPER ADMIN'";


$pdo = $db->prepare($query);
$pdo->bindParam(":parent",$parent);
$pdo->execute();
$result = $pdo->fetchAll();

foreach($result as $row){
    $count++;
    $userid = $row['userid'] ?: 'null';
	$name = $row['name'] ?: 'null';
	$department = $row['department'] ?: 'null';
	$position = $row['position'] ?: 'null';
	$status = $row['status'] ?: 'Not Found';
	$role = $row['role'] ?: 'All Running';

	echo 
	"<tr>
        <td>$count</td>
        <td>$userid</td>
        <td>{$name}</td>
        <td>{$department}</td>
        <td>{$position}</td>
        <td>{$status}</td>
        <td>{$role}</td>
        <td><a href="" data-toggle="modal"><button class="btn btn-primary">Edit Record</button></a></td>
    </tr>";


		
		// foreach ($db->query($sql) as $row) {
	
		// 	// $id = $row['id'] ?: 'null';
		// 	$userid = $row['userid'] ?: 'null';
		// 	$name = $row['name'] ?: 'null';
		// 	$department = $row['department'] ?: 'null';
		// 	$position = $row['position'] ?: 'null';
		// 	$status = $row['status'] ?: 'Not Found';
		// 	$role = $row['role'] ?: 'All Running';
		
		// 	echo "$userid|$name|$department|$position|$status|$role";

		// }

		echo "</table></div>";
	?>