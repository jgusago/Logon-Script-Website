<?php
$username = $_POST['user'];

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
	
$sql = "select log_no, user, domain_name, hostname, ip_address, ip_date_modified, old_ip_address, old_ip_modified, iMonitor_Status, services, sysSetting_File, serverIP, connection_status, branch, scan_time from tbl_log WHERE user='$user'";
$stmt = $db->prepare($sql);
$row_count = $stmt->rowCount();
if($row_count > 0){
	while($row=$stmt->fetch(PDO::FETCH_ASSOC)) {
	?>
	<tr>
		<td><?php echo $row['log_no']; ?></td>
        <td><?php echo $row['user']; ?></td>
        <td><?php echo $row['domain_name']; ?></td>
        <td><?php echo $row['hostname']; ?></td>
        <td><?php echo $row['ip_address']; ?></td>
        <td><?php echo $row['ip_date_modified']; ?></td>
        <td><?php echo $row['old_ip_address']; ?></td>
        <td><?php echo $row['old_ip_modified']; ?></td>
        <td><?php echo $row['iMonitor_Status']; ?></td>
        <td><?php echo $row['services']; ?></td>
        <td><?php echo $row['sysSetting_File']; ?></td>
        <td><?php echo $row['serverIP']; ?></td>
        <td><?php echo $row['connection_status']?></td>
        <td><?php echo $row['branch']; ?></td>
        <td><?php echo date("m/d/Y", strtotime($row['scan_time'])) ?></td>
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