<?php
$user = $_POST['user'];

session_start();
require "{$_SERVER['DOCUMENT_ROOT']}/php/connection/db_connection.php";
$sql = "select user, domain_name, hostname, ip_address, ip_date_modified,
iMonitor_Status, services, sysSetting_File, serverIP, connection_status, branch, scan_time from tbl_log WHERE user='$user'";	
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
        <td><?php echo $row['user']; ?></td>
        <td><?php echo $row['domain_name']; ?></td>
        <td><?php echo $row['hostname']; ?></td>
        <td><?php echo $row['ip_address']; ?></td>
        <td><?php echo $row['ip_date_modified']; ?></td>
        <td><?php echo $row['iMonitor_Status']; ?></td>
        <td><?php echo $row['services']; ?></td>
        <td><?php echo $row['sysSetting_File']; ?></td>
        <td><?php echo $row['serverIP']; ?></td>
        <td><?php echo $row['connection_status']?></td>
        <td><?php echo $row['branch']; ?></td>
        <td><?php echo date("M-d-Y h:m", strtotime($row['scan_time'])) ?></td>
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