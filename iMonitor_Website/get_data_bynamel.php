<?php
$user = $_POST['userl'];

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$sql = "select user,hostname, ip_address,iMonitor_Status,connection_status from tbl_log WHERE user='$user'";	
//$sql = "select * from tbl_log WHERE user='$user'";
$stmt = $db->prepare($sql);
$stmt->execute();
$count = 1; 
$row_count = $stmt->rowCount();
if($row_count > 0){
    foreach($stmt as $row) {
    //while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
	?>
	<tr>
    <td><?php echo $count++ ?></td>
    <td><?php echo $row['hostname']; ?></td>
    <td><?php echo $row['ip_address']; ?></td>
    <td><?php echo $row['iMonitor_Status']; ?></td>
    <td><?php echo $row['connection_status']; ?></td>
    <td><?php
    if($row['iMonitor_Status'] == 'Running' AND $row['connection_status'] == 'ESTABLISHED')
        echo 'Active';
        else
        echo "Inactive";
        ?></td>
	</tr>
	<?php
	}
}else{
		echo '
		<tr>
			<td colspan = "4"><center>Record Not Found</center></td>
		</tr>
		';
}
	?>