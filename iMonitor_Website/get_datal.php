<?php
$from_date = date("MMM-dd-yyyy hh:mm", strtotime($_POST['from_date2']));
$to_date = date("MMM-dd-yyyy hh:mm", strtotime($_POST['to_date2']));

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
	
$sql = "select user,hostname, ip_address,iMonitor_Status,connection_status from tbl_log WHERE scan_time BETWEEN '$from_date' AND '$to_date'";
$stmt = $db->prepare($sql);
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